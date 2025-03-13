<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMhpProcedureFeesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('mhp_procedure_fees', function (Blueprint $table) {
            $table->id();
             $table->string('procedure_id')->nullable();
            $table->string('subProcedure_name')->nullable();
            $table->integer('fee_name')->nullable();
            $table->string('item_code')->nullable();
            $table->integer('delete_status')->default(0);
            $table->longText('description')->nullable();
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
        Schema::dropIfExists('mhp_procedure_fees');
    }
}
