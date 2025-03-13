<?php

namespace App\Repository\Eloquent;

use App\Models\Refund;
use App\Repository\RefundRepositoryInterface;
use Illuminate\Database\Eloquent\Model;

class RefundRepository extends BaseRepository implements RefundRepositoryInterface
{

    protected $model;

    /**
     * BaseRepository constructor.
     *
     * @param Model $model
     */
    public function __construct(Refund $model)
    {
        $this->model = $model;
    }

    public function getByCancelId($id){
        return $this->model->where('cancel_request_id',$id)->first();
    }

    public function listData($queryParams)
    {
        $data = $this->model->with(['cancelRequest.purchase.organization', 'cancelRequest.purchase.subscriptionDetail','cancelRequest.purchase.subscriptionPlan']);

        if (isset($queryParams['status'])) {
            $data = $data->where('status', $queryParams['status']);
        }

        if (isset($queryParams['organization'])) {
            $data = $data->whereHas('purchase.organization', function ($query) use ($queryParams) {
                $query->where('id', $queryParams['organization']);
            });
        }

        if (isset($queryParams['subscription_plan'])) {
            $data = $data->whereHas('purchase', function ($query) use ($queryParams) {
                $query->where('subscription_plan_id', $queryParams['subscription_plan']);
            });
        }

        if (isset($queryParams['per_page'])) {
            return $data->orderBy('created_at', 'DESC')->paginate($queryParams['per_page']);
        } else {
            return ['data'=>$data->orderBy('created_at', 'DESC')->get()];
        }
    }

    public function view($id)
    {
        return $this->model->with(['cancelRequest.purchase.organization', 'cancelRequest.purchase.subscriptionDetail','cancelRequest.purchase.subscriptionPlan'])
            ->where('id', $id)->first();
    }


}
