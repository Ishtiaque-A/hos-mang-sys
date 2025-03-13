<?php

namespace App\Http\Controllers;

use App\Http\Requests\SettingStoreRequest;
use App\Traits\FileProcessingTrait;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class SettingController extends BaseController {
    //
    use FileProcessingTrait;

    public function getSettings() {
        try {
            $data = $this->settingRepository->getSetting();

            return $this->successResponse(['setting' => $data]);
        } catch (\Exception $exception) {
            return $this->errorResponse($exception, $exception->getMessage());
        }
    }

    public function getGlobalSettings() {
        try {
            $data = $this->settingRepository->getGlobalSetting();

            return $this->successResponse(['setting' => $data]);
        } catch (\Exception $exception) {
            return $this->errorResponse($exception, $exception->getMessage());
        }
    }

    public function store(SettingStoreRequest $request) {
        DB::beginTransaction();
        try {
            $validated = $request->validated();

            if (isset($validated['logo']) && strlen($validated['logo']) > 10) {
                $validated['logo'] = $this->imageUploaderBase64($validated['logo']);
            } else {
                unset($validated['logo']);
            }

            $id = $validated['id'];
            unset($validated['id']);
            //return $validated;
            $response = $this->settingRepository->update($id, $validated);

            DB::commit();

            return $this->successResponse(['settings' => $response]);
        } catch (\Exception $exception) {
            Log::error($exception->getMessage().json_encode($exception));

            DB::rollback();

            return $this->errorResponse($exception, $exception->getMessage());
        }
    }
}
