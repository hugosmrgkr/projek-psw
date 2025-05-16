<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('lokasiObjekRetribusi', function (Blueprint $table) {
            $table->id('idLokasiObjekRetribusi');
            $table->string('lokasiObjekRetribusi');
            $table->text('keterangan')->nullable();
            $table->timestamps();
            $table->softDeletes(); // soft delete menggunakan deleted_at
            $table->boolean('isDeleted')->default(false); // tambahan flag
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('lokasiObjekRetribusi');
    }
};
