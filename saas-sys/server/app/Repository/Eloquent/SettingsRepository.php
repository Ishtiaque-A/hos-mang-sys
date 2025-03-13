<?php

namespace App\Repository\Eloquent;

use App\Models\Setting;
use App\Repository\SettingsRepositoryInterface;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;

class SettingsRepository extends BaseRepository implements SettingsRepositoryInterface
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
    public function __construct(Setting $model)
    {
        $this->model = $model;
    }

    public function getSetting(){
        $user = Auth::user();
        if(isset($user->organization_id)){
            return $this->model->where('organization_id',$user->organization_id)->first();
        }
        return $this->model->where('organization_id',null)->orWhere('organization_id',0)->first();

    }
    public function getGlobalSetting(){
        $user = Auth::user();
        if(isset($user->organization_id)){
            return $this->model->where('organization_id',$user->organization_id)->first();
        }
        return $this->model->where('organization_id',null)->orWhere('organization_id',0)->first();

    }
}
