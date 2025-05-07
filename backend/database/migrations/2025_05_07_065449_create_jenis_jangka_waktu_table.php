<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateJenisJangkaWaktuTable extends Migration
{
    public function up()
    {
        Schema::create('jenisJangkaWaktu', function (Blueprint $table) {
            $table->increments('idJenisJangkaWaktu'); // Primary Key, Auto Increment
            $table->string('jenisJangkaWaktu', 255);
            $table->text('keterangan')->nullable();
            $table->dateTime('createAt')->nullable();
            $table->dateTime('updateAt')->nullable();
            $table->boolean('isDeleted')->default(0);
        });
    }

    public function down()
    {
        Schema::dropIfExists('jenisJangkaWaktu');
    }
}
