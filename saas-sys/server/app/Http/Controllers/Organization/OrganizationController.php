<?php

namespace App\Http\Controllers\Organization;

use App\Http\Controllers\BaseController;
use App\Http\Requests\MultipleStatusChangeRequest;
use App\Http\Requests\OrganizationRequest;
use App\Http\Requests\OrganizationUpdateRequest;
use App\Models\Organization;
use App\Traits\FileProcessingTrait;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class OrganizationController extends BaseController
{
    use FileProcessingTrait;

    public function store(OrganizationRequest $request)
    {
        DB::beginTransaction();
        try {
            $validated = $request->validated();
            $method = $request->method();

            if ($method == 'PUT') {
                $id = $validated['id'];
                unset($validated['id']);
                $response = $this->organizationRepository->update($id, $validated);
            } else {
                $validated['db_name'] = str_replace(['@', '.'], '_', $validated['contact_person_email']);
                $response = $this->organizationRepository->create($validated);

                $user = [];
                $user['name'] = $validated['contact_person_name'];
                $user['password'] = $validated['contact_person_mobile'];
                $user['email'] = $validated['contact_person_email'];
                $user['organization_id'] = $response['id'];
                $user['user_type'] = 3;
                $response['user'] = $this->userRepository->store($user);
                //dd($response );
            }
            DB::commit();

            return $this->successResponse(['organizaiton' => $response]);
        } catch (\Exception $exception) {
            Log::error($exception->getMessage() . json_encode($exception));

            DB::rollback();

            return $this->errorResponse($exception, $exception->getMessage());
        }
    }

    public function organizationUpdate(OrganizationUpdateRequest $request)
    {
        DB::beginTransaction();
        try {
            $validated = $request->validated();

            $id = Auth::user()->organization_id;

            if ($id) {
                if (isset($validated['logo'])) {
                    $validated['logo'] = $this->imageUploaderBase64($validated['logo'], 'logo');
                }
                $response = $this->organizationRepository->update($id, $validated);
            }
            DB::commit();

            return $this->successResponse($response);
        } catch (\Exception $exception) {
            Log::error($exception->getMessage() . json_encode($exception));
            DB::rollback();

            return $this->errorResponse($exception, $exception->getMessage(), 422);
        }
    }

    public function delete($id = 0)
    {
        try {
            $this->organizationRepository->statusUpdate($id);

            return $this->successResponse((object) []);
        } catch (\Exception $exception) {
            Log::error($exception->getMessage() . json_encode($exception));
            DB::rollback();

            return $this->errorResponse($exception, $exception->getMessage());
        }
    }

    public function deleteMultiple(MultipleStatusChangeRequest $request)
    {
        try {
            $this->organizationRepository->multipleStatusUpdate($request->validated());

            return $this->successResponse((object) []);
        } catch (\Exception $exception) {
            Log::error($exception->getMessage() . json_encode($exception));
            DB::rollback();

            return $this->errorResponse($exception, $exception->getMessage());
        }
    }

    public function getOrganization($id = 0)
    {
        try {
            $data = $this->organizationRepository->findById(intval($id), ['*'], ['specialPlan']);

            return $this->successResponse(['organization' => $data]);
        } catch (\Exception $exception) {
            Log::error($exception->getMessage() . json_encode($exception));
            DB::rollback();

            return $this->errorResponse($exception, $exception->getMessage());
        }
    }

    public function organizationList()
    {
        try {
            $data = $this->organizationRepository->list();

            return $this->successResponse(['organizations' => $data]);
        } catch (\Exception $exception) {
            Log::error($exception->getMessage() . json_encode($exception));
            DB::rollback();

            return $this->errorResponse($exception, $exception->getMessage());
        }
    }

    public function list(Request $request)
    {
        try {
            $data = $this->organizationRepository->listData($request->all());

            return $this->successResponse(['organizations' => $data]);
        } catch (\Exception $exception) {
            Log::error($exception->getMessage() . json_encode($exception));
            DB::rollback();

            return $this->errorResponse($exception, $exception->getMessage());
        }
    }


    public function organizationByCode($code)
    {
        return Organization::where('code', $code)->with('branch')->first();
    }
}
