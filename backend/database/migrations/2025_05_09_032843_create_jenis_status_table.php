<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('jenisStatus', function (Blueprint $table) {
            $table->id('idJenisStatus');
            $table->string('jenisStatus');
            $table->text('keterangan')->nullable();
            $table->dateTime('createAt')->nullable();
            $table->dateTime('updateAt')->nullable();
            $table->boolean('isDeleted')->default(0);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('jenisStatus');
    }
};