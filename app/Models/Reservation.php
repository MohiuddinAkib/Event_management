<?php

namespace App\Models;

use Carbon\Carbon;
use App\Constants\ReservationStatus;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Reservation extends Model
{
    use HasFactory;

    protected $guarded = [

    ];

    protected $casts = [
        "start_date" => "date",
        "end_date" => "date",
        "all_day" => "boolean",
    ];

    public function setStartDateAttribute($date)
    {
        $this->attributes["start_date"] = Carbon::parse($date);
    }

    public function setEndDateAttribute($date)
    {
        $this->attributes["end_date"] = Carbon::parse($date);
    }

    public function scopeApproved(Builder $query)
    {
        return $query->where('status', ReservationStatus::APPROVED);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}