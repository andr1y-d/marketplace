<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class CorsMiddleware
{
  public function handle(Request $request, Closure $next)
  {
    if ($request->getMethod() === "OPTIONS") {
      return response('', 200)
        ->withHeaders([
          'Access-Control-Allow-Origin' => 'http://localhost:3000',
          'Access-Control-Allow-Methods' => 'GET, POST, PUT, DELETE, OPTIONS',
          'Access-Control-Allow-Headers' => 'Content-Type, Authorization',
          'Access-Control-Allow-Credentials' => 'true',
        ]);
    }

    $response = $next($request);
    return $response->withHeaders([
      'Access-Control-Allow-Origin' => 'http://localhost:3000',
      'Access-Control-Allow-Methods' => 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers' => 'Content-Type, Authorization',
      'Access-Control-Allow-Credentials' => 'true',
    ]);
  }
}
