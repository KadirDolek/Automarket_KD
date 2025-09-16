<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Car;
use App\Models\User;
use App\Models\Role;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserController extends Controller
{
    private function ensureAdmin()
    {
        $user = auth()->user();
        // CORRIGÉ: Autoriser admin ET modo
        if (!$user || !in_array($user->role?->role, ['admin', 'modo'])) {
            abort(403, 'Accès réservé aux administrateurs et modérateurs.');
        }
    }

    // index: liste des utilisateurs
    public function index()
    {
        $this->ensureAdmin();

        $users = User::with('role')->orderBy('id','desc')->get();
        $roles = Role::all();
        $cars = Car::with(['brand', 'fuel', 'user'])->orderBy('id','desc')->get();
        return Inertia::render('Dashboard', [
            'users' => $users,
            'roles' => $roles,
            'cars' => $cars,
        ]);
    }

    // edit: page d'édition d'un utilisateur
    public function edit($id)
    {
        $this->ensureAdmin();

        // Empêcher l'admin d'éditer lui-même
        if ((int)$id === auth()->id()) {
            return redirect()->route('dashboard')->with('error', "Vous ne pouvez pas éditer votre propre compte.");
        }

        $user = User::with('role')->findOrFail($id);

        // CORRIGÉ: Empêcher modo d'éditer admin, mais admin peut éditer modo
        $currentUserRole = auth()->user()->role?->role;
        if ($user->role && $user->role->role === 'admin' && $currentUserRole !== 'admin') {
            return redirect()->route('dashboard')->with('error', "Impossible d'éditer un administrateur.");
        }

        $roles = Role::all();

        return Inertia::render('Dashboard', [
            'editUser' => $user,
            'roles' => $roles,
        ]);
    }

    // update: modifier le role
    public function update(Request $request, $id)
    {
        $this->ensureAdmin();

        // Ne pas permettre la modification du rôle pour soi-même
        if ((int)$id === auth()->id()) {
            return redirect()->route('dashboard')->with('error', "Vous ne pouvez pas modifier votre propre rôle.");
        }

        $user = User::with('role')->findOrFail($id);

        // CORRIGÉ: Même logique que edit
        $currentUserRole = auth()->user()->role?->role;
        if ($user->role && $user->role->role === 'admin' && $currentUserRole !== 'admin') {
            return redirect()->route('dashboard')->with('error', "Impossible de modifier le rôle d'un administrateur.");
        }

        $request->validate([
            'role_id' => 'nullable|exists:roles,id',
        ]);

        $user->role_id = $request->input('role_id');
        $user->save();

        return redirect()->route('dashboard')->with('success', 'Rôle mis à jour.');
    }
}