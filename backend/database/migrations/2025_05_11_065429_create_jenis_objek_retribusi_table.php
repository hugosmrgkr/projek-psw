<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateJenisObjekRetribusiTable extends Migration
{
    public function up()
    {
        Schema::create('jenisObjekRetribusi', function (Blueprint $table) {
            $table->id('idJenisObjekRetribusi');
            $table->string('jenisObjekRetribusi', 100);
            $table->text('keterangan')->nullable();
            $table->timestamps();
            $table->softDeletes(); // Tambahkan soft delete
        });
    }

    public function down()
    {
        Schema::dropIfExists('jenisObjekRetribusi');
    }
};
