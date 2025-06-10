<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;

class FavouriteController extends Controller
{
  public function index(Request $request)
  {
    $user = $request->user();

    $productIds = $user->favouriteProducts()->pluck('products.id');

    return response()->json([
      'user_id' => $user->id,
      'favourites' => $productIds
    ]);
  }


  public function store(Request $request)
  {
    $request->validate([
      'user_id' => 'required|exists:users,id',
      'product_id' => 'required|exists:products,id',
    ]);

    $request->user()->favouriteProducts()->syncWithoutDetaching([$request->product_id]);

    return response()->json([
      $request->only(['user_id', 'product_id'])
    ]);
  }

  public function destroy(Product $product, Request $request)
  {
    $request->user()->favouriteProducts()->detach($product->id);

    return response()->json($product->id);
  }
}
