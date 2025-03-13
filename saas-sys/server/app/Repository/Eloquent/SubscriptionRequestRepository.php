<?php

namespace App\Repository\Eloquent;

use App\Models\SubscriptionRequest;
use App\Repository\SubscriptionRequestRepositoryInterface;
use Illuminate\Database\Eloquent\Model;

class SubscriptionRequestRepository extends BaseRepository implements SubscriptionRequestRepositoryInterface
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
    public function __construct(SubscriptionRequest $model)
    {
        $this->model = $model;
    }
    public function multipleStatusUpdate($data){
        return $this->model->whereIn('id', $data['id'])->update(['status' => $data['status']]);
    }


    public function listData($queryParams)
    {
        $data = $this->model;
        if (isset($queryParams['search'])){
            $data = $data->where('name','like',"%{$queryParams['search']}%")
                ->orwhere('email','like',"%{$queryParams['search']}%")->orwhere('mobile','like',"%{$queryParams['search']}%");
        }

        if (isset($queryParams['status'])){
            $data = $data->where('status',$queryParams['status']);
        }

        if (isset($queryParams['type'])) {
            if ($queryParams['type'] == 2 || $queryParams['type'] == 1){
                $data = $data->where('type', $queryParams['type']);
            }
        }


        if (isset($queryParams['perpage'])){
            return $data->with('subscriptionPlan')->orderBy('created_at', 'DESC')->paginate($queryParams['perpage']);
        }else{
            return $data->with('subscriptionPlan')->orderBy('created_at', 'DESC')->get();
        }
    }

}
