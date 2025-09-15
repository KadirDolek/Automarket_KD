<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, Notifiable;

    protected $fillable = [
        'nom', 'prenom', 'tel', 'email', 'password', 'role_id'
    ];

    protected $hidden = [
        'password', 'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function role()
    {
        return $this->belongsTo(Role::class);
    }

    public function avatar()
    {
        return $this->hasOne(Avatar::class);
    }

    public function cars()
    {
        return $this->hasMany(Car::class);
    }

    public function isAdmin()
    {
        return $this->role->name === 'admin';
    }

    public function isModerator()
    {
        return $this->role->name === 'moderateur';
    }

    public function isUser()
    {
        return $this->role->name === 'user';
    }
}