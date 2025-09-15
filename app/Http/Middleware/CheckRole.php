<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CheckRole
{
    public function handle(Request $request, Closure $next, ...$roles): Response
    {
        $user = auth()->user();
        
        if (!$user || !$user->role || !in_array($user->role->name, $roles)) {
            abort(403, 'Accès non autorisé.');
        }

        return $next($request);
    }
}