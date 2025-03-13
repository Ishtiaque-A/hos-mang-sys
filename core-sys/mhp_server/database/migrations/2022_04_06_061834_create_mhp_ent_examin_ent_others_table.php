<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMhpEntExaminEntOthersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('mhp_ent_examin_ent_others', function (Blueprint $table) {
            $table->id();
            $table->string('patient_id')->nullValue();
            $table->string('mhp_ent_examin_id')->nullValue();
            $table->string('ent_others_id')->nullValue();
            $table->string('value')->nullValue();
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
        Schema::dropIfExists('mhp_ent_examin_ent_others');
    }
}
