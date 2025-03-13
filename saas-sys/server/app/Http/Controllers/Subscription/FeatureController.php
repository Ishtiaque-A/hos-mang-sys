<?php

namespace App\Http\Controllers\Subscription;

use App\Http\Controllers\BaseController;
use App\Http\Requests\FeatureRequest;
use App\Http\Requests\MultipleStatusChangeRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class FeatureController extends BaseController
{

    function store(FeatureRequest $request){

        DB::beginTransaction();
        try {
            $validated = $request->validated();
            $method = $request->method();

            if($method=='PUT'){
                $id = $validated['id'];
                unset($validated['id']);
                $response = $this->featureRepository->update($id, $validated);
            }else{
                $response = $this->featureRepository->create($validated);
            }
            DB::commit();
            return $this->successResponse(['feature'=>$response]);


        } catch (\Exception $exception) {
            Log::error($exception->getMessage() . json_encode($exception));
            DB::rollback();
            return $this->errorResponse($exception,$exception->getMessage());

        }
    }

    function delete( $id =0){
        try {
            $this->featureRepository->statusUpdate($id);
            return $this->successResponse((object)[]);

        } catch (\Exception $exception) {
            Log::error($exception->getMessage() . json_encode($exception));
            DB::rollback();
            return $this->errorResponse($exception,$exception->getMessage());
        }

    }

    function deleteMultiple( MultipleStatusChangeRequest $request){
        try {
            $this->featureRepository->multipleStatusUpdate($request->validated());
            return $this->successResponse((object)[]);

        } catch (\Exception $exception) {
            Log::error($exception->getMessage() . json_encode($exception));
            DB::rollback();
            return $this->errorResponse($exception,$exception->getMessage());
        }

    }
    function getFeature( $id =0){

        try {
            $data = $this->featureRepository->findById(intval($id),['*'],['parent','children']);
            return $this->successResponse(['feature'=>$data]);

        } catch (\Exception $exception) {
            Log::error($exception->getMessage() . json_encode($exception));
            DB::rollback();
            return $this->errorResponse($exception,$exception->getMessage());
        }

    }
    function list(Request $request){

        try {
            $data = $this->featureRepository->listData($request->all());
            return $this->successResponse(['features'=>$data]);

        } catch (\Exception $exception) {
            Log::error($exception->getMessage() . json_encode($exception));
            DB::rollback();
            return $this->errorResponse($exception,$exception->getMessage());
        }

    }
}


