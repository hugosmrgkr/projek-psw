<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateStatusTable extends Migration
{
    public function up()
    {
        Schema::create('status', function (Blueprint $table) {
            $table->id('idStatus');
            $table->unsignedBigInteger('idJenisStatus');
            $table->foreign('idJenisStatus')->references('idJenisStatus')->on('jenisStatus')->onUpdate('cascade')->onDelete('restrict');
            $table->string('namaStatus', 100);
            $table->text('keterangan')->nullable();
            $table->boolean('isDeleted')->default(false);
            $table->timestamps();
            $table->softDeletes();
        });
    }

    public function down()
    {
        Schema::dropIfExists('status');
    }
}
