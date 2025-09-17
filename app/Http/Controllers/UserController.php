<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Role;
use Illuminate\Validation\Rule;
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

     public function update(Request $request, User $user)
    {
        // Vérifier l'autorisation
        if (!Gate::allows('manage-users')) {
            abort(403, 'Accès non autorisé');
        }

        $validated = $request->validate([
            'nom' => 'required|string|max:255',
            'prenom' => 'required|string|max:255',
            'email' => [
                'required',
                'email',
                Rule::unique('users')->ignore($user->id),
            ],
            'tel' => 'nullable|string|max:20',
            'role_id' => 'required|exists:roles,id'
        ]);

        // Empêcher un utilisateur de modifier son propre rôle
        if ($request->user()->id === $user->id && $request->has('role_id')) {
            return back()->withErrors(['role_id' => 'Vous ne pouvez pas modifier votre propre rôle.']);
        }

        $user->update($validated);

        return redirect()->route('admin.users.index')
            ->with('success', 'Utilisateur mis à jour avec succès.');
    }

    public function updateRole(Request $request, User $user)
    {
        // Vérifier l'autorisation
        if (!Gate::allows('manage-users')) {
            abort(403, 'Accès non autorisé');
        }

        // Empêcher un utilisateur de modifier son propre rôle
        if ($request->user()->id === $user->id) {
            return response()->json([
                'message' => 'Vous ne pouvez pas modifier votre propre rôle.'
            ], 403);
        }

        $validated = $request->validate([
            'role_id' => 'required|exists:roles,id'
        ]);

        $user->update(['role_id' => $validated['role_id']]);

        return response()->json([
            'message' => 'Rôle mis à jour avec succès.'
        ]);
    }

    public function destroy(User $user)
    {
        // Vérifier l'autorisation
        if (!Gate::allows('manage-users')) {
            abort(403, 'Accès non autorisé');
        }

        // Empêcher un utilisateur de se supprimer lui-même
        if (auth()->id() === $user->id) {
            return redirect()->route('admin.users.index')
                ->with('error', 'Vous ne pouvez pas supprimer votre propre compte.');
        }

        // Vérifier si l'utilisateur a des voitures
        if ($user->cars()->count() > 0) {
            return redirect()->route('admin.users.index')
                ->with('error', 'Impossible de supprimer cet utilisateur car il possède des véhicules.');
        }

        $user->delete();

        return redirect()->route('admin.users.index')
            ->with('success', 'Utilisateur supprimé avec succès.');
    }
}