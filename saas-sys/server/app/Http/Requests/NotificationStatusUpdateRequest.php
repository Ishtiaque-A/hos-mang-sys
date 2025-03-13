<?php

namespace App\Http\Requests;

class NotificationStatusUpdateRequest extends BaseRequest {
    public function rules() {
        return [
            'notification_details_id' => 'integer',
            'status' => 'required|integer', // 1:read , 2:delete, 3:delete all
        ];
    }
}
