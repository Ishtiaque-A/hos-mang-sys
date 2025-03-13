<?php

namespace App\Repository;

interface NotificationDetailsRepositoryInterface extends EloquentRepositoryInterface {
    public function notificationCount();

    public function deleteAll();

    public function notificationList($queryParams);

    public function updateByCondition($payload);
}
