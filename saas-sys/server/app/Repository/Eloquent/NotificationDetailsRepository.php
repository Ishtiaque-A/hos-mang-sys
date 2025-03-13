<?php

namespace App\Repository\Eloquent;

use App\Models\NotificationDetails;
use App\Repository\NotificationDetailsRepositoryInterface;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;

class NotificationDetailsRepository extends BaseRepository implements NotificationDetailsRepositoryInterface {
    /**
     * @var Model
     */
    protected $model;

    /**
     * BaseRepository constructor.
     *
     * @param  Model  $model
     */
    public function __construct(NotificationDetails $model) {
        $this->model = $model;
    }

    public function notificationCount() {
        return $this->model->where([['user_id', Auth::id()], ['seen_status', 0]])->count('id');
    }

    public function deleteAll() {
        return $this->model->where('user_id', Auth::id())->delete();
    }

    public function updateByCondition($payload) {
        return $this->model->where('id', $payload['notification_details_id'])->update(['seen_status' => $payload['status']]);
    }

    public function notificationList($queryParams) {
        $data = $this->model;

        return $data->with('notification')
            ->where('user_id', Auth::id())
            ->whereIn('seen_status', [0,1])
            ->orderBy('created_at', 'desc') // Order by created_at in descending order (latest first)
            ->paginate(20);
    }
}
