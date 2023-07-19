<?php

namespace App\Http\Controllers;

use App\Models\Supplier_products;
use Illuminate\Http\Request;

class SupplierProductsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $datos = Supplier_products::get();
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
            'product_id' => 'required'
            'supplier_id' => 'required'
        ]);

        $supplier_products = new Supplier_products;
        $supplier_products->product_id = $request->product_id;
        $supplier_products->supplier_id = $request->supplier_id;
        $supplier_products->save();

        return response()->json(['creado'=> 'Exitoso'],200);
    }

    /**
     * Display the specified resource.
     */
    public function show(supplier_products $supplier_products)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(supplier_products $supplier_products)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, supplier_products $supplier_products)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy( $id)
    {
        //
        $supplier_products =  Supplier_products::find($id);
        $supplier_products->delete();
        return response()->json(['Eliminado'=> 'Exitoso'],200);
    }
}
