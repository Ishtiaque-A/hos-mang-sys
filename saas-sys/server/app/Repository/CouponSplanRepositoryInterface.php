<?php

namespace App\Repository;

interface CouponSplanRepositoryInterface extends EloquentRepositoryInterface
{
    public function insertData(array $data);
    public function listData(array $queryParam);
}
