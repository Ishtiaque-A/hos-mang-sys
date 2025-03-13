<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCnsPictureUpperLimbDermatomesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('cns_picture_upper_limb_dermatomes', function (Blueprint $table) {
            $table->id();
            $table->string('PULimbDermatomes_name')->nullable();
            $table->string('image')->nullable();
            $table->integer('delete_status')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('cns_picture_upper_limb_dermatomes');
    }
}
