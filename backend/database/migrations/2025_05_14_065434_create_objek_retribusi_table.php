<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateObjekRetribusiTable extends Migration
{
    public function up()
    {
        Schema::create('objek_retribusi', function (Blueprint $table) {
            $table->id('id_objek_retribusi'); // Primary key
            $table->unsignedBigInteger('id_lokasi_objek_retribusi')->nullable();
            $table->unsignedBigInteger('id_jenis_objek_retribusi')->nullable();
            $table->string('kode_objek_retribusi')->nullable();
            $table->string('no_bangunan')->nullable();
            $table->integer('jumlah_lantai')->nullable();
            $table->decimal('panjang_tanah', 10, 2)->nullable();
            $table->decimal('lebar_tanah', 10, 2)->nullable();
            $table->decimal('luas_tanah', 10, 2)->nullable();
            $table->decimal('panjang_bangunan', 10, 2)->nullable();
            $table->decimal('lebar_bangunan', 10, 2)->nullable();
            $table->decimal('luas_bangunan', 10, 2)->nullable();
            $table->text('alamat');
            $table->string('latitude')->nullable();
            $table->string('longitude')->nullable();
            $table->text('keterangan')->nullable();
            $table->string('gambar_denah_tanah')->nullable();
            $table->timestamps();
            $table->boolean('is_deleted')->default(0); // Status deleted (soft delete)
        });
    }

    public function down()
    {
        Schema::dropIfExists('objek_retribusi');
    }
}
