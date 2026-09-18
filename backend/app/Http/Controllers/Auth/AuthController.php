<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use App\Models\Store;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    /**
     * Inscription d'un nouveau vendeur + création de sa boutique (en attente de validation).
     */
    public function register(Request $request)
    {
        $data = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users,email'],
            'password' => ['required', 'string', 'min:6', 'confirmed'],
            'phone' => ['nullable', 'string', 'max:30'],

            'store_type' => ['nullable', 'in:business,individual'],
            'store_name' => ['required', 'string', 'max:255'],
            'category_id' => ['nullable', 'exists:categories,id'],
            'whatsapp_number' => ['required', 'string', 'max:30'],
            'description' => ['nullable', 'string'],
            'address' => ['nullable', 'string', 'max:255'],
            'city' => ['nullable', 'string', 'max:255'],
        ]);

        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => Hash::make($data['password']),
            'phone' => $data['phone'] ?? null,
            'role' => 'vendor',
        ]);

        $store = Store::create([
            'user_id' => $user->id,
            'category_id' => $data['category_id'] ?? null,
            'type' => $data['store_type'] ?? 'business',
            'name' => $data['store_name'],
            'description' => $data['description'] ?? null,
            'address' => $data['address'] ?? null,
            'city' => $data['city'] ?? null,
            'whatsapp_number' => $data['whatsapp_number'],
            'status' => 'pending',
        ]);

        $token = $user->createToken('makitii')->plainTextToken;

        return response()->json([
            'message' => 'Votre compte et votre boutique ont été créés. Votre boutique sera visible après validation par un administrateur.',
            'token' => $token,
            'user' => new UserResource($user->load('store')),
        ], 201);
    }

    public function login(Request $request)
    {
        $data = $request->validate([
            'email' => ['required', 'string', 'email'],
            'password' => ['required', 'string'],
        ]);

        $user = User::where('email', $data['email'])->first();

        if (! $user || ! Hash::check($data['password'], $user->password)) {
            throw ValidationException::withMessages([
                'email' => ['Les identifiants fournis sont incorrects.'],
            ]);
        }

        $token = $user->createToken('makitii')->plainTextToken;

        return response()->json([
            'token' => $token,
            'user' => new UserResource($user->load('store')),
        ]);
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json(['message' => 'Déconnecté avec succès.']);
    }

    public function me(Request $request)
    {
        return new UserResource($request->user()->load('store'));
    }
}
