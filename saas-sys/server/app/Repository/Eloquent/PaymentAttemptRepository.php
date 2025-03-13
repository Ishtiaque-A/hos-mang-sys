<?php

namespace App\Repository\Eloquent;

use App\Models\PaymentAttempt;
use App\Repository\PaymentAttemptRepositoryInterface;
use Illuminate\Support\Facades\Auth;

class PaymentAttemptRepository extends BaseRepository implements PaymentAttemptRepositoryInterface {
    protected $model;

    public function __construct(PaymentAttempt $model) {
        $this->model = $model;
    }

    public function paymentHistory($queryParams) {
        $data = $this->model
            ->whereHas('purchase', function ($query) {
                $query->where('organization_id', Auth::user()->organization_id ?? 0);
            })
            ->with('purchase', 'purchase.subscriptionPlan', 'purchase.subscriptionDetail');

        if (isset($queryParams['status'])) {
            $data = $data->where('status', $queryParams['status']);
        }

        if (isset($queryParams['search'])) {
            $data = $data->whereHas('purchase.subscriptionPlan', function ($query) use ($queryParams) {
                $query->where('name', 'like', '%'.$queryParams['search'].'%');
            });
        }

        $data = $data->paginate($queryParams['per_page'] ?? 10);

        return $data;
    }

    public function paymentDetails($id) {
        $data = $this->model
            ->whereHas('purchase', function ($query) {
                $query->where('organization_id', Auth::user()->organization_id ?? 0);
            })
            ->with('purchase', 'purchase.subscriptionPlan', 'purchase.subscriptionDetail')
            ->where('id', $id)
            ->first();

        return $data;
    }
}
