<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateJangkaWaktuSewaTable extends Migration
{
    public function up()
    {
        Schema::create('jangkaWaktuSewa', function (Blueprint $table) {
            $table->id('idJangkaWaktuSewa'); // Gunakan auto-increment ID
            $table->unsignedBigInteger('idJenisJangkaWaktu'); // Misalnya, jika ada relasi ke jenis jangka waktu
            $table->string('jangkaWaktu', 255);
            $table->text('keterangan')->nullable();
            $table->boolean('isDefault')->default(false);
            $table->timestamp('createAt')->useCurrent(); // Sesuai dengan model
            $table->timestamp('updateAt')->useCurrent()->nullable(); // Sesuai dengan model
            $table->boolean('isDeleted')->default(false);
            $table->timestamps(); // create_at dan update_at otomatis

            // Optional: foreign key untuk idJenisJangkaWaktu jika diperlukan
            // $table->foreign('idJenisJangkaWaktu')->references('id')->on('jenis_jangka_waktu')->onDelete('cascade');
        });
    }

    public function down()
    {
        Schema::dropIfExists('jangkaWaktuSewa');
    }
}
