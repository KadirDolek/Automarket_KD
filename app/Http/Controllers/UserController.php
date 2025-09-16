<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Role;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserController extends Controller
{
    private function ensureAdmin()
    {
        $user = auth()->user();
        if (!$user || ($user->role?->role !== 'admin' && $user->role?->role !== 'admin')) {
            abort(403, 'Accès réservé aux administrateurs.');
        }
    }

    // index: liste des utilisateurs
    public function index()
    {
        $this->ensureAdmin();

        $users = User::with('role')->orderBy('id','desc')->get();
        $roles = Role::all();

        return Inertia::render('Dashboard', [
            'users' => $users,
            'roles' => $roles,
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

        // Empêcher d'éditer un autre admin
        if ($user->role && (($user->role->role ?? $user->role->role) === 'admin')) {
            return redirect()->route('dashboard')->with('error', "Impossible d'éditer un autre administrateur.");
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

        // Empêcher la modification si la cible est un admin
        if ($user->role && (($user->role->role ?? $user->role->role) === 'admin')) {
            return redirect()->route('dashboard')->with('error', "Impossible de modifier le rôle d'un autre administrateur.");
        }

        $request->validate([
            'role_id' => 'nullable|exists:roles,id',
        ]);

        $user->role_id = $request->input('role_id');
        $user->save();

        return redirect()->route('dashboard')->with('success', 'Rôle mis à jour.');
    }
}