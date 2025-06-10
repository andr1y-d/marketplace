<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class Product extends Model
{
  use HasApiTokens, HasFactory, Notifiable;

  public function owner()
  {
    return $this->belongsTo(User::class, 'ownerId');
  }

  public function favouritedBy()
  {
    return $this->belongsToMany(User::class, 'favourites');
  }

  protected $fillable = [
    'title',
    'description',
    'photos',
    'location',
    'price',
    'ownerId',
  ];
}
