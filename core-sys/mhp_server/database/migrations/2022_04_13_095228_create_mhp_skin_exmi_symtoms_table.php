<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMhpSkinExmiSymtomsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('mhp_skin_exmi_symtoms', function (Blueprint $table) {
            $table->id();
            $table->string('patient_id')->nullable();
            $table->string('skin_exami_id')->nullable();
            $table->string('bodyPart_name')->nullable();
            $table->string('symptom_id')->nullable();
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
        Schema::dropIfExists('mhp_skin_exmi_symtoms');
    }
}
