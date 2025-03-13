<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMhpPaediatricParentsPage5sTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('mhp_paediatric_parents_page5s', function (Blueprint $table) {
            $table->id();
             $table->string("regarading_feeding")->nullable();
            $table->string("receive_breast_milk")->nullable();
            $table->string("vitamins_or_mineral")->nullable();
            $table->string("plain_water")->nullable();
            $table->string("infant_formula")->nullable();
            $table->string("solid_or_semi")->nullable();
            $table->string("child_smiles")->nullable();
            $table->string("child_chukles")->nullable();
            $table->string("child_loooks_at_you")->nullable();
            $table->string("child_makes_sounds")->nullable();
            $table->string("child_makes_sounds_back")->nullable();
            $table->string("child_turns_head")->nullable();
            $table->string("child_if_hungry")->nullable();
            $table->string("child_looks_at_his_hands")->nullable();
            $table->string("child_other_important")->nullable();
            $table->string("baby_do_together")->nullable();
            $table->string("baby_likes_to_do")->nullable();
            $table->string("anything_your_baby_does")->nullable();
            $table->string("lost_any_skills")->nullable();
            $table->string("healthcare_needs")->nullable();
            $table->string("patient_id")->nullable();
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
        Schema::dropIfExists('mhp_paediatric_parents_page5s');
    }
}
