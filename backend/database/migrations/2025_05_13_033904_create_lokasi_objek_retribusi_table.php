<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateLokasiObjekRetribusiTable extends Migration
{
    public function up()
    {
        Schema::create('lokasiObjekRetribusi', function (Blueprint $table) {
            $table->id('idLokasiObjekRetribusi');
            $table->string('lokasiObjekRetribusi');
            $table->text('keterangan')->nullable();
            $table->timestamp('createAt')->nullable();
            $table->timestamp('updateAt')->nullable();
            $table->boolean('isDeleted')->default(0);
        });
    }

    public function down()
    {
        Schema::dropIfExists('lokasiObjekRetribusi');
    }
}
