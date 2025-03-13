<?php

namespace App\Traits;


trait DataListTrait
{
    public function processData($queryParams, $searchFields){
        $condition = [];
        if (isset($queryParams['search'])){
            //dd($queryParams['search']);
        }
        else{
            //dd($queryParams);
        }

    }
}
