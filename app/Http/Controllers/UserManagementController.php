<?php

namespace App\Http\Controllers;

use App\Actions\Fortify\CreateNewUser;
use App\Models\User;
use App\Constants\RoleNames;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserManagementController extends Controller
{
    public function store(Request $request, CreateNewUser $creator)
    {
        $creator->create($request->all());
        session()->flash("success", "Successfully created the user");
        return back();
    }

    public function index()
    {
        $users = User::withTrashed()->latest()->with("roles")->get();
        return Inertia::render("UserManagement", compact("users"));
    }

    public function destroy(User $user)
    {
        $user->delete();
        session()->flash("success", "Successfully removed the user");
        return back();
    }

    public function revert($userId)
    {
        $user = User::withTrashed()->findOrFail($userId);
        $user->restore();
        session()->flash("success", "Successfully restored the user");
        return back();
    }
}
