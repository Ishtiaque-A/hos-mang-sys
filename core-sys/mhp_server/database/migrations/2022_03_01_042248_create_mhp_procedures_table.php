<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMhpProceduresTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('mhp_procedures', function (Blueprint $table) {
            $table->id();
            $table->string('procedure_name')->nullable();
            $table->string('accounts_id')->nullable();
            $table->string('accounts_type_id')->nullable();
            $table->string('accounts_group_id')->nullable();
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
        Schema::dropIfExists('mhp_procedures');
    }
}
