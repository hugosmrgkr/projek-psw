<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateObjekRetribusiTable extends Migration
{
    public function up()
    {
        Schema::create('objekRetribusi', function (Blueprint $table) {
            $table->id('idObjekRetribusi');
            $table->unsignedBigInteger('idLokasiObjekRetribusi');
            $table->unsignedBigInteger('idJenisObjekRetribusi');
            $table->string('kodeObjekRetribusi', 100);
            $table->string('noBangunan', 100);
            $table->unsignedInteger('jumlahLantai');
            $table->string('objekRetribusi', 255);
            $table->decimal('panjangTanah', 10, 2);
            $table->decimal('lebarTanah', 10, 2);
            $table->decimal('luasTanah', 10, 2);
            $table->decimal('panjangBangunan', 10, 2);
            $table->decimal('lebarBangunan', 10, 2);
            $table->decimal('luasBangunan', 10, 2);
            $table->text('alamat');
            $table->decimal('latitude', 10, 6)->nullable();
            $table->decimal('longitude', 10, 6)->nullable();
            $table->text('keterangan')->nullable();
            $table->text('gambarDenahTanah')->nullable();
            $table->timestamps();
            $table->boolean('isDeleted')->default(false);
            $table->softDeletes();

            // Foreign key constraints
            $table->foreign('idLokasiObjekRetribusi')
                ->references('idLokasiObjekRetribusi')
                ->on('lokasiObjekRetribusi')
                ->onUpdate('cascade')
                ->onDelete('restrict');

            $table->foreign('idJenisObjekRetribusi')
                ->references('idJenisObjekRetribusi')
                ->on('jenisObjekRetribusi')
                ->onUpdate('cascade')
                ->onDelete('restrict');
        });
    }

    public function down()
    {
        Schema::dropIfExists('objekRetribusi');
    }
}
