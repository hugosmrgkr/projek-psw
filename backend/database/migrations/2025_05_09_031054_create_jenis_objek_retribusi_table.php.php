<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('jenisObjekRetribusi', function (Blueprint $table) {
            $table->id('idJenisObjekRetribusi');
            $table->string('jenisObjekRetribusi');
            $table->text('keterangan')->nullable();
            $table->timestamp('createAt')->nullable();
            $table->timestamp('updateAt')->nullable();
            $table->boolean('isDeleted')->default(0);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('jenisObjekRetribusi');
    }
};
