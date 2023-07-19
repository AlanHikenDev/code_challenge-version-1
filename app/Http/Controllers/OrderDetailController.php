<?php

namespace App\Http\Controllers;

use App\Models\Order_detail;
use Illuminate\Http\Request;

class OrderDetailController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $datos = Order_detail::get();
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
            'order_id' => 'required',
            'product_id' => 'required',
            'price' => 'required'
        ]);

        $order_detail = new Order;
        $order_detail->order_id = $request->order_id;
        $order_detail->product_id = $request->product_id;
        $order_detail->price = $request->price;
        $order_detail->save();

        return response()->json(['creado'=> 'Exitoso'],200); 
    }

    /**
     * Display the specified resource.
     */
    public function show(Order_detail $order_detail)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Order_detail $order_detail)
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
            'order_id' => 'required',
            'product_id' => 'required',
            'price' => 'required'
        ]);

        $order_detail =  Order::find($id);
        $order_detail->order_id = $request->order_id;
        $order_detail->product_id = $request->product_id;
        $order_detail->price = $request->price;
        $order_detail->save();

        return response()->json(['Actaulizado'=> 'Exitoso'],200); 
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        //
        $order_detail =  Order::find($id);
        $order_detail->delete();
        return response()->json(['Eliminado'=> 'Exitoso'],200); 
    }
}
