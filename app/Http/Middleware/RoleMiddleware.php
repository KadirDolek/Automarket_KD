<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Auth;

class RoleMiddleware
{
    public function handle($request, Closure $next, ...$roles)
    {
        if (!Auth::check()) {
            abort(403, 'Vous devez être connecté.');
        }

        $user = Auth::user();

        if (!in_array($user->role->nom, $roles)) {
            abort(403, 'Accès refusé.');
        }

        return $next($request);
    }
}

