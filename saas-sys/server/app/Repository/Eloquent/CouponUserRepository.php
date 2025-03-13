<?php

namespace App\Repository\Eloquent;

use App\Models\CouponUser;
use App\Repository\CouponUserRepositoryInterface;
use Illuminate\Database\Eloquent\Model;

class CouponUserRepository extends BaseRepository implements CouponUserRepositoryInterface
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
    public function __construct(CouponUser $model)
    {
        $this->model = $model;
    }

    public function insertData($data)
    {
        return $this->model->insert($data);;

    }
    public function listData($queryParams)
    {
        $data = $this->model;
        if (isset($queryParams['search'])){
            $data = $data->where('name','like',"%{$queryParams['search']}%")
                ->orwhere('details','like',"%{$queryParams['search']}%");
        }
        if (isset($queryParams['perpage'])){
            return $data->with('parent','children')->where('status',1)->orderBy('created_at', 'DESC')->paginate($queryParams['perpage']);
        }else{
            return $data->with('parent','children')->where('status',1)->orderBy('created_at', 'DESC')->get();
        }
    }
}
