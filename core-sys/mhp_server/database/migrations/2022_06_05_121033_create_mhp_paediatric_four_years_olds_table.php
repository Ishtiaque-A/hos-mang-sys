<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMhpPaediatricFourYearsOldsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('mhp_paediatric_four_years_olds', function (Blueprint $table) {
            $table->id();
               $table->string('patient_id')->nullable();
            $table->string('child_enjoys_doing')->nullable();
            $table->string('child_ask_to_go_play')->nullable();
            $table->string('child_pretends_to_be_something')->nullable();
            $table->string('child_comforts_others')->nullable();
            $table->string('child_avoids_danger')->nullable();
            $table->string('child_likes_to_be_a_helper')->nullable();
            $table->string('child_change_behaviour')->nullable();
            $table->string('child_say_sentences')->nullable();
            $table->string('child_say_some_words')->nullable();
            $table->string('child_starts_to_understand')->nullable();
            $table->string('child_answers_simple_questions')->nullable();
            $table->string('child_remember_what_comes_next')->nullable();
            $table->string('child_names_some_colours')->nullable();
            $table->string('child_understand_the_idea')->nullable();
            $table->string('child_understands_the_idea')->nullable();
            $table->string('child_draws_a_person')->nullable();
            $table->string('child_talks_about_at_least_one')->nullable();
            $table->string('child_use_scissor')->nullable();
            $table->string('child_starts_to_copy')->nullable();
            $table->string('child_plays_board')->nullable();
            $table->string('one_foot_up_to')->nullable();
            $table->string('catch_a_large_ball')->nullable();
            $table->string('cuts_with_supervision')->nullable();
            $table->string('child_walks_up_and_down_stairs')->nullable();
            $table->string('child_cannot_jump')->nullable();
            $table->string('child_holds_crayon')->nullable();
            $table->string('child_show_no_interest')->nullable();
            $table->string('child_ignore_other_children')->nullable();
            $table->string('child_resists_dressing')->nullable();
            $table->string('child_follow_three_parts')->nullable();
            $table->string('child_doesnot_understand')->nullable();
            $table->string('child_use_me')->nullable();
            $table->string('child_speak_unclearly')->nullable();
            $table->string('child_loses_skills')->nullable();
            $table->string('health_risk_factor_question')->nullable();
            $table->string('dental_risk_factor_question')->nullable();
            $table->string('my_childs_hearing')->nullable();
            $table->string('your_childs_hearing')->nullable();
            $table->string('my_childs_vision')->nullable();
            $table->string('child_has_a_turned')->nullable();
            $table->string('difficulty_seeing_small_objects')->nullable();
            $table->string('recognises_familiar_objects')->nullable();
            $table->string('exposed_to_smoking')->nullable();
            $table->string('concerned_about_my_childs_teeth')->nullable();
            $table->string('child_has_pain')->nullable();
            $table->string('child_has_swwet_drinks')->nullable();
       

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
        Schema::dropIfExists('mhp_paediatric_four_years_olds');
    }
}
