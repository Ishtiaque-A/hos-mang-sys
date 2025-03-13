<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateGreatLabPointRedeemsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('great_lab_point_redeems', function (Blueprint $table) {
            $table->id();
            $table->integer('redeem_no');
            $table->integer('user_id');
            $table->double('total_point')->default(0);
            $table->double('current_month_point')->default(0);
            $table->double('due_point')->default(0);
            $table->double('redeem_amount')->default(0);
            $table->double('previous_due')->default(0);
            $table->string('billing_month')->nullable();
            $table->string('redeem_by')->nullable();
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
        Schema::dropIfExists('great_lab_point_redeems');
    }
}
