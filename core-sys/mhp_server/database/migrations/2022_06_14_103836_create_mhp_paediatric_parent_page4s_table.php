<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMhpPaediatricParentPage4sTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('mhp_paediatric_parent_page4s', function (Blueprint $table) {
            $table->id();
            $table->string("child_clams_down")->nullable();
            $table->string("child_looks_at_your_face")->nullable();
            $table->string("child_seems_happy")->nullable();
            $table->string("child_makes_sounds")->nullable();
            $table->string("child_reacts_to_loud")->nullable();
            $table->string("child_watches_you")->nullable();
            $table->string("child_looks_at")->nullable();
            $table->string("child_holds_head_up")->nullable();
            $table->string("child_moves_both")->nullable();
            $table->string("child_opens_hands")->nullable();
            $table->string("my_postnatal_check")->nullable();
            $table->string("child_smiles_when")->nullable();
            $table->string("concerned_about")->nullable();
            $table->string("completed_family_health_history")->nullable();
            $table->string("concerned_about_my_baby")->nullable();
            $table->string("turn_towards_light")->nullable();
            $table->string("makes_eyes_contact")->nullable();
            $table->string("pupils_are_white")->nullable();
            $table->string("enjoy_being_together")->nullable();
            $table->string("baby_receieves_breast_milk")->nullable();
            $table->string("vitamin_or_mineral")->nullable();
            $table->string("plain_water")->nullable();
            $table->string("infant_formula")->nullable();
            $table->string("semi_sold_food")->nullable();
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
        Schema::dropIfExists('mhp_paediatric_parent_page4s');
    }
}
