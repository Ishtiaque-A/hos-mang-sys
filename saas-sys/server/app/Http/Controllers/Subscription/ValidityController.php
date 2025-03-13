<?php

namespace App\Http\Controllers\Subscription;
use App\Http\Controllers\BaseController;
use App\Http\Requests\ValidityStoreRequest;
use App\Models\SubscriptionPlanFeature;
use App\Http\Requests\SubscriptionPlanRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class ValidityController extends BaseController
{
    function store(ValidityStoreRequest $request)
    {

        DB::beginTransaction();
        try {
            $validated = $request->validated();
            $method = $request->method();

            if ($method == 'PUT') {
                $id = $validated['id'];
                unset($validated['id']);
                $response = $this->validityRepository->update($id, $validated);
            } else {
                $response = $this->validityRepository->create($validated);
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
            $this->validityRepository->update($id, ['status'=>2]);
            return $this->successResponse((object)[]);

        } catch (\Exception $exception) {
            Log::error($exception->getMessage() . json_encode($exception));
            DB::rollback();
            return $this->errorResponse($exception,$exception->getMessage());
        }


    }
    function getData( $id =0){

        try {
            $data = $this->validityRepository->findById(intval($id));
            return $this->successResponse(['subscription_plan'=>$data]);

        } catch (\Exception $exception) {
            Log::error($exception->getMessage() . json_encode($exception));
            DB::rollback();
            return $this->errorResponse($exception,$exception->getMessage());
        }

    }
    function list(Request $request){


        try {
            $data = $this->validityRepository->listData($request->all());
            return $this->successResponse(['validity'=>$data]);

        } catch (\Exception $exception) {
            Log::error($exception->getMessage() . json_encode($exception));
            DB::rollback();
            return $this->errorResponse($exception,$exception->getMessage());
        }

    }
}
