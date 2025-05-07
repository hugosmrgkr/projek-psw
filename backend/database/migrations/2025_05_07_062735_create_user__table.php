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
        Schema::create('user_', function (Blueprint $table) {
            $table->bigIncrements('userId'); // PRIMARY KEY
            $table->unsignedBigInteger('idUserRole');
            $table->unsignedBigInteger('idPersonal');
            $table->string('username')->unique();
            $table->string('email')->unique();
            $table->string('password_');
            $table->string('token', 80)->nullable();
            $table->text('keterangan')->nullable();
            $table->timestamp('createAt')->nullable();
            $table->timestamp('updateAt')->nullable();
            $table->boolean('isDeleted')->default(false);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('user_');
    }
};
