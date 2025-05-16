<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
public function up()
{
    Schema::create('wajibRetribusi', function (Blueprint $table) {
        $table->id('idWajibRetribusi');
        $table->string('NIK', 16);
        $table->string('namaWajibRetribusi', 255);
        $table->string('pekerjaan', 100);
        $table->text('alamat');
        $table->string('nomorPonsel', 20)->nullable();
        $table->string('nomorWhatsapp', 20)->nullable();
        $table->string('email', 100)->nullable();
        $table->unsignedBigInteger('idJenisRetribusi')->nullable();
        $table->text('fileFoto')->nullable();
        $table->timestamps();
        $table->boolean('isDeleted')->default(false);
    });
}

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('wajibretribusi');
    }
};
