<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMhpUserRoleManagmentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('mhp_user_role_managments', function (Blueprint $table) {
            $table->id();
            $table->integer('role_id')->nullable();
            $table->integer('user_id')->nullable();
            $table->string('user_type')->nullable();
            $table->string('name')->nullable();
            $table->string('slug')->nullable();
            $table->integer('view')->default(0);
            $table->integer('add')->default(0);
            $table->integer('edit')->default(0);
            $table->integer('delete')->default(0);
            $table->integer('report')->default(0);
            $table->integer('for_all')->default(0);
            $table->integer('validity')->default(0);
            $table->string('validity_date')->nullable();
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
        Schema::dropIfExists('mhp_user_role_managments');
    }
}
