<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Brand extends Model
{
    protected $fillable = ['name', 'logo'];

    public function car(){
        return $this->hasMany(Car::class);
    }
}
