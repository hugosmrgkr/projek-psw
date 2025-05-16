<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateJangkaWaktuSewaTable extends Migration
{
public function up()
{
    Schema::create('jangkaWaktuSewa', function (Blueprint $table) {
        $table->id('idJangkaWaktuSewa');
        // Ganti nama tabel yang benar
        $table->unsignedBigInteger('idJenisJangkaWaktu');
        $table->foreign('idJenisJangkaWaktu')
              ->references('idJenisJangkaWaktu') // Kolom yang menjadi referensi
              ->on('jenisjangkawaktu')  // Nama tabel yang benar
              ->onUpdate('cascade')
              ->onDelete('restrict');
        $table->string('jangkaWaktuSewa', 100);
        $table->text('keterangan')->nullable();
        $table->boolean('isDefault')->default(false);
        $table->timestamps();
        $table->boolean('isDeleted')->default(false);
        $table->softDeletes();
    });
}


    public function down()
    {
        Schema::dropIfExists('jangkaWaktuSewa');
    }
}

