<?php

namespace App\Http\Controllers;

use App\Constants\RoleNames;
use Inertia\Inertia;
use App\Models\Reservation;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class ReservationController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Inertia::render('RoomBooking');
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
                "startDate" => $reservation->start_date,
                "endDate" => $reservation->end_date,
                "notes" => $reservation->notes,
                "rRule" => $reservation->r_rule,
                "allDay" => $reservation->all_day,
                "status" => $reservation->status,
                "roomId" => $reservation->reservation_room_id,
                "department" => $reservation->department,
            ];
        });
        return Inertia::render('MeetingCalendar', compact("reservations"));
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
            "start_date" => ["date", "required"],
            "end_date" => ["date", "required", "after_or_equal:starts_date"],
            "notes" => ["string", "required"],
            "r_rule" => ["string", "nullable"],
            "all_day" => ["boolean", "nullable"],
            "department" => ["string", "required"],
            "reservation_room_id" => ["required", "exists:App\Models\ReservationRoom,id"],
        ]);

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
            return back()->status(Response::HTTP_FORBIDDEN);
        }

        $validated = $request->validate([
            "title" => ["string", "nullable"],
            "user_id" => ["required", "exists:App\Models\User,id"],
            "number_of_people" => ["numeric", "required", "min:1"],
            "start_date" => ["date", "required"],
            "end_date" => ["date", "required", "after_or_equal:starts_date"],
            "notes" => ["string", "required"],
            "r_rule" => ["string", "nullable"],
            "all_day" => ["boolean", "nullable"],
            "department" => ["string", "required"],
            "reservation_room_id" => ["required", "exists:App\Models\ReservationRoom,id"],
        ]);

        $reservation = Reservation::where("reservation_room_id", $validated["reservation_room_id"])
            ->whereDate("start_date", $validated["start_date"])
            ->whereDate("end_date", $validated["end_date"])
            ->first();

        if ($reservation) {
            session()->flash("error", "Reservation already booked");
            return back();
        }

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
            return back()->status(Response::HTTP_FORBIDDEN);
        }

        $reservation->delete();
        session()->flash("success", "Successfully deleted the reservation");
        return back();
    }
}
