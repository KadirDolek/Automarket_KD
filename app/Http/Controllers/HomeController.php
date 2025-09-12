<?php

namespace App\Http\Controllers;
use App\Models\Car;
use Inertia\Inertia;

use Illuminate\Http\Request;

class HomeController extends Controller
{
    public function home() {
        $cars = Car::with(['brand', 'fuel'])->get();
        return Inertia::render('Home', compact('cars'));
    }
}
