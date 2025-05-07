<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateJenisPermohonanTable extends Migration
{
    public function up()
    {
        Schema::create('jenis_permohonan', function (Blueprint $table) {
            $table->id('idJenisPermohonan'); // primary key sesuai model
            $table->unsignedBigInteger('parentId')->nullable(); // relasi ke jenis permohonan lain (opsional)
            $table->string('nama_jenis_permohonan', 255);
            $table->text('keterangan')->nullable();
            $table->timestamp('createAt')->nullable();
            $table->timestamp('updateAt')->nullable();
            $table->boolean('isDeleted')->default(false);

            // Optional: jika ingin parentId refer ke jenis_permohonan.idJenisPermohonan
            // $table->foreign('parentId')->references('idJenisPermohonan')->on('jenis_permohonan')->onDelete('set null');
        });
    }

    public function down()
    {
        Schema::dropIfExists('jenis_permohonan');
    }
}
