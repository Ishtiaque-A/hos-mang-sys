<?php

namespace App\Repository\Eloquent;

use App\Models\StorageSize;
use App\Repository\StorageSizeRepositoryInterface;

class StorageSizeRepository extends BaseRepository implements StorageSizeRepositoryInterface
{
    protected $model;

    public function __construct(StorageSize $model)
    {
        $this->model = $model;
    }

    public function listData($queryParams)
    {
        $data = $this->model;
        if (isset($queryParams['perpage'])){
            if (isset($queryParams['search'])){
                $data = $data->where('name','like',"%{$queryParams['search']}%")
                    ->orwhere('size','like',"%{$queryParams['search']}%");
            }
            return $data->paginate($queryParams['perpage']);
        }else{
            return $data->get();
        }
    }
}
