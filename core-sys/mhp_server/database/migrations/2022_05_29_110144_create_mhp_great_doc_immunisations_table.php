<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMhpGreatDocImmunisationsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('mhp_great_doc_immunisations', function (Blueprint $table) {
            $table->id();
            $table->string('patient_id')->nullable();
            $table->string('billing_provider_id')->nullable();
            $table->string('include_inactive_providers')->nullable()->comment('1=true,0=false');
            $table->string('given_by_id')->nullable();
            $table->string('seq')->nullable();
            $table->string('date')->nullable();
            $table->string('batch_no')->nullable();
            $table->string('site_id')->nullable();
            $table->string('route_id')->nullable();
            $table->string('batch_expiry_date')->nullable();
            $table->string('save_batch_details')->nullable()->comment('1=true,0=false');
            $table->string('serial_no')->nullable();
            $table->string('comment')->nullable();
            $table->string('send_remainder')->nullable()->comment('1=true,0=false');
            $table->string('remainder_date')->nullable();
            $table->string('vaccine_against_id')->nullable();
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
        Schema::dropIfExists('mhp_great_doc_immunisations');
    }
}
