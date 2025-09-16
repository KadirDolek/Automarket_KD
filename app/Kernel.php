<?php

namespace App\Http;

use Illuminate\Foundation\Http\Kernel as HttpKernel;

class Kernel extends HttpKernel
{

protected $routeMiddleware = [
    'is.admin' => IsAdmin::class,
    'is.moderator' => IsModerator::class,
    'is.user' => IsUser::class,
];
}