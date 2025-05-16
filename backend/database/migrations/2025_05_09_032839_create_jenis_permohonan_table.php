<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
public function up()
{
    Schema::create('jenisPermohonan', function (Blueprint $table) {
        $table->id('idJenisPermohonan');
        $table->unsignedBigInteger('parentId')->nullable();
        $table->enum('jenisPermohonan', ['Permohonan Baru', 'Perpanjangan', 'Pembaharuan']);
        $table->text('keterangan')->nullable();
        $table->timestamps();
        $table->boolean('isDeleted')->default(false);
    });
}

public function down()
{
    Schema::dropIfExists('jenisPermohonan');
}

};
