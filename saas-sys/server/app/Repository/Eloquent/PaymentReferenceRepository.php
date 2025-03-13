<?php

namespace App\Repository\Eloquent;

use App\Models\CardInfo;
use App\Models\PaymentAttempt;
use App\Models\PaymentReference;
use App\Repository\CardInfoRepositoryInterface;
use App\Repository\PaymentAttemptRepositoryInterface;
use Illuminate\Support\Facades\Auth;

class PaymentReferenceRepository extends BaseRepository implements PaymentAttemptRepositoryInterface
{

    protected $model;


    public function __construct(PaymentReference $model)
    {
        $this->model = $model;
    }


}
