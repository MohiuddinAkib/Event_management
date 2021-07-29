<?php

namespace App\Http\Controllers;

use App\Models\ReservationRoom;
use Illuminate\Http\Request;

class ReservationRoomController extends Controller
{

    public function dropdown_list()
    {
        $rooms = ReservationRoom::latest()->get();

        return response()->json([
            [
                "fieldName" => "roomId",
                "title" => "Room",
                "instances" => $rooms
            ]
        ]);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
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
            "text" => ["required", "string"],
            "color" => ["required", "string"],
        ]);

        ReservationRoom::create($validated);
        session()->flash("success", "Room creation was successful");
        return back();
    }

    /**
     * Display the specified resource.
     *
     * @param \App\Models\ReservationRoom $reservationRoom
     * @return \Illuminate\Http\Response
     */
    public function show(ReservationRoom $reservationRoom)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param \App\Models\ReservationRoom $reservationRoom
     * @return \Illuminate\Http\Response
     */
    public function edit(ReservationRoom $reservationRoom)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param \App\Models\ReservationRoom $reservationRoom
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, ReservationRoom $reservationRoom)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param \App\Models\ReservationRoom $reservationRoom
     * @return \Illuminate\Http\Response
     */
    public function destroy(ReservationRoom $reservationRoom)
    {
        //
    }
}
