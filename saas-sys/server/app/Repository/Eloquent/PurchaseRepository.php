<?php

namespace App\Repository\Eloquent;

use App\Models\Purchase;
use App\Repository\PurchaseRepositoryInterface;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;

class PurchaseRepository extends BaseRepository implements PurchaseRepositoryInterface
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
    public function __construct(Purchase $model)
    {
        $this->model = $model;
    }

    public function getPurchase($id){
        $organization= Auth::user()->organization_id;
        return $this->model->where([['id',$id],['organization_id',$organization],['user_id', Auth::id()]])->first();
    }

}
