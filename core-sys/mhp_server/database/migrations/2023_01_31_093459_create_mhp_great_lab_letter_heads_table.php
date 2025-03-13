<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMhpGreatLabLetterHeadsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('mhp_great_lab_letter_heads', function (Blueprint $table) {
            $table->id();
            $table->string('lab_incharge_name')->nullable();
            $table->string('lab_incharge_designation')->nullable();
            $table->string('lab_incharge_sign')->nullable();
            $table->string('doctor_name')->nullable();
            $table->string('doctor_designation')->nullable();
            $table->string('doctor_sign')->nullable();
            $table->string('preferred_name')->nullable();
            $table->string('preferred_designation')->nullable();
            $table->string('preferred_sign')->nullable();
            $table->tinyInteger('hide_report_header')->default(0)->comment('0=hide, 1=show');
            $table->string('letter_head_logo')->nullable();
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
        Schema::dropIfExists('mhp_great_lab_letter_heads');
    }
}
