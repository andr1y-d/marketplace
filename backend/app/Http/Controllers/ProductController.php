<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreProductRequest;
use App\Http\Requests\UpdateProductRequest;
use App\Http\Resources\ProductResource;
use App\Models\Product;
use Illuminate\Support\Facades\Auth;

class ProductController extends Controller
{
  public function allProducts()
  {
    $products = Product::with('owner:id,fullName')->get();
    return response()->json($products);
  }


  public function getLatestProducts()
  {
    $products = Product::latest()->take(20)->with('owner:id,fullName')->get();
    return ProductResource::collection($products);
  }

  public function userProducts($userId)
  {
    $products = Product::where('ownerId', $userId)->get();
    return response()->json($products);
  }

  public function index()
  {
    return $this->allProducts();
  }

  public function store(StoreProductRequest $request)
  {
    $validated = $request->validated();
    $validated['ownerId'] = Auth::id();

    $allPhotos = [];

    if ($request->hasFile('newPhotos')) {
      foreach ($request->file('newPhotos') as $file) {
        $path = $file->store('uploads', 'public');
        $allPhotos[] = 'storage/' . $path;
      }
    }

    if ($request->oldPhotos) {
      $allPhotos = array_merge($allPhotos, $request->oldPhotos);
    }

    $validated['photos'] = json_encode($allPhotos);

    $product = Product::create($validated);

    return response()->json($product, 201);
  }


  public function show($id)
  {
    $product = Product::with('owner:id,fullName,avatar')->findOrFail($id);
    return response()->json($product);
  }


  public function update(UpdateProductRequest $request, Product $product)
  {
    $validated = $request->validated();
    $validated['ownerId'] = Auth::id();

    $allPhotos = [];

    if ($request->hasFile('newPhotos')) {
      foreach ($request->file('newPhotos') as $file) {
        $path = $file->store('uploads', 'public');
        $allPhotos[] = 'storage/' . $path;
      }
    }

    if ($request->oldPhotos) {
      $allPhotos = array_merge($allPhotos, $request->oldPhotos);
    }

    $validated['photos'] = json_encode($allPhotos);

    $product->update($validated);

    return response()->json($product);
  }

  public function destroy(Product $product)
  {
    if ($product->ownerId !== Auth::id()) {
      return response()->json(['message' => 'Forbidden'], 403);
    }

    $product->delete();

    return response()->json(['message' => 'Deleted']);
  }
}
