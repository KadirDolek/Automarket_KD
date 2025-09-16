<?php
// app/Http/Middleware/IsModerator.php
namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class IsModerator
{
    public function handle(Request $request, Closure $next)
    {
        if (!auth()->check() || (!auth()->user()->isModerator() && !auth()->user()->isAdmin())) {
            abort(403, 'Accès non autorisé.');
        }

        return $next($request);
    }
}