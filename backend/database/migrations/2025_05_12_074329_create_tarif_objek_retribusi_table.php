<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTarifObjekRetribusiTable extends Migration
{
    public function up()
    {
        Schema::create('tarifObjekRetribusi', function (Blueprint $table) {
            $table->id('idTarifObjekRetribusi');
            $table->unsignedBigInteger('idObjekRetribusi');
            $table->foreign('idObjekRetribusi')->references('idObjekRetribusi')->on('objekRetribusi')->onUpdate('cascade')->onDelete('restrict');
            $table->unsignedBigInteger('idJenisJangkaWaktu');
            $table->foreign('idJenisJangkaWaktu')->references('idJenisJangkaWaktu')->on('jenisJangkaWaktu')->onUpdate('cascade')->onDelete('restrict');
            $table->date('tanggalDinilai');
            $table->string('namaPenilai', 100);
            $table->decimal('nominalTarif', 15, 2);
            $table->text('fileTarif')->nullable();
            $table->text('keterangan')->nullable();
            $table->text('fileHasilPenilaian')->nullable();
            $table->boolean('isDefault')->default(false);
            $table->boolean('isDeleted')->default(false);
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('tarifObjekRetribusi');
    }
}