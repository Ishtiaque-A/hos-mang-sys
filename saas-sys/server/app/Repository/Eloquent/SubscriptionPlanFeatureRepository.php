<?php

namespace App\Repository\Eloquent;

use App\Models\SubscriptionPlanFeature;
use App\Repository\SubscriptionPlanFeatureRepositoryInterface;
use Illuminate\Database\Eloquent\Model;

class SubscriptionPlanFeatureRepository extends BaseRepository implements SubscriptionPlanFeatureRepositoryInterface
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
    public function __construct(SubscriptionPlanFeature $model)
    {
        $this->model = $model;
    }


}
