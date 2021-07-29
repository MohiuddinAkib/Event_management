<?php

namespace App\Http\Controllers;

use App\Constants\ReservationStatus;
use Carbon\Carbon;
use Inertia\Inertia;
use App\Constants\RoleNames;
use App\Models\Reservation;
use Illuminate\Http\Request;

class ReservationController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $reservations = Reservation::latest()->with(["user", "room"])->get()->map(function ($reservation) {
            return [
                "id" => $reservation->id,
                "title" => $reservation->title,
                "user" => $reservation->user,
                "numberOfPeople" => $reservation->number_of_people,
                "startDate" => $reservation->start_date->format('Y/m/d H:i:s'),
                "endDate" => $reservation->end_date->format('Y/m/d H:i:s'),
                "notes" => $reservation->notes,
                "rRule" => $reservation->r_rule,
                "allDay" => $reservation->all_day,
                "status" => $reservation->status,
                "room" => $reservation->room,
                "department" => $reservation->department,
            ];
        });

        $isAdmin = auth()->user()->hasRole(RoleNames::ADMIN);

        return Inertia::render('RoomBooking', compact("reservations", "isAdmin"));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $reservations = Reservation::latest()->get()->map(function ($reservation) {
            return [
                "id" => $reservation->id,
                "title" => $reservation->title,
                "userId" => $reservation->user_id,
                "numberOfPeople" => $reservation->number_of_people,
                "startDate" => $reservation->start_date->format('Y/m/d H:i:s'),
                "endDate" => $reservation->end_date->format('Y/m/d H:i:s'),
                "notes" => $reservation->notes,
                "rRule" => $reservation->r_rule,
                "allDay" => $reservation->all_day,
                "status" => $reservation->status,
                "roomId" => $reservation->reservation_room_id,
                "department" => $reservation->department,
            ];
        });
        $isAdmin = auth()->user()->hasRole(RoleNames::ADMIN);

        return Inertia::render('MeetingCalendar', compact("reservations", "isAdmin"));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            "title" => ["string", "nullable"],
            "user_id" => ["required", "exists:App\Models\User,id"],
            "number_of_people" => ["numeric", "required", "min:1"],
            "start_date" => ["date", "required", "date_format:Y-m-d H:i:s"],
            "end_date" => ["date", "required", "date_format:Y-m-d H:i:s"],
            "notes" => ["string", "required"],
            "r_rule" => ["string", "nullable"],
            "all_day" => ["boolean", "nullable"],
            "department" => ["string", "required"],
            "reservation_room_id" => ["required", "exists:App\Models\ReservationRoom,id"],
        ]);

        $reservation = Reservation::where("reservation_room_id", $validated["reservation_room_id"])
            ->whereDate("start_date", Carbon::createFromFormat('Y-m-d H:i:s', $validated["start_date"]))
            ->whereDate("end_date", Carbon::createFromFormat('Y-m-d H:i:s', $validated["end_date"]))
            ->first();

        if ($reservation) {
            session()->flash("error", "Reservation already booked");
            return redirect(route("reservations.create"));
        }

        Reservation::create($validated);

        session()->flash("success", "The event reservation was successful");
        return back();
    }

    /**
     * Display the specified resource.
     *
     * @param \App\Models\Reservation $reservation
     * @return \Illuminate\Http\Response
     */
    public function show(Reservation $reservation)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param \App\Models\Reservation $reservation
     * @return \Illuminate\Http\Response
     */
    public function edit(Reservation $reservation)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param \App\Models\Reservation $reservation
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Reservation $reservation)
    {
        if (!auth()->user()->hasRole(RoleNames::ADMIN) && auth()->id() !== $reservation->user_id) {
            session()->flash("error", "You are not allowed to update this reservation");
            return redirect(route("reservations.create"));
        }

        $validated = $request->validate([
            "title" => ["string", "nullable"],
            "user_id" => ["required", "exists:App\Models\User,id"],
            "number_of_people" => ["numeric", "required", "min:1"],
            "start_date" => ["date", "required", "date_format:Y-m-d H:i:s"],
            "end_date" => ["date", "required", "date_format:Y-m-d H:i:s"],
            "notes" => ["string", "required"],
            "r_rule" => ["string", "nullable"],
            "all_day" => ["boolean", "nullable"],
            "department" => ["string", "required"],
            "reservation_room_id" => ["required", "exists:App\Models\ReservationRoom,id"],
        ]);

        $reservation->update($validated);

        session()->flash("success", "Successfully updated the reservation");
        return back();
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param \App\Models\Reservation $reservation
     * @return \Illuminate\Http\Response
     */
    public function destroy(Reservation $reservation)
    {
        if (!auth()->user()->hasRole(RoleNames::ADMIN) && auth()->id() !== $reservation->user_id) {
            session()->flash("error", "You are not allowed to delete this reservation");
            return back();
        }

        $reservation->delete();
        session()->flash("success", "Successfully deleted the reservation");
        return back();
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param \App\Models\Reservation $reservation
     * @return \Illuminate\Http\Response
     */
    public function approve(Reservation $reservation)
    {
        if (!auth()->user()->hasRole(RoleNames::ADMIN)) {
            session()->flash("error", "You are not allowed to do the action");
            return back();
        }

        $reservation->update([
            "status" => ReservationStatus::APPROVED
        ]);
        session()->flash("success", "Successfully approved the reservation");
        return back();
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param \App\Models\Reservation $reservation
     * @return \Illuminate\Http\Response
     */
    public function reject(Reservation $reservation)
    {
        if (!auth()->user()->hasRole(RoleNames::ADMIN)) {
            session()->flash("error", "You are not allowed to do the action");
            return back();
        }

        $reservation->update([
            "status" => ReservationStatus::REJECTED
        ]);
        session()->flash("success", "Successfully rejected the reservation");
        return back();
    }
}
