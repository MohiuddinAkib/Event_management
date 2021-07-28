<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateReservationsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('reservations', function (Blueprint $table) {
            $table->id();
            $table->string("title")->nullable()->comment("Title of the booking");
            $table->string("department")->comment("Department of the booking");
            $table->foreignId("user_id")->constrained()->comment("The use who booked this reservation");
            $table->integer("number_of_people")->comment("The amount of people to join this reservation");
            $table->timestamp("start_date")->comment("Booking start date time");
            $table->timestamp("end_date")->comment("Booking end date time");
            $table->mediumText("notes")->comment("Description about the reservation");
            $table->enum("status", [\App\Constants\ReservationStatus::APPROVED, \App\Constants\ReservationStatus::PENDING, \App\Constants\ReservationStatus::REJECTED])->default(\App\Constants\ReservationStatus::PENDING)->comment("Indication for booking was approved or not by the admin");
            $table->string("r_rule")->nullable()->comment("Recurrence rule");
            $table->boolean("all_day")->default(0)->comment("Will the booking take all day");
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
        Schema::dropIfExists('reservations');
    }
}
