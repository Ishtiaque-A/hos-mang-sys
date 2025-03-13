<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMhpDrugNamesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('mhp_drug_names', function (Blueprint $table) {
            $table->id();
            $table->string('src_primary_key')->nullable();
            $table->string('strength')->nullable();
            $table->string('macrohealth_sg')->nullable();
            $table->string('mims_sg')->nullable();
            $table->string('mims_type')->nullable();
            $table->string('guid')->nullable();
            $table->string('drug_name')->nullable();
            $table->string('drug_description')->nullable();
            $table->string('qty')->nullable();
            $table->string('rpts')->nullable();
            $table->string('restriction')->nullable();
            $table->string('bpp')->nullable();
            $table->string('tgp')->nullable();
            $table->string('generic_id')->nullable();
            $table->string('product_types')->nullable();
            $table->integer('is_favourite')->default(0);
            $table->integer('delete_status')->default(0);
            $table->string('created_by')->nullable();
            $table->string('updated_by')->nullable();
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
        Schema::dropIfExists('mhp_drug_names');
    }
}
