<?php

namespace App\Repository\Eloquent;

use App\Models\StorageSize;
use App\Models\Validity;
use App\Repository\StorageSizeRepositoryInterface;
use App\Repository\ValidityPriodRepositoryInterface;

class ValidityPriodRepository extends BaseRepository implements ValidityPriodRepositoryInterface
{
    protected $model;

    public function __construct(Validity $model)
    {
        $this->model = $model;
    }

    public function listData($queryParams)
    {
        $data = $this->model;
        if (isset($queryParams['perpage'])){
            if (isset($queryParams['search'])){
                $data = $data->where('name','like',"%{$queryParams['search']}%")
                    ->orwhere('days','like',"%{$queryParams['search']}%");
            }
            return $data->paginate($queryParams['perpage']);
        }else{
            return $data->get();
        }
    }

}
