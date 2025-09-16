<?php

namespace App\Http\Controllers;

use App\Models\Car;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function index()
    {
        $latestCars = Car::with(['brand', 'fuel'])
            ->latest()
            ->take(6)
            ->get();
            
        return Inertia::render('Catalogue', [
            'latestCars' => $latestCars
        ]);
    }
}