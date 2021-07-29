<?php

namespace Database\Seeders;

use App\Constants\RoleNames;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;

class RolesAndPermission extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        if (!Role::exists(RoleNames::ADMIN)) {
            Role::create(["name" => RoleNames::ADMIN]);
        }

        if (!Role::exists(RoleNames::EMPLOYEE)) {
            Role::create(["name" => RoleNames::EMPLOYEE]);
        }
    }
}
