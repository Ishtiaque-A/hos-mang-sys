<?php

namespace App\Repository;

interface CouponRepositoryInterface extends EloquentRepositoryInterface
{
    public function listData(array $queryParam);
}
