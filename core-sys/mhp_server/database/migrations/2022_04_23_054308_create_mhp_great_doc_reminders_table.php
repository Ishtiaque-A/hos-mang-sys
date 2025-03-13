<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMhpGreatDocRemindersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('mhp_great_doc_reminders', function (Blueprint $table) {
            $table->id();
             $table->string('patient_id')->nullable();
            $table->string('andDate')->nullable();
            $table->string('details')->nullable();
            $table->string('dr_id')->nullable();
            $table->string('dueBetween')->nullable();
            $table->string('inactive_patient')->nullable()->comment('1=true ,0=false');
            $table->string('location_id')->nullable();
            $table->string('onDate')->nullable();
            $table->string('overrude_reminder')->nullable()->comment('1=true ,0=false');
            $table->string('reason_id')->nullable();
            $table->string('multipleChecked')->nullable();
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
        Schema::dropIfExists('mhp_great_doc_reminders');
    }
}
