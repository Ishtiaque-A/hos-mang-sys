<?php

// namespace App\Models;


// use Illuminate\Database\Eloquent\Factories\HasFactory;
// use Illuminate\Database\Eloquent\Model;

// class Admin extends Model
// {
//     use HasFactory;
// }

namespace App\Models;

use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Admin extends Authenticatable
{
    use HasFactory;
    use Notifiable;
    protected $guard ='admin';
    protected $fillable = [
        'name','type','mobile','email','password','iamge','created_at','updated_at','status',
    ];
    protected $hidden =[
        'password','remember_token',
    ];
}
