<?php

namespace App\Http\Controllers;

use App\Models\Car;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function index()
    {
        // Récupérer les 6 dernières voitures pour la page d'accueil
        $latestCars = Car::with(['brand', 'fuel', 'user'])
            ->latest()
            ->take(6)
            ->get();
            
        return Inertia::render('Welcome', [
            'latestCars' => $latestCars
        ]);
    }
}