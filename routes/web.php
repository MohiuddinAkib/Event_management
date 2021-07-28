<?php

use App\Models\User;
use Inertia\Inertia;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/rooms-for-dropdown', [\App\Http\Controllers\ReservationRoomController::class, "dropdown_list"])->name("room.dropdown.list");

Route::get('/users-for-dropdown', function () {
    return User::latest()->get(["id", "name"])->map(function ($user) {
        return [
            "id" => $user->id,
            "text" => $user->name
        ];
    });
})->name("users.dropdown.list");

Route::get('/reservations/create', [\App\Http\Controllers\ReservationController::class, "create"])->middleware(['auth', 'verified'])->name("reservations.create");
Route::get('/reservations', [\App\Http\Controllers\ReservationController::class, "index"])->middleware(['auth', 'verified'])->name("reservations.index");
Route::post('/reservations', [\App\Http\Controllers\ReservationController::class, "store"])->middleware(['auth', 'verified'])->name("reservations.store");
Route::delete('/reservations/{reservation}', [\App\Http\Controllers\ReservationController::class, "destroy"])->middleware(['auth', 'verified'])->name("reservations.destroy");
Route::put('/reservations/{reservation}', [\App\Http\Controllers\ReservationController::class, "update"])->middleware(['auth', 'verified'])->name("reservations.update");

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

require __DIR__ . '/auth.php';
