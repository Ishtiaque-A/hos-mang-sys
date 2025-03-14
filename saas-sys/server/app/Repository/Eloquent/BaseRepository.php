<?php

namespace App\Repository\Eloquent;

use App\Repository\EloquentRepositoryInterface;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Http\JsonResponse;

class BaseRepository implements EloquentRepositoryInterface
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
    protected function idCheck($modelId){
        if(!$this->model->where('id', $modelId)->first()){
            throw new HttpResponseException(
                response()->json([
                    'code'=>422,
                    'status' => 'error',
                    'message' => 'Id not found.',
                    'errors' => [],
                ], JsonResponse::HTTP_UNPROCESSABLE_ENTITY)
            );
        }
    }
    public function __construct(Model $model)
    {
        $this->model = $model;
    }

    /**
     * @param array $columns
     * @param array $relations
     * @return Collection
     */
    public function all(int $perPage = 15, array $relations = []): Collection
    {
        return $this->model->with($relations)->orderBy('created_at', 'DESC')->paginate($perPage);
    }

    public function singleConditionGetAll(int $perPage = 15, array $relations = [], array $condition = null)
    {
        if ($condition){
            return $this->model->with($relations)->where(...$condition)->orderBy('created_at', 'DESC')->paginate($perPage);
        }
        return $this->model->with($relations)->orderBy('created_at', 'DESC')->paginate(15);
    }
      /**
     * @param array $columns
     * @param array $relations
     * @return Collection
     */
    public function allList(array $columns = ['*'], array $relations = [], array $conditions = ['status'=> 1]): Collection
    {
        return $this->model->with($relations)->where($conditions)->orderBy('created_at', 'DESC')->get($columns);
    }


    /**
     * Get all trashed models.
     *
     * @return Collection
     */
    public function allTrashed(): Collection
    {
        return $this->model->onlyTrashed()->get();
    }

    /**
     * Find model by id.
     *
     * @param int $modelId
     * @param array $columns
     * @param array $relations
     * @param array $appends
     * @return Model
     */
    public function findById(
        int $modelId,
        array $columns = ['*'],
        array $relations = [],
        array $appends = []
    ): ?Model {
        $this->idCheck($modelId);
        return $this->model->select($columns)->with($relations)->findOrFail($modelId)->append($appends);
    }

    /**
     * Find trashed model by id.
     *
     * @param int $modelId
     * @return Model
     */
    public function findTrashedById(int $modelId): ?Model
    {
        return $this->model->withTrashed()->findOrFail($modelId);
    }

    /**
     * Find only trashed model by id.
     *
     * @param int $modelId
     * @return Model
     */
    public function findOnlyTrashedById(int $modelId): ?Model
    {
        return $this->model->onlyTrashed()->findOrFail($modelId);
    }

    /**
     * Create a model.
     *
     * @param array $payload
     * @return Model
     */
    public function create(array $payload): ?Model
    {
        $model = $this->model->create($payload);

        return $model->fresh();
    }
    public function insert(array $payload): ?bool
    {
         $this->model->insert($payload);

        return true;
    }

    /**
     * Create a model.
     *
     * @param array $payload
     * @return Model
     */
    public function CreateIfNotExist(array $payload): ?Model
    {
        $model = $this->model->firstOrCreate($payload);
        return $model->fresh();
    }

    /**
     * Update existing model.
     *
     * @param int $modelId
     * @param array $payload
     * @return bool
     */
    public function update(int $modelId, array $payload): bool
    {

        $this->idCheck($modelId);

        $model = $this->findById($modelId);
        return $model->update($payload);
    }

    /**
     * Delete model by id.
     *
     * @param int $modelId
     * @return bool
     */
    public function deleteById(int $modelId): bool
    {
        return $this->findById($modelId)->delete();
    }

    /**
     * Restore model by id.
     *
     * @param int $modelId
     * @return bool
     */
    public function restoreById(int $modelId): bool
    {
        return $this->findOnlyTrashedById($modelId)->restore();
    }

    /**
     * Permanently delete model by id.
     *
     * @param int $modelId
     * @return bool
     */
    public function permanentlyDeleteById(int $modelId): bool
    {
        return $this->findTrashedById($modelId)->forceDelete();
    }

    public function findByTitle($title)
    {
        return $this->model->where('title', $title)->first();
    }

    public function findByPhoneNo($phone_no)
    {
        return $this->model->where('phone_no', $phone_no)->first();
    }
    public function findByMobileNo($phone_no)
    {
        return $this->model->where('mobile', $phone_no)->first();
    }
    public function findByPhoneNumber($phone_number)
    {
        return $this->model->where('phone_number', $phone_number)->first();
    }
    public function findByEmail($email)
    {
        return $this->model->where('email', $email)->first();
    }
    public function findByUuid($uuid)
    {
        return $this->model->where('uuid', $uuid)->first();
    }
    public function findByPid($pid)
    {
        return $this->model->where('pid', $pid)->first();
    }

    public function updateByUuid($uuid,$payload)
    {
        $model = $this->findByUuid($uuid);

        return $model->update($payload);
    }
    public function deleteByUuid($uuid)
    {
        return $this->findByUuid($uuid)->delete();
    }


}
