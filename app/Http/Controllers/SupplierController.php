<?php

namespace App\Http\Controllers;

use App\Models\Supplier;
use Illuminate\Http\Request;

class SupplierController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $datos = Supplier::get();
        return response()->json(['datos'=> $datos],200); 
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
        $request->validate([
            'name' => 'required'
        ]);

        $supplier = new Supplier;
        $supplier->name = $request->name;
        $supplier->save();

        return response()->json(['creado'=> 'Exitoso'],200);
    }

    /**
     * Display the specified resource.
     */
    public function show(supplier $supplier)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(supplier $supplier)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        //
        $request->validate([
            'name' => 'required'
        ]);

        $supplier = Supplier::find($id);
        $supplier->name = $request->name;
        $supplier->save();

        return response()->json(['Actualizado'=> 'Exitoso'],200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        // validacion de integridad de datos
        $supplier =  Supplier::find($id);
        $supplier->delete();
        return response()->json(['Eliminado'=> 'Exitoso'],200);
    }
}
