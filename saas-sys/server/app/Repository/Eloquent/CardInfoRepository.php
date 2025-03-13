<?php

namespace App\Repository\Eloquent;

use App\Models\CardInfo;
use App\Repository\CardInfoRepositoryInterface;

class CardInfoRepository extends BaseRepository implements CardInfoRepositoryInterface
{

    protected $model;


    public function __construct(CardInfo $model)
    {
        $this->model = $model;
    }

}
