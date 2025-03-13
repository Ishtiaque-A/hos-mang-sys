<?php

namespace App\Repository\Eloquent;

use App\Models\SubscriptionCancelRequest;
use App\Models\SubscriptionPlan;
use App\Repository\SubscriptionCancelRepositoryInterface;
use App\Repository\SubscriptionPlanRepositoryInterface;
use Illuminate\Database\Eloquent\Model;

class SubscriptionCancelRepository extends BaseRepository implements SubscriptionCancelRepositoryInterface
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
    public function __construct(SubscriptionCancelRequest $model)
    {
        $this->model = $model;
    }


    public function getRequest($id){
        return $this->model->where('purchase_id',$id)->whereNot('status',0)->first();
    }

    //not used
    public function multipleStatusUpdate($data){
        return $this->model->whereIn('id', $data['id'])->update(['status' => $data['status']]);
    }


    public function listData($queryParams)
    {
        $data = $this->model->with(['purchase.organization', 'purchase.subscriptionDetail','purchase.subscriptionPlan']);

//        if (isset($queryParams['search'])) {
//            $data = $data->where(function ($query) use ($queryParams) {
//                $query->where('name', 'like', "%{$queryParams['search']}%")
//                    ->orWhere('details', 'like', "%{$queryParams['search']}%");
//            });
//        }

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
        return $this->model->with(['purchase.organization', 'purchase.subscriptionDetail','purchase.subscriptionPlan'])
        ->where('id', $id)->first();
    }


    public function report($queryParams)
    {
        $data = $this->model->withCount([
            'subscriptionRequests as accept_count' => function ($query) {
                $query->where('status', 2);
            },
            'subscriptionRequests as reject_count' => function ($query) {
                $query->where('status', 3);
            },
            'subscriptionDetails as purchases_count',
            'subscriptionRequests as request_count'

        ]);

        if (isset($queryParams['search'])) {
            $data = $data->where('name', 'like', '%' . $queryParams['search'] . '%');
        }
        if (isset($queryParams['min_purchases_count'])) {
            $data = $data->having('purchases_count', '>', $queryParams['min_purchases_count']);
        }
        if (isset($queryParams['min_accept_count'])) {
            $data = $data->having('accept_count', '>', $queryParams['min_accept_count']);
        }
        if (isset($queryParams['min_reject_count'])) {
            $data = $data->having('reject_count', '>', $queryParams['min_reject_count']);
        }
        if (isset($queryParams['request_count'])) {
            $data = $data->having('request_count', '>', $queryParams['min_request_count']);
        }
        if (isset($queryParams['min_price'])) {
            $data = $data->where('price', '>', $queryParams['min_price']);
        }

        if (isset($queryParams['per_page'])) {
            return $data->paginate($queryParams['per_page']);
        }

        return ['data' => $data->get()];
    }
}
