<?php

namespace App\Repository\Eloquent;

use App\Models\Organization;
use App\Repository\OrganizationRepositoryInterface;

class OrganizationRepository extends BaseRepository implements OrganizationRepositoryInterface
{
    protected $model;

    public function __construct(Organization $model)
    {
        $this->model = $model;
    }

    public function findByEmail($email)
    {
        return $this->model->where('email', $email)->first();
    }

    public function statusUpdate($id)
    {
        $data = $this->findById($id);

        return $this->update($id, ['status' => $data['status'] == 0 ? 1 : 0]);
    }

    public function multipleStatusUpdate($data)
    {
        return $this->model->whereIn('id', $data['id'])->update(['status' => $data['status']]);
    }

    public function list()
    {
        $data = $this->model->where('status', 1)->select('id', 'name')->get();

        return $data;
    }

    public function listData($queryParams)
    {
        $data = $this->model;
        if (isset($queryParams['search'])) {
            $data = $data->where('name', 'like', "%{$queryParams['search']}%")
                ->orwhere('mobile', 'like', "%{$queryParams['search']}%")
                ->orwhere('contact_person_name', 'like', "%{$queryParams['search']}%")
                ->orwhere('description', 'like', "%{$queryParams['search']}%");
        }

        if (isset($queryParams['status'])) {
            if ($queryParams['status'] == 0 || $queryParams['status'] == 1) {
                $data = $data->where('status', $queryParams['status']);
            } else {
                $data = $data->where('status', 4);
            }
        }

        if (isset($queryParams['perpage'])) {
            return $data->orderBy('created_at', 'DESC')->paginate($queryParams['perpage']);
        } else {
            return $data->orderBy('created_at', 'DESC')->with('branch')->get();
        }
    }

    public function report($queryParams)
    {
        $data = Organization::withCount('users', 'subscriptionDetails')
            ->withSum(['purchases' => function ($query) {
                $query->whereHas('paymentAttempt', function ($query) {
                    $query->where('status', 1);
                });
            }], 'sell_price')

            ->whereHas('users', function ($query) {
                $query->where('status', 1);
            });

        if (isset($queryParams['search'])) {
            $data = $data->where('name', 'like', '%' . $queryParams['search'] . '%');
        }
        if (isset($queryParams['min_users_count'])) {
            $data = $data->having('users_count', '>', $queryParams['min_users_count']);
        }
        if (isset($queryParams['min_subscription_count'])) {
            $data = $data->having('subscription_details_count', '>', $queryParams['min_subscription_count']);
        }
        if (isset($queryParams['min_price'])) {
            $data = $data->having('purchases_sum_sell_price', '>', $queryParams['min_price']);
        }

        if (isset($queryParams['per_page'])) {
            return $data->paginate($queryParams['per_page']);
        }

        return ['data' => $data->get()];
    }

    public function detailsReport($id)
    {
        $organizations = Organization::withCount('users')->with('subscriptionDetails.subscriptionPlan', 'users')
            ->withSum(['purchases' => function ($query) {
                $query->whereHas('paymentAttempt', function ($query) {
                    $query->where('status', 1);
                });
            }], 'sell_price')

            ->whereHas('users', function ($query) {
                $query->where('status', 1);
            })->where('id', $id)
            ->first();

        return $organizations;
    }
}
