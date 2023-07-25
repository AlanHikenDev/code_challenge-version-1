<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class Login extends Controller
{
	public function login(Request $request)
    {
			//return $request->all();
        $request->validate([
            'email' => ['required'],
            'password' => ['required']
        ]);
        if (Auth::attempt($request->only('email', 'password'))) {
					$user = Auth::user();
					if(!$user->token) { // si no tiene token
						$token =  Auth::user()->createToken('t'.$user->id);
						$user->token =  $token->plainTextToken;
						$user->save();
					}
          
          return [
            'token' => $user->token,
            'user' => Auth::user(),
            'error' => false,
          ];
        }
        return [
           'message' => 'Credenciales Erroneas',
           'error' => true,
         ];
    }
    
	
    public function logout() {
      $user = Auth::user();
      if (!empty($user)) {
        $user->tokens()->where('name','t'.$user->id)->delete();
        return ["mensaje" => "Se eliminaron los tokens"];
      }
      Auth::logout();
    }

    public function auth_user() {
      return ['user' => Auth::user()];
    }

    public function register(Request $request) {
      $data = $request->all();
      $user = User::where('email', '=', $data['email'])->first();
        if ($user === null) {
        $data['password'] = Hash::make($data['password']);
        $query = new User();
			  $query->create($data);
        return "ok";
        }else{
          return "correo perdido";
        }
    }
}
