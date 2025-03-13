<?php

namespace App\Http\Controllers\Subscription;
use App\Http\Controllers\BaseController;
use App\Http\Requests\StorageSizeStoreRequest;
use App\Http\Requests\ValidityStoreRequest;
use App\Models\SubscriptionPlanFeature;
use App\Http\Requests\SubscriptionPlanRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class StorageSizeController extends BaseController
{
    function store(StorageSizeStoreRequest $request)
    {

        DB::beginTransaction();
        try {
            $validated = $request->validated();
            $method = $request->method();

            if ($method == 'PUT') {
                $id = $validated['id'];
                unset($validated['id']);
                $response = $this->storageSizeRepository->update($id, $validated);

            } else {
                $response = $this->storageSizeRepository->create($validated);
            }
            DB::commit();

            return $this->successResponse(['validity'=>$response]);

        } catch (\Exception $exception) {
            Log::error($exception->getMessage() . json_encode($exception));
            DB::rollback();
            return $this->errorResponse($exception, $exception->getMessage());
        }
    }

    function delete( $id =0){

        try {
            $this->storageSizeRepository->update($id, ['status'=>2]);
            return $this->successResponse((object)[]);

        } catch (\Exception $exception) {
            Log::error($exception->getMessage() . json_encode($exception));
            DB::rollback();
            return $this->errorResponse($exception,$exception->getMessage());
        }
    }
    function getData( $id =0){
        try {
            $data = $this->storageSizeRepository->findById(intval($id));
            return $this->successResponse(['subscription_plan'=>$data]);

        } catch (\Exception $exception) {
            Log::error($exception->getMessage() . json_encode($exception));
            DB::rollback();
            return $this->errorResponse($exception,$exception->getMessage());
        }
    }
    function list(Request $request){
        try {
            $data = $this->storageSizeRepository->listData($request->all());
            return $this->successResponse(['validity'=>$data]);

        } catch (\Exception $exception) {
            Log::error($exception->getMessage() . json_encode($exception));
            DB::rollback();
            return $this->errorResponse($exception,$exception->getMessage());
        }

    }
}
