<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePeruntukanSewaTable extends Migration
{
    public function up()
    {
        Schema::create('peruntukanSewa', function (Blueprint $table) {
            $table->id('idPeruntukanSewa');
            $table->string('jenisKegiatan', 100);
            $table->string('peruntukanSewa', 100);
            $table->text('keterangan')->nullable();
            $table->timestamps();
            $table->boolean('isDeleted')->default(false);
            $table->softDeletes();
        });
    }

    public function down()
    {
        Schema::dropIfExists('peruntukanSewa');
    }
}