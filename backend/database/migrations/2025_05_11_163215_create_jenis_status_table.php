<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateJenisStatusTable extends Migration
{
    public function up()
    {
        Schema::create('jenisStatus', function (Blueprint $table) {
            $table->id('idJenisStatus');
            $table->enum('jenisStatus', ['Proses', 'Disetujui', 'Ditolak', 'Dibatalkan']);
            $table->text('keterangan')->nullable();
            $table->timestamps();
            $table->boolean('isDeleted')->default(false);
            $table->softDeletes();
        });
    }

    public function down()
    {
        Schema::dropIfExists('jenisStatus');
    }
}
