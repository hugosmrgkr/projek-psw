<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePermohonanSewaTable extends Migration
{
    public function up(): void
    {
        Schema::create('permohonanSewa', function (Blueprint $table) {
            $table->id('idPermohonanSewa');
            $table->unsignedBigInteger('idJenisPermohonan');
            $table->foreign('idJenisPermohonan')->references('idJenisPermohonan')->on('jenisPermohonan')->onUpdate('cascade')->onDelete('restrict');
            $table->string('nomorSuratPermohonan', 100);
            $table->date('tanggalPengajuan');
            $table->string('namaPemohon', 255);
            $table->text('alamatPemohon');
            $table->unsignedBigInteger('idTarifObjekRetribusi');
            $table->foreign('idTarifObjekRetribusi')->references('idTarifObjekRetribusi')->on('tarifObjekRetribusi')->onUpdate('cascade')->onDelete('restrict');
            $table->timestamps();
            $table->boolean('isDeleted')->default(false);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('permohonanSewa');
    }
}