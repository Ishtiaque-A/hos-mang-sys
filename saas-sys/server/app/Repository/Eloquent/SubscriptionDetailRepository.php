<?php

namespace App\Repository\Eloquent;

use App\Models\SubscriptionDetail;
use App\Repository\SubscriptionDetailRepositoryInterface;
use Illuminate\Database\Eloquent\Model;

class SubscriptionDetailRepository extends BaseRepository implements SubscriptionDetailRepositoryInterface
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
    public function __construct(SubscriptionDetail $model)
    {
        $this->model = $model;
    }


}
