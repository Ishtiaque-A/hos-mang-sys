<?php

namespace App\Repository;

interface FeatureRepositoryInterface extends EloquentRepositoryInterface
{
    public function listData(array $queryParam);
}
