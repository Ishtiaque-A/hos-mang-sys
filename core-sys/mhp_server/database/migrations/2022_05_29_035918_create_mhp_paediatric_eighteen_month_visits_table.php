<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMhpPaediatricEighteenMonthVisitsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('mhp_paediatric_eighteen_month_visits', function (Blueprint $table) {
            $table->id();
             $table->string('patient_id')->nullable();
            $table->string('moves_away')->nullable();
            $table->string('points_to_show_something')->nullable();
            $table->string('puts_hands_out')->nullable();
            $table->string('looks_at_a_few')->nullable();
            $table->string('dress_him_by_pushing')->nullable();
            $table->string('child_likes_to_hand')->nullable();
            $table->string('temper_tantrums')->nullable();
            $table->string('afraid_of_strangers')->nullable();
            $table->string('shows_affection')->nullable();
            $table->string('plays_simple_pretend')->nullable();
            $table->string('cling_to_caregivers')->nullable();
            $table->string('several_single_words')->nullable();
            $table->string('shakes_head')->nullable();
            $table->string('one_step_directions')->nullable();
            $table->string('child_copies_you')->nullable();
            $table->string('plays_with_toys')->nullable();
            $table->string('what_ordinary_things')->nullable();
            $table->string('points_to_get_the_attention')->nullable();
            $table->string('child_shows_interest_in_a_doll')->nullable();
            $table->string('points_to_one_body_part')->nullable();
            $table->string('verbal_commands_without')->nullable();
            $table->string('child_walks_alone')->nullable();
            $table->string('child_climbs_on')->nullable();
            $table->string('child_pulls_toys')->nullable();
            $table->string('help_undress')->nullable();
            $table->string('child_drins_from_a_cup')->nullable();
            $table->string('child_scribbles')->nullable();
            $table->string('child_lost_skills')->nullable();
            $table->string('family_health_history')->nullable();
            $table->string('dental_risk_factor')->nullable();
            $table->string('childs_hearing')->nullable();
            $table->string('concerned_about_my_childs_hearing')->nullable();
            $table->string('my_childs_vision')->nullable();
            $table->string('turned_or_lazy_eye')->nullable();
            $table->string('difficulty_seeing_small_objects')->nullable();
            $table->string('exposed_to_smoking')->nullable();
            $table->string('child_recognises_familiar_objects')->nullable();
            $table->string('child_has_sweet_drinks')->nullable();
            $table->string('uses_a_bottle')->nullable();
            $table->string('breast_milk')->nullable();
            $table->string('points_to_show')->nullable();
            $table->string('eats_with_a_spoon')->nullable();
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
        Schema::dropIfExists('mhp_paediatric_eighteen_month_visits');
    }
}
