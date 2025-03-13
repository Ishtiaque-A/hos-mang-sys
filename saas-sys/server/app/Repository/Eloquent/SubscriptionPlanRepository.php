<?php

namespace App\Repository\Eloquent;

use App\Models\SubscriptionPlan;
use App\Repository\SubscriptionPlanRepositoryInterface;
use Illuminate\Database\Eloquent\Model;

class SubscriptionPlanRepository extends BaseRepository implements SubscriptionPlanRepositoryInterface {
    /**
     * @var Model
     */
    protected $model;

    /**
     * BaseRepository constructor.
     *
     * @param  Model  $model
     */
    public function __construct(SubscriptionPlan $model) {
        $this->model = $model;
    }

    public function statusUpdate($id) {
        $data = $this->findById($id);

        return $this->update($id, ['status' => $data['status'] == 0 ? 1 : 0]);
    }

    public function multipleStatusUpdate($data) {
        return $this->model->whereIn('id', $data['id'])->update(['status' => $data['status']]);
    }

    public function specialListData($type = 1) {
        $data = $this->model->where([['status',1],['type',$type]]);
    }

    public function listData($queryParams) {
        $data = $this->model;
        if (isset($queryParams['search'])) {
            $data = $data->where('name', 'like', "%{$queryParams['search']}%")
                ->orwhere('details', 'like', "%{$queryParams['search']}%");
        }

        if (isset($queryParams['status'])) {
            if ($queryParams['status'] == 0 || $queryParams['status'] == 1) {
                $data = $data->where('status', $queryParams['status']);
            } else {
                $data = $data->where('status', 4);
            }
        }
        if (isset($queryParams['type'])) {
            if ($queryParams['type'] == 2 || $queryParams['type'] == 1) {
                $data = $data->where('type', $queryParams['type']);
            }
        }

        if (isset($queryParams['perpage'])) {
            return $data->with(['storageLimit', 'validity'])->orderBy('created_at', 'DESC')->paginate($queryParams['perpage']);
        } else {
            return $data->with(['storageLimit', 'validity'])->orderBy('created_at', 'DESC')->get();
        }
    }

    public function upgradeableList($userCount, $id) {
        $data = $this->model;

        return $data->where([['user_limit', '>', $userCount - 1], ['status', 1], ['type', 1], ['price', '>', 0]])
            ->whereNot('id', $id)
            ->with(['storageLimit', 'validity', 'features'])
            ->orderBy('created_at', 'DESC')
            ->get();
    }


    public function report($queryParams) {
        $data = $this->model->withCount([
            'subscriptionRequests as accept_count' => function ($query) {
                $query->where('status', 2);
            },
            'subscriptionRequests as reject_count' => function ($query) {
                $query->where('status', 3);
            },
            'subscriptionDetails as purchases_count',
            'subscriptionRequests as request_count',

        ]);

        if (isset($queryParams['search'])) {
            $data = $data->where('name', 'like', '%'.$queryParams['search'].'%');
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
