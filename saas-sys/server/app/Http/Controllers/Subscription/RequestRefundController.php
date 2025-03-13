<?php

namespace App\Http\Controllers\Subscription;

use App\Http\Controllers\BaseController;
use App\Http\Requests\cancelPlanRequest;
use App\Http\Requests\CancelRequestApproveRequest;
use App\Http\Requests\RefundRequest;
use App\Models\PaymentReference;
use App\Models\Purchase;
use App\Models\SubscriptionCancelRequest;
use App\Models\User;
use App\Traits\NotificationTrait;
use App\Traits\PaymentTrait;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class RequestRefundController extends BaseController {
    use NotificationTrait, PaymentTrait;

    public function subscriptionCancelRequest(cancelPlanRequest $request) {
        DB::beginTransaction();
        try {
            $validate = $request->validated();

            $purchase = $this->purchaseRepository->getPurchase($validate['purchase_id']);
            $validate['status'] = 2;

            if (isset($purchase->id)) {
                $cancelRequest = $this->subscriptionCancelRepository->getRequest($validate['purchase_id']);
                if (isset($cancelRequest->id)) {
                    return $this->errorResponse((object) [], 'You have already submitted a request');
                }
                $this->subscriptionCancelRepository->create($validate);
                $adminUsers = User::whereIn('user_type', [0, 1, 2])->pluck('id');

                $this->storeNotification(
                    [
                        'title' => 'New cancel request',
                        'message' => 'A subscription cancel request submitted.',
                        'user_id' => $adminUsers,
                    ]);
                DB::commit();

                return $this->successResponse((object) []);
            }

            return $this->errorResponse((object) [], 'You are not allow to cancel this plan');
        } catch (\Exception $exception) {
            Log::error($exception->getMessage().json_encode($exception));
            DB::rollback();

            return $this->errorResponse($exception, $exception->getMessage());
        }
    }

    public function subscriptionCancelRequestList(Request $request) {
        try {
            $data = $this->subscriptionCancelRepository->listData($request->all());

            return $this->successResponse($data);
        } catch (\Exception $exception) {
            Log::error($exception->getMessage().json_encode($exception));
            DB::rollback();

            return $this->errorResponse($exception, $exception->getMessage());
        }
    }

    public function subscriptionCancelRequestView($id) {
        try {
            $data = $this->subscriptionCancelRepository->view($id);

            return $this->successResponse($data);
        } catch (\Exception $exception) {
            Log::error($exception->getMessage().json_encode($exception));
            DB::rollback();

            return $this->errorResponse($exception, $exception->getMessage());
        }
    }

    public function subscriptionCancelRequestApprove(CancelRequestApproveRequest $request) {
        $validate = $request->validated();
        DB::beginTransaction();
        try {
            $isRefunded = $this->refundRepository->getByCancelId($validate['id']);
            if (isset($isRefunded->id)) {
                return $this->errorResponse((object) [], 'Status of this request can not be updated');
            }
            $this->subscriptionCancelRepository->update($validate['id'], ['status' => $validate['status'], 'refund_amount' => $validate['amount']]);

            if ($validate['status'] == 1) {
                $subscriptionCancel = SubscriptionCancelRequest::where('id', $validate['id'])->first();

                $paymentRecord = PaymentReference::where('tran_id', $subscriptionCancel->purchase_id)->first();

                $data = [
                    'bank_tran_id' => $paymentRecord->bank_tran_id,
                    'refund_amount' => $validate['amount'],
                    'cancel_request_id' => $validate['id'],
                    'refund_remarks' => 'Initiate by admin',
                ];
                $refundRef = $this->refundPayment($data);
                $status = $refundRef['status'] != 'success' ? $refundRef['status'] != 'failed' ? 0 : 1 : 3;
                $this->refundRepository->create([
                    'cancel_request_id' => $validate['id'],
                    'amount' => $validate['amount'],
                    'note' => $validate['note'],
                    'refund_reference' => $refundRef['data']->bank_tran_id ?? null,
                    'status' => $status,
                ]);
                $purchase = Purchase::find($subscriptionCancel->purchase_id);
                if (isset($purchase->subscription_details_id)) {
                    $this->subscriptionDetails->update($purchase->subscription_details_id, ['status' => 0]);
                }
                $this->storeNotification(
                    [
                        'title' => 'Subscription cancel request approved',
                        'message' => 'Your subscription cancel request has been approved and you refund amount is '.$validate['amount'].' .',
                        'user_id' => [$purchase->user_id],
                    ]);
            }


            DB::commit();

            return $this->successResponse((object) []);
        } catch (\Exception $exception) {
            Log::error($exception->getMessage().json_encode($exception));
            DB::rollback();

            return $this->errorResponse($exception, $exception->getMessage());
        }
    }

    public function refundList(Request $request) {
        try {
            $data = $this->refundRepository->listData($request->all());

            return $this->successResponse($data);
        } catch (\Exception $exception) {
            Log::error($exception->getMessage().json_encode($exception));
            DB::rollback();

            return $this->errorResponse($exception, $exception->getMessage());
        }
    }

    public function refundView($id) {
        try {
            $data = $this->refundRepository->view($id);

            return $this->successResponse($data);
        } catch (\Exception $exception) {
            Log::error($exception->getMessage().json_encode($exception));
            DB::rollback();

            return $this->errorResponse($exception, $exception->getMessage());
        }
    }

    public function refundUpdate(RefundRequest $request) {
        $data = $request->validated();
        $id = $data['id'];
        unset($data['id']);

        try {
            $this->refundRepository->update($id, $data);

            return $this->successResponse((object) []);
        } catch (\Exception $exception) {
            Log::error($exception->getMessage().json_encode($exception));
            DB::rollback();

            return $this->errorResponse($exception, $exception->getMessage());
        }
    }
}
