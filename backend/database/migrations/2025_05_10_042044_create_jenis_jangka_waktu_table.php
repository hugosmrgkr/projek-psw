<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('jenisJangkaWaktu', function (Blueprint $table) {
            $table->id('idJenisJangkaWaktu');
            $table->string('jenisJangkaWaktu', 100);
            $table->text('keterangan')->nullable();
            $table->timestamps();
            $table->softDeletes();
            $table->boolean('isDeleted')->default(false);
        });
    }

    public function down(): void {
        Schema::dropIfExists('jenisJangkaWaktu');
    }
};
