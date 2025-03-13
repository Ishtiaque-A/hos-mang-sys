<?php

namespace App\Http\Controllers;

use App\Http\Requests\NotificationStatusUpdateRequest;
use App\Repository\NotificationDetailsRepositoryInterface;
use Illuminate\Http\Request;

class NotificationController extends BaseController {
    protected NotificationDetailsRepositoryInterface $notificationDetailsRepository;

    // Initialize the property, for example, in the constructor
    public function __construct(NotificationDetailsRepositoryInterface $notificationDetailsRepository) {
        $this->notificationDetailsRepository = $notificationDetailsRepository;
    }

    public function notificationList(Request $request) {
        try {
            return $this->successResponse([
                'notification_count' => $this->notificationDetailsRepository->notificationCount(),
                'notifications' => $this->notificationDetailsRepository->notificationList($request->all()),

            ]);
        } catch (\Exception $exception) {
            return $this->errorResponse($exception, $exception->getMessage());
        }
    }

    public function notificationStatusUpdate(NotificationStatusUpdateRequest $request) {
        try {
            $this->notificationDetailsRepository->updateByCondition($request->validated());
            return $this->successResponse([]);
        } catch (\Exception $exception) {
            return $this->errorResponse($exception, $exception->getMessage());
        }
    }
}
