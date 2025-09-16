<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\User;
use App\Models\Role;
use App\Models\Car;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();

        // CORRIGÉ: Autoriser admin ET modo
        if ($user && $user->role && in_array($user->role->role, ['admin', 'modo'])) {
            $users = User::with('role')->orderBy('id','desc')->get();
            $roles = Role::all();
            $cars = Car::with(['brand','fuel','user'])->orderBy('id','desc')->get();

            return Inertia::render('Dashboard', [
                'users' => $users,
                'roles' => $roles,
                'cars'  => $cars,
            ]);
        }

        return Inertia::render('Dashboard');
    }
}