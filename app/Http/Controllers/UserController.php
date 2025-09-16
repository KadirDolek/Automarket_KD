<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Role;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    /**
     * Afficher la liste des utilisateurs
     */
    public function index()
    {
        // Vérifier que l'utilisateur a la permission de gérer les utilisateurs
        if (!Gate::allows('manage-users')) {
            abort(403, 'Accès non autorisé.');
        }
        
        $users = User::with('role')->paginate(10);
        $roles = Role::all();
        
        return Inertia::render('Admin/Users/Index', [
            'users' => $users,
            'roles' => $roles
        ]);
    }

    /**
     * Afficher le formulaire de création d'un utilisateur
     */
    public function create()
    {
        if (!Gate::allows('manage-users')) {
            abort(403, 'Accès non autorisé.');
        }
        
        $roles = Role::all();
        
        return Inertia::render('Admin/Users/Create', [
            'roles' => $roles
        ]);
    }

    /**
     * Enregistrer un nouvel utilisateur
     */
    public function store(Request $request)
    {
        if (!Gate::allows('manage-users')) {
            abort(403, 'Accès non autorisé.');
        }
        
        $validated = $request->validate([
            'nom' => 'required|string|max:255',
            'prenom' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'tel' => 'nullable|string|max:20',
            'password' => 'required|string|min:8|confirmed',
            'role_id' => 'required|exists:roles,id'
        ]);
        
        $user = User::create([
            'nom' => $validated['nom'],
            'prenom' => $validated['prenom'],
            'email' => $validated['email'],
            'tel' => $validated['tel'],
            'password' => Hash::make($validated['password']),
            'role_id' => $validated['role_id']
        ]);
        
        return redirect()->route('admin.users.index')
            ->with('success', 'Utilisateur créé avec succès.');
    }

    /**
     * Afficher les détails d'un utilisateur
     */
    public function show(User $user)
    {
        if (!Gate::allows('manage-users')) {
            abort(403, 'Accès non autorisé.');
        }
        
        $user->load('role', 'cars.brand', 'cars.fuel');
        
        return Inertia::render('Admin/Users/Show', [
            'user' => $user
        ]);
    }

    /**
     * Afficher le formulaire d'édition d'un utilisateur
     */
    public function edit(User $user)
    {
        if (!Gate::allows('manage-users')) {
            abort(403, 'Accès non autorisé.');
        }
        
        $roles = Role::all();
        
        return Inertia::render('Admin/Users/Edit', [
            'user' => $user,
            'roles' => $roles
        ]);
    }

    /**
     * Mettre à jour un utilisateur
     */
    public function update(Request $request, User $user)
    {
        if (!Gate::allows('manage-users')) {
            abort(403, 'Accès non autorisé.');
        }
        
        $validated = $request->validate([
            'nom' => 'required|string|max:255',
            'prenom' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email,' . $user->id,
            'tel' => 'nullable|string|max:20',
            'role_id' => 'required|exists:roles,id'
        ]);
        
        $user->update($validated);
        
        return redirect()->route('admin.users.index')
            ->with('success', 'Utilisateur mis à jour avec succès.');
    }

    /**
     * Mettre à jour le rôle d'un utilisateur (méthode spécifique)
     */
    public function updateRole(User $user, Request $request)
    {
        if (!Gate::allows('manage-users')) {
            abort(403, 'Accès non autorisé.');
        }
        
        $validated = $request->validate([
            'role_id' => 'required|exists:roles,id'
        ]);
        
        $user->update($validated);
        
        return back()->with('success', 'Rôle utilisateur mis à jour.');
    }

    /**
     * Mettre à jour le mot de passe d'un utilisateur
     */
    public function updatePassword(Request $request, User $user)
    {
        if (!Gate::allows('manage-users')) {
            abort(403, 'Accès non autorisé.');
        }
        
        $validated = $request->validate([
            'password' => 'required|string|min:8|confirmed'
        ]);
        
        $user->update([
            'password' => Hash::make($validated['password'])
        ]);
        
        return back()->with('success', 'Mot de passe mis à jour avec succès.');
    }

    /**
     * Supprimer un utilisateur
     */
    public function destroy(User $user)
    {
        if (!Gate::allows('manage-users')) {
            abort(403, 'Accès non autorisé.');
        }
        
        // Empêcher un utilisateur de se supprimer lui-même
        if ($user->id === auth()->id()) {
            return back()->with('error', 'Vous ne pouvez pas supprimer votre propre compte.');
        }
        
        $user->delete();
        
        return redirect()->route('admin.users.index')
            ->with('success', 'Utilisateur supprimé avec succès.');
    }
}