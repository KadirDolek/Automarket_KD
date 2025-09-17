<?php

namespace App\Http\Controllers;

use App\Models\Brand;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Storage;

class BrandController extends Controller
{
    public function index()
    {
        if (!Gate::allows('manage-brands')) {
            abort(403, 'Accès non autorisé.');
        }
        
        $brands = Brand::withCount('cars')->paginate(10);
        
        return Inertia::render('Admin/Brands/Index', [
            'brands' => $brands
        ]);
    }

    public function create()
    {
        if (!Gate::allows('manage-brands')) {
            abort(403, 'Accès non autorisé.');
        }
        
        return Inertia::render('Admin/Brands/Create');
    }

    public function show(Brand $brand)
{
    if (!Gate::allows('manage-brands')) {
        abort(403, 'Accès non autorisé.');
    }
    
    $brand->load('cars');
    
    return Inertia::render('Admin/Brands/Show', [
        'brand' => $brand
    ]);
}
    public function store(Request $request)
    {
        if (!Gate::allows('manage-brands')) {
            abort(403, 'Accès non autorisé.');
        }
        
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:brands',
            'logo' => 'nullable|image|max:2048'
        ]);
        
        if ($request->hasFile('logo')) {
            $validated['logo'] = $request->file('logo')->store('brands', 'public');
        }
        
        Brand::create($validated);
        
        return redirect()->route('admin.brands.index')
            ->with('success', 'Marque créée avec succès.');
    }

    public function edit(Brand $brand)
    {
        if (!Gate::allows('manage-brands')) {
            abort(403, 'Accès non autorisé.');
        }
        
        return Inertia::render('Admin/Brands/Edit', [
            'brand' => $brand
        ]);
    }

    public function update(Request $request, Brand $brand)
    {
        // Vérifier l'autorisation
        if (!Gate::allows('manage-brands')) {
            abort(403, 'Accès non autorisé');
        }

        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:brands,name,' . $brand->id,
            'logo' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048'
        ]);

        // Gérer le logo
        if ($request->hasFile('logo')) {
            // Supprimer l'ancien logo s'il existe
            if ($brand->logo && Storage::exists($brand->logo)) {
                Storage::delete($brand->logo);
            }

            // Stocker le nouveau logo
            $validated['logo'] = $request->file('logo')->store('brands', 'public');
        } elseif ($request->has('remove_logo')) {
            // Supprimer le logo existant
            if ($brand->logo && Storage::exists($brand->logo)) {
                Storage::delete($brand->logo);
            }
            $validated['logo'] = null;
        }

        $brand->update($validated);

        return redirect()->route('admin.brands.index')
            ->with('success', 'Marque mise à jour avec succès.');
    }

    public function destroy(Brand $brand)
    {
        // Vérifier l'autorisation
        if (!Gate::allows('manage-brands')) {
            abort(403, 'Accès non autorisé');
        }

        // Vérifier si la marque a des voitures associées
        if ($brand->cars()->count() > 0) {
            return redirect()->route('admin.brands.index')
                ->with('error', 'Impossible de supprimer cette marque car elle est associée à des véhicules.');
        }

        // Supprimer le logo s'il existe
        if ($brand->logo && Storage::exists($brand->logo)) {
            Storage::delete($brand->logo);
        }

        $brand->delete();

        return redirect()->route('admin.brands.index')
            ->with('success', 'Marque supprimée avec succès.');
    }
}