<?php

namespace Database\Seeders;

use App\Constants\RoleNames;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;

class RolesAndPermission extends Seeder
{
    /**
     * Run the databRase seeds.
     *
     * @return void
     */
    public function run()
    {
        Role::create(["name" => RoleNames::ADMIN]);
        Role::create(["name" => RoleNames::EMPLOYEE]);
    }
}
