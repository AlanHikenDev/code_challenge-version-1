<?php

namespace App\Http\Controllers;

use App\Models\Client;
use Illuminate\Http\Request;

class ClientController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // listar para que consuma el api 
         $datos = Client::get();
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
        // aqui lo mas indicado seria validar con un request individual y no usuar el request por defecto
        $request->validate([
            'name' => 'required',
            'last_name' => 'required',
            'email' => 'required'
        ]);

        $client = new Client;
        $client->name =$request->name;
        $client->last_name =$request->last_name;
        $client->email =$request->email;
        $client->save();

        return response()->json(['creado'=> 'Exitoso'],200); 

    }

    /**
     * Display the specified resource.
     */
    public function show(Client $client)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Client $client)
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
            'name' => 'required',
            'last_name' => 'required',
            'email' => 'required'
        ]);

        $client = Client::find($id);
        $client->name =$request->name;
        $client->last_name =$request->last_name;
        $client->email =$request->email;
        $client->save();

        return response()->json(['actualizado'=> 'Exitoso'],200); 
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy( $id)
    {
        //
        $client = Client::find($id);
        $client->delete();
        return response()->json(['Eliminado'=> 'Eliminado'],200); 
    }
}
