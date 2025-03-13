<?php

namespace App\Repository\Eloquent;

use App\Models\Organization;
use App\Models\Role;
use App\Models\User;
use App\Repository\UserRepositoryInterface;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;
use Illuminate\Auth\Events\Registered;

class UserRepository extends BaseRepository implements UserRepositoryInterface
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
    public function __construct(User $model)
    {
        $this->model = $model;
    }

    public function register($request)
    {

        try {
            $password = Str::random(10);
            $details = [
                'subject' => 'HMS||Welcome to our system',
                'body' => 'Your account is created successfully.Your auto generated password is ' . $password . ' Please reset your password after login.  Please click on the given link to login',
                'to' => $request['email'],
            ];
            $mail = new MailHelper($details);
            $mail->sendMail();
            $newUser = User::create([
                'email' => $request['email'],
                'password' => $password
            ]);


            if ($newUser) {
                $newUser->roles()->attach($request['role_id']);
            } else {
                throw new \Exception('User is not created successfully');
            }
            event(new Registered($newUser));
        } catch (\Exception $e) {
            return $e->getMessage();
        }
    }

    public function login($request): bool|string
    {
        try {
            $user = $this->model->where('email', $request['email'])->first();
            if (!$user) {
                throw new \Exception("Please enter a valid email");
            } else {
                if (!Hash::check($request['password'], $user->password)) {
                    throw new \Exception("Please enter a valid password");
                } else {
                    $loggedIn = Auth::attempt($request);
                    return $loggedIn;
                }
            }
        } catch (\Exception $exception) {
            Log::error($exception->getMessage() . json_encode($exception));
            return $exception->getMessage();
        }
    }

    public function store($data)
    {

        $user = User::where('email', $data['email'])->first();
        if ($user) {
            return response(['error' => 1, 'message' => 'user already exists'], 409);
        }

        $user = $this->create([
            'email' => $data['email'],
            'password' => Hash::make($data['password']),
            'name' => $data['name'],
            'branch_id' => $data['branch_id'],
            'branch_name' => $data['branch_name'],
            'user_type' => $data['user_type'],
        ]);

        $defaultRoleSlug = config('hydra.default_user_role_slug', 'user');
        $user->roles()->attach(Role::where('slug', $defaultRoleSlug)->first());

        return $user;
    }

    public function listData($queryParams)
    {

        //dd($queryParams);
        $data = $this->model;
        $user = Auth::user();
        if ($user['user_type'] == 3) {
            $data = $data->where('organization_id', $user['organization_id']);
        } elseif ($user['user_type'] == 4 || $user['user_type'] == 5) {
            $data = $data->where('id', $user['id']);
        }


        if (isset($queryParams['search'])) {
            $data = $data->where('name', 'like', "%{$queryParams['search']}%")
                ->orwhere('email', 'like', "%{$queryParams['search']}%");
        }

        if (isset($queryParams['status'])) {
            if ($queryParams['status'] == 0 || $queryParams['status'] == 1) {
                $data = $data->where('status', $queryParams['status']);
            }
        }

        if (isset($queryParams['perpage'])) {
            return $data->where('user_type', '>', 2)->with('organization')->orderBy('created_at', 'DESC')->paginate($queryParams['perpage']);
        } else {
            return $data->where('user_type', '>', 2)->with('organization')->orderBy('created_at', 'DESC')->get();
        }
    }
    public function statusUpdate($id)
    {
        $data = $this->findById($id);
        return $this->update($id, ['status' => $data['status'] == 0 ? 1 : 0]);
    }

    public function multipleStatusUpdate($data)
    {
        return $this->model->whereIn('id', $data['id'])->update(['status' => $data['status']]);
    }
    public function userUpdate($id, $data)
    {
        return $this->model->whereIn('id', $id)->update($data);
    }
    public function userCount()
    {
        return $this->model->where([['organization_id', Auth::user()->organization_id], ['status', 1]])->count('id');
    }





    public function report($queryParams)
    {

        $data = User::leftJoin('activity_log', 'users.id', '=', 'activity_log.causer_id')
            ->leftJoin('organizations', 'users.organization_id', '=', 'organizations.id')
            ->select(
                'users.id',
                'users.name',
                'users.email',
                'organizations.name as organization',
                'users.status',
                DB::raw('SUM(CASE WHEN activity_log.event = "created" THEN 1 ELSE 0 END) as created_count'),
                DB::raw('SUM(CASE WHEN activity_log.event = "updated" THEN 1 ELSE 0 END) as updated_count')
            )
            ->whereNotNull('users.organization_id') // Filter where organization_id is not null
            ->where('users.organization_id', '<>', 0) // Filter where organization_id is not equal to 0
            ->groupBy('users.id', 'users.name', 'users.email', 'organizations.name', 'users.status');



        if (isset($queryParams['search'])) {
            $data = $data->where('users.name', 'like', '%' . $queryParams['search'] . '%')
                ->orWhere('users.email', 'like', '%' . $queryParams['search'] . '%');
        }
        if (isset($queryParams['min_created_count'])) {
            $data = $data->having('created_count', '>', $queryParams['min_created_count']);
        }
        if (isset($queryParams['min_updated_count'])) {
            $data = $data->having('updated_count', '>', $queryParams['min_updated_count']);
        }
        if (isset($queryParams['status'])) {
            $data = $data->where('users.status', $queryParams['status']);
        }

        if (isset($queryParams['per_page'])) {
            return $data->paginate($queryParams['per_page']);
        }

        return ['data' => $data->get()];
    }

    public function detailsReport($id)
    {

        $result = User::where('id', $id)
            ->withCount([
                'activities', // Total count of activities
                'activities as create_count' => function ($query) {
                    $query->where('event', 'created'); // Count of 'created' events
                },
                'activities as update_count' => function ($query) {
                    $query->where('event', 'updated'); // Count of 'update' events
                },
            ])
            ->first();

        return $result;



        $organizations = User::withCount('users')->with('subscriptionDetails.subscriptionPlan', 'users')
            ->withSum(['purchases' => function ($query) {
                $query->whereHas('paymentAttempt', function ($query) {
                    $query->where('status', 1);
                });
            }], 'sell_price')

            ->whereHas('users', function ($query) {
                $query->where('users.status', 1);
            })->where('id', $id)
            ->first();

        return $organizations;
    }
}
