<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $datos = Order::get();
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
            'order_number' => 'required',
            'status_id' => 'required',
            'clients_id' => 'required'
        ]);

        $order = new Order;
        $order->order_number =$request->order_number;
        $order->status_id =$request->status_id;
        $order->clients_id =$request->clients_id;
        $order->save();

        return response()->json(['creado'=> 'Exitoso'],200); 
    }

    /**
     * Display the specified resource.
     */
    public function show(Order $order)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Order $order)
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
            'order_number' => 'required',
            'status_id' => 'required',
            'clients_id' => 'required'
        ]);

        $order = Order::find($id);
        $order->order_number =$request->order_number;
        $order->status_id =$request->status_id;
        $order->clients_id =$request->clients_id;
        $order->save();

        return response()->json(['Actualizado'=> 'Exitoso'],200); 

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        //
        $order = Order::find($id);
        $order->delete();
        return response()->json(['Eliminado'=> 'Eliminado'],200); 
    }
}
