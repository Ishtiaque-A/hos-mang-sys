<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMhpPaediatricMilestonesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('mhp_paediatric_milestones', function (Blueprint $table) {
            $table->id();
            $table->string('patient_id')->nullable();
            $table->string('smileParents')->nullable();
            $table->string('followsObjects')->nullable();
            $table->string('raisesHead')->nullable();
            $table->string('turnsEyes')->nullable();
            $table->string('chucklesSqueals')->nullable();
            $table->string('startsMake')->nullable();
            $table->string('holdsHead')->nullable();
            $table->string('holdsCup')->nullable();
            $table->string('rollsOver')->nullable();
            $table->string('rollsOverTum')->nullable();
            $table->string('putThings')->nullable();
            $table->string('playsWith')->nullable();
            $table->string('sitsWithout')->nullable();
            $table->string('reachesOut')->nullable();
            $table->string('recognisesOwn')->nullable();
            $table->string('passesThings')->nullable();
            $table->string('strangers')->nullable();
            $table->string('firstTooth')->nullable();
            $table->string('wavesGoodBye')->nullable();
            $table->string('usesThumb')->nullable();
            $table->string('triesPull')->nullable();
            $table->string('standsHolding')->nullable();
            $table->string('clapsHand')->nullable();
            $table->string('handHeld')->nullable();
            $table->string('understandsSelfie')->nullable();
            $table->string('appropriately')->nullable();
            $table->string('firstWord')->nullable();
            $table->string('walksAlone')->nullable();
            $table->string('feedSelf')->nullable();
            $table->string('putsTwo')->nullable();
            $table->string('runs')->nullable();
            $table->string('shortSentences')->nullable();
            $table->string('usuallyDry')->nullable();
            $table->string('drawStraight')->nullable();
            $table->string('dressesself')->nullable();
            $table->string('throughTheNight')->nullable();
            $table->string('manageButtons')->nullable();
            $table->string('tiesShoes')->nullable();

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
        Schema::dropIfExists('mhp_paediatric_milestones');
    }
}
