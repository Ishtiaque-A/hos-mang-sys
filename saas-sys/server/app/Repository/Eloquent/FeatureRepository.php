<?php

namespace App\Repository\Eloquent;

use App\Models\Feature;
use App\Repository\FeatureRepositoryInterface;
use Illuminate\Database\Eloquent\Model;

class FeatureRepository extends BaseRepository implements FeatureRepositoryInterface
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
    public function __construct(Feature $model)
    {
        $this->model = $model;
    }

    public function statusUpdate($id){
        $data = $this->findById($id);
        return $this->update($id,['status'=>$data['status']==0 ? 1 : 0 ]);
    }

    public function multipleStatusUpdate($data){
//        dd($data);
        return $this->model->whereIn('id', $data['id'])->update(['status' => $data['status']]);
    }



    public function listData($queryParams)
    {
        $data = $this->model;
        if (isset($queryParams['search'])){
            $data = $data->where('name','like',"%{$queryParams['search']}%")
                ->orwhere('details','like',"%{$queryParams['search']}%");
        }

        if (isset($queryParams['status'])){
            if($queryParams['status']== 0 || $queryParams['status']== 1){
                $data = $data->where('status',$queryParams['status']);
            }
        }


        if (isset($queryParams['perpage'])){
            return $data->with('parent','children')->orderBy('created_at', 'DESC')
                ->paginate($queryParams['perpage']);
        }else{
            return $data->with('parent','children')->where('status',1)->orderBy('created_at', 'DESC')->get();
        }
    }
}
