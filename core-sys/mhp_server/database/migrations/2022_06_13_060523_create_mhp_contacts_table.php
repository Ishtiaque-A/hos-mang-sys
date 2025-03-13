<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMhpContactsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('mhp_contacts', function (Blueprint $table) {
            $table->id();
            $table->string("contact_name")->nullable();
            $table->string("category")->nullable();
            $table->string("department")->nullable();
            $table->string("address")->nullable();
            $table->string("phone")->nullable();
            $table->string("fax")->nullable();
            $table->string("comment")->nullable();
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
        Schema::dropIfExists('mhp_contacts');
    }
}
