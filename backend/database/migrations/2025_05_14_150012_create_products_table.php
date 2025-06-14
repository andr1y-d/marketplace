<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
  public function up(): void
  {
    Schema::create('products', function (Blueprint $table) {
      $table->id();
      $table->unsignedBigInteger('ownerId');
      $table->string('title');
      $table->text('description')->nullable();
      $table->json('photos')->nullable();
      $table->string('location')->nullable();
      $table->decimal('price', 10, 2);
      $table->timestamps();
      $table->foreign('ownerId')
        ->references('id')
        ->on('users')
        ->onDelete('cascade');
    });
  }

  public function down(): void
  {
    Schema::dropIfExists('products');
  }
};
