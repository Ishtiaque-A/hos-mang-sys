<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMhpGreatDocResonsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('mhp_great_doc_resons', function (Blueprint $table) {
            $table->id();
            $table->string("reson_for_name")->nullable();
            $table->string("code")->nullable();
            $table->string("reson_further_details")->nullable();
            $table->string("reson_name")->nullable();
            $table->integer("delete_status")->default(0);
            $table->string("patient_id")->nullable();
            $table->string("nurse_id")->nullable();
            $table->string("category_name")->nullable();
            $table->string("last_check_up_date")->nullable();
            $table->string("date")->nullable();
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
        Schema::dropIfExists('mhp_great_doc_resons');
    }
}
