<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDoctorsNotesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('doctors_notes', function (Blueprint $table) {
            $table->id();
            $table->string('appointment_id')->nullable();
            $table->string('patient_id')->nullable();
            $table->string('doctor_id')->nullable();
            $table->longText('note')->nullable();
            $table->boolean('general')->default(0);
            $table->boolean('cardiovascular')->default(0);
            $table->boolean('respiratory')->default(0);
            $table->boolean('gastro')->default(0);
            $table->boolean('neurology')->default(0);
            $table->boolean('cns')->default(0);
            $table->boolean('genito')->default(0);
            $table->boolean('eye')->default(0);
            $table->boolean('skin')->default(0);
            $table->boolean('musculo')->default(0);
            $table->boolean('mental')->default(0);
            $table->boolean('womens')->default(0);
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
        Schema::dropIfExists('doctors_notes');
    }
}
