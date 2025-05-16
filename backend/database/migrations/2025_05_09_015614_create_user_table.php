<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('user', function (Blueprint $table) {
            $table->id('userId');
            $table->string('username', 100);
            $table->string('password');
            $table->text('token')->nullable();
            $table->string('email', 100);
            $table->text('keterangan')->nullable();
            $table->timestamps();
            $table->softDeletes();
            $table->boolean('isDeleted')->default(false);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('user');
    }
};
