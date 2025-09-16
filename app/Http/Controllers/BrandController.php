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
        if (!Gate::allows('manage-brands')) {
            abort(403, 'Accès non autorisé.');
        }
        
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:brands,name,' . $brand->id,
            'logo' => 'nullable|image|max:2048'
        ]);
        
        if ($request->hasFile('logo')) {
            // Supprimer l'ancien logo s'il existe
            if ($brand->logo) {
                Storage::disk('public')->delete($brand->logo);
            }
            $validated['logo'] = $request->file('logo')->store('brands', 'public');
        }
        
        $brand->update($validated);
        
        return redirect()->route('admin.brands.index')
            ->with('success', 'Marque mise à jour avec succès.');
    }

    public function destroy(Brand $brand)
    {
        if (!Gate::allows('manage-brands')) {
            abort(403, 'Accès non autorisé.');
        }
        
        // Vérifier s'il y a des voitures associées à cette marque
        if ($brand->cars()->count() > 0) {
            return back()->with('error', 'Impossible de supprimer cette marque car elle est utilisée par des véhicules.');
        }
        
        // Supprimer le logo s'il existe
        if ($brand->logo) {
            Storage::disk('public')->delete($brand->logo);
        }
        
        $brand->delete();
        
        return redirect()->route('admin.brands.index')
            ->with('success', 'Marque supprimée avec succès.');
    }
}