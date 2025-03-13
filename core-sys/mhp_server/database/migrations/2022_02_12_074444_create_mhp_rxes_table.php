<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMhpRxesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('mhp_rxes', function (Blueprint $table) {
            $table->id();
            $table->string('patient_id')->nullable();
            $table->string('drug_id')->nullable();
            $table->string('drug_name')->nullable();
            $table->string('brand_name')->nullable();
            $table->string('guid')->nullable();
            $table->string('drug_generic_name')->nullable();
            $table->string('dose')->nullable();
            $table->string('frequency')->nullable();
            $table->string('food')->nullable();
            $table->string('others')->nullable();
            $table->string('route')->nullable();

            $table->string('tabs_inistraction')->nullable();
            $table->string('Complex_instruction')->nullable();
            $table->string('extra_instruction')->nullable();
            $table->string('drugsTimeLimit')->nullable();

            $table->string('prescribedAs')->nullable();
            $table->string('general_note')->nullable();
            $table->string('pbs_listing')->nullable();
            $table->string('quantity')->nullable();

            $table->string('repeats')->nullable();
            $table->string('condition')->nullable();
            $table->string('further_details')->nullable();

            $table->boolean('iSAllergyCheck')->default(false);
            $table->boolean('is_FVDose')->default(false);
            $table->boolean('is_Regulation')->default(false);
            $table->boolean('is_print_brand_name')->default(false);
            $table->boolean('is_print_generic_name')->default(false);
            $table->boolean('is_urgent_supply')->default(false);
            $table->boolean('is_allow_brand_substitution')->default(false);
            $table->boolean('is_save_dose')->default(false);
            $table->boolean('is_condition_status_right')->default(false);
            $table->boolean('is_condition_status_left')->default(false);

            $table->boolean('is_condition_status_bilateral')->default(false);
            $table->boolean('is_condition_status_acute')->default(false);
            $table->boolean('is_condition_status_chronic')->default(false);
            $table->boolean('is_condition_status_mild')->default(false);
            $table->boolean('is_condition_status_moderate')->default(false);
            $table->boolean('is_condition_status_severe')->default(false);

            $table->boolean('is_add_to_past_history')->default(false);
            $table->boolean('is_add_to_reason_for_visit')->default(false);
            $table->boolean('is_mark_as_confidential')->default(false);
            
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
        Schema::dropIfExists('mhp_rxes');
    }
}
