<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Contact extends Model
{

    use SoftDeletes;

    protected $fillable = [
        "first_name", "last_name", "email", "birth_date", "telephone_1", "telephone_2", "telephone_3",
    ];

    protected $appends = ['name'];

    public function getNameAttribute()
    {
        return "{$this->attributes['first_name']} {$this->attributes['last_name']}";
    }
}
