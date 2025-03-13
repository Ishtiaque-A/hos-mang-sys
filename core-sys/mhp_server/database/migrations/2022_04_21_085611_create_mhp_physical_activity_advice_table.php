<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMhpPhysicalActivityAdviceTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('mhp_physical_activity_advice', function (Blueprint $table) {
            $table->id();
            $table->string('patient_id')->nullable();
            $table->string('doctor_id')->nullable();
            $table->longText('image')->nullable();
            $table->string('current__excercise__level__value')->nullable();
            $table->string('balance__training__ternary')->nullable();
            $table->string('flexibility__exercise__ternary')->nullable();
            $table->string('moderate__intensity__exercise__ternary')->nullable();
            $table->string('frequency__value')->nullable();
            $table->string('previews__date')->nullable();
            $table->text('aerobic_exercise')->nullable();
            $table->text('strength_building')->nullable();
            $table->text('endurance')->nullable();
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
        Schema::dropIfExists('mhp_physical_activity_advice');
    }
}
