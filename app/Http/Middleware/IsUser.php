<?php
// app/Http/Middleware/IsUser.php
namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class IsUser
{
    public function handle(Request $request, Closure $next)
    {
        if (!auth()->check()) {
            return redirect()->route('login');
        }

        return $next($request);
    }
}