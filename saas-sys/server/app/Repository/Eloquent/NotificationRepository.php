<?php

namespace App\Repository\Eloquent;

use App\Models\Notification;
use App\Repository\NotificationRepositoryInterface;
use Illuminate\Database\Eloquent\Model;

class NotificationRepository extends BaseRepository implements NotificationRepositoryInterface
{
    /**
     * @var Model
     */
    protected $model;

    /**
     * BaseRepository constructor.
     *
     * @param Model $model
     */
    public function __construct(Notification $model)
    {
        $this->model = $model;
    }


}
