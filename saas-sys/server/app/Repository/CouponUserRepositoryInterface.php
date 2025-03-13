<?php

namespace App\Repository;

interface CouponUserRepositoryInterface extends EloquentRepositoryInterface
{
    public function insertData(array $data);
    public function listData(array $queryParam);
}
