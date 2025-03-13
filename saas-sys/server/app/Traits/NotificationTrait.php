<?php

namespace App\Traits;

use App\Models\Notification;
use App\Models\NotificationDetails;

trait NotificationTrait {
    use LoggingTrait;

    public function addNotification($data) {
        return Notification::create($data);
    }

    public function addNotificationUser($data) {
        return NotificationDetails::create($data);
    }



    public function storeNotification($data) {
        try {
            $notification = $this->addNotification([
                'title' => $data['title'],
                'message' => $data['message'],
                'origin_type' => $data['origin_type'] ?? 1,
            ]);
//            $addNotificaiton = [
//                'title' => 'Title',
//                'message' => 'Message',
//                'user_id' => [1],
//            ];
            foreach ($data['user_id'] as $user) {
                $this->addNotificationUser([
                    'notification_id' => $notification->id,
                    'user_id' => $user,
                ]);
            }

            return ['status' => true, 'message' => 'success'];
        } catch (\Exception $exception) {
            $this->log('ERROR', $exception->getMessage(), json_encode($exception));

            return ['status' => false, 'message' => $exception->getMessage()];
        }
    }
}
