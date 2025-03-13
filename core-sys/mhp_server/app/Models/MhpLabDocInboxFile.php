<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MhpLabDocInboxFile extends Model
{
    use HasFactory;
    protected $fillable = [
        'message_id',
        'file_name',
        'title',
    ];
}
