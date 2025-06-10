<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginUserRequest;
use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
  public function show($id)
  {
    $user = User::find($id);

    if (!$user) {
      return response()->json(['message' => 'Користувача не знайдено'], 404);
    }

    return response()->json($user);
  }

  public function update(UpdateUserRequest $request, $id)
  {
    $user = User::find($id);

    if (!$user) {
      return response()->json(['message' => 'Користувача не знайдено'], 404);
    }

    if (Auth::id() !== $user->id) {
      return response()->json(['message' => 'Доступ заборонено'], 403);
    }

    $validated = $request->validated();

    $validated['fullName'] = $validated['fullName'] ?? $user->fullName;
    $validated['phone'] = $validated['phone'] ?? $user->phone;

    if ($request->hasFile('avatar')) {
      $avatar = $request->file('avatar');
      $filename = uniqid() . '_' . $avatar->getClientOriginalName();
      $path = $avatar->storeAs('uploads', $filename, 'public');
      $validated['avatar'] = 'storage/' . $path;
    }

    try {
      $user->update($validated);
      return response()->json($user);
    } catch (\Exception $e) {
      return response()->json([
        'error' => 'Помилка при оновленні користувача',
        'message' => $e->getMessage(),
      ], 500);
    }
  }


  public function register(StoreUserRequest $request)
  {
    $user = User::query()->create($request->all());
    $token = $user->createToken('token')->plainTextToken;
    return response()->json([
      'user' => [
        'fullName' => $user->fullName,
        'email' => $user->email,
        'avatar' => $user->avatar,
        'phone' => $user->phone,
      ],
      'token' => $token,
    ]);
  }

  public function login(LoginUserRequest $request)
  {
    $user = User::query()->where('email', $request->email)->first();
    $token = $user->createToken('token')->plainTextToken;
    return response()->json([
      'user' => [
        'id'=> $user->id,
        'fullName' => $user->fullName,
        'email' => $user->email,
        'avatar' => $user->avatar,
        'phone' => $user->phone,
      ],
      'token' => $token,
    ]);
  }

  public function logout()
  {
    Auth::user()->currentAccessToken()->delete();
    return response()->json(['message' => 'Successfully logged out']);
  }
}
