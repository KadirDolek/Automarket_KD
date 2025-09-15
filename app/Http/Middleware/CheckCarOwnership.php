<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use App\Models\Car;
use Symfony\Component\HttpFoundation\Response;
use Inertia\Inertia;

class CheckCarOwnership
{
    public function handle(Request $request, Closure $next): Response
    {
        $carId = $request->route('id');
        $car = Car::findOrFail($carId);
        $user = auth()->user();

        // Vérifier si l'utilisateur peut modifier cette voiture
        if ($car->user_id !== $user->id && 
            !in_array($user->role?->name, ['admin', 'moderateur'])) {
            
            // Pour Inertia, retourner une page d'erreur ou rediriger
            if ($request->expectsJson() || $request->header('X-Inertia')) {
                return Inertia::render('Error', [
                    'status' => 403,
                    'message' => 'Vous n\'avez pas l\'autorisation de modifier cette voiture.'
                ])->toResponse($request)->setStatusCode(403);
            }
            
            abort(403, 'Vous n\'avez pas l\'autorisation de modifier cette voiture.');
        }

        return $next($request);
    }
}