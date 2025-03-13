<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateRoundProtocolCycleDetailsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('round_protocol_cycle_details', function (Blueprint $table) {
            $table->id();
            $table->string("protocol_cycle_id");
            $table->string("protocol_id");
            $table->string("drug_name")->nullable();
            $table->string("day")->nullable();
            $table->string("dose")->nullable();
            $table->text("instruction")->nullable();
            $table->text("trigger_dose_change")->nullable();
            $table->integer("drug_id")->nullable();
            $table->string("type")->nullable();
            $table->integer("route_id");
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
        Schema::dropIfExists('round_protocol_cycle_details');
    }
}
