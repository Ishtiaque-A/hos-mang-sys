<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('notifications', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('title');
            $table->string('message');
            $table->tinyInteger('notify_type')->comment('1:push, 2: both')->default(2);
            $table->tinyInteger('origin_type')->comment('1:system, 2: order, 3:admin, 4:payment')->default(1);
            $table->tinyInteger('priority')->comment('1:high, 2: medium, 3:low')->default(1);
            $table->integer('screen_tag')->comment('related app screen identifier')->default(0);
            $table->timestamps();
            $table->softDeletes();
        });
    }
    public function down()
    {
        Schema::dropIfExists('notifications');
    }
};
