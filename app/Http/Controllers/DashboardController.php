<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\User;
use App\Models\Role;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();

        if ($user && ($user->role?->role === 'admin')) {
            $users = User::with('role')->orderBy('id','desc')->get();
            $roles = Role::all();

            return Inertia::render('Dashboard', [
                'users' => $users,
                'roles' => $roles,
            ]);
        }

        return Inertia::render('Dashboard');
    }
}