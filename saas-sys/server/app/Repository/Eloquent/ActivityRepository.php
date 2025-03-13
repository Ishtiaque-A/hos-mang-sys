<?php

namespace App\Repository\Eloquent;

use App\Http\Resources\ActivityResource;
use App\Http\Resources\PaginateResource;
use App\Models\User;
use App\Repository\ActivityRepositoryInterface;
use Illuminate\Support\Facades\Auth;
use Spatie\Activitylog\Models\Activity;

class ActivityRepository extends BaseRepository implements ActivityRepositoryInterface
{

    protected $model;

    public function __construct(Activity $model)
    {
        $this->model = $model;
    }


    public function modelListData(){
        $query = $this->model;
        $uniqueCauserTypes = $query->whereNotNull('subject_type')->pluck('subject_type')->unique();

        $classNames = $uniqueCauserTypes->map(function ($value) {
            return class_basename($value);
        });

        return $classNames->values()->all();
    }
    public function activityData($id){
        $query = $this->model->leftJoin('users', 'causer_id', '=', 'users.id')
            ->leftJoin('organizations', 'users.organization_id', '=', 'organizations.id');

        $query->select([
            'activity_log.*', // Select all columns from log_entries
            'users.name',
            'users.mobile',
            'organizations.name as organization'
        ])->where('activity_log.id',$id);


        return new ActivityResource($query->first());
    }

    public function listData($queryParams)
    {
        $query = $this->model->leftJoin('users', 'causer_id', '=', 'users.id')
            ->leftJoin('organizations', 'users.organization_id', '=', 'organizations.id');

        $user_organization = Auth::user()->organzation_id;

        $query->select([
            'activity_log.*', // Select all columns from log_entries
            'users.name',
            'users.mobile',
            'organizations.name as organization'
        ]);

        if (isset($queryParams['organization_id'])) {
            $userIds = User::where('organization_id', $queryParams['organization_id'])
                ->pluck('id');
            $query->whereIn('causer_id', $userIds);
        } elseif ($user_organization && $user_organization > 0) {
            $userIds = User::where('organization_id', $user_organization)
                ->pluck('id');
            $query->whereIn('causer_id', $userIds);
        }

        if (isset($queryParams['admin_user'])) {
            if ($queryParams['admin_user'] == 1) {
                $userIds = User::whereNull('organization_id')->pluck('id');
                $query = $query->whereIn('causer_id', $userIds);
            } else {
                $userIds = User::whereNotNull('organization_id')->pluck('id');
                $query = $query->whereIn('causer_id', $userIds);
            }
        }
        if (isset($queryParams['type'])) {
            $query->where('activity_log.event', 'like','%'. $queryParams['type'].'%');
        }
        if (isset($queryParams['scope'])) {
            $query->where('activity_log.subject_type', 'like','%'. $queryParams['scope'].'%');
        }
        if (isset($queryParams['user_id'])) {
            $query->where('activity_log.causer_id',  $queryParams['user_id']);
        }

        if (isset($queryParams['start_date'])) {
            $query->whereDate('activity_log.created_at', '>=', $queryParams['start_date']);
        }

        if (isset($queryParams['end_date'])) {
            $query->whereDate('activity_log.created_at', '<=', $queryParams['end_date']);
        }

        $query = $query->orderBy('created_at','desc');


        if (isset($queryParams['perpage'])) {
            return new PaginateResource($query->paginate($queryParams['perpage']), 'activity');
        } else {
            return ActivityResource::collection($query->get());
        }


    }
}
