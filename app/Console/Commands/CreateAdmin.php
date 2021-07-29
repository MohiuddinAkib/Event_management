<?php

namespace App\Console\Commands;

use App\Constants\RoleNames;
use App\Models\User;
use Illuminate\Console\Command;

class CreateAdmin extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'create:admin';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command to create dummy admin';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $admin = User::whereEmail("admin@example.com")->first();

        if (!$admin) {
            $user = User::create([
                "email" => "admin@example.com",
                "name" => "admin",
                "password" => bcrypt("12345678"),
            ]);

            $user->assignRole(RoleNames::ADMIN);

            $this->info("Admin created successfully");
        }
        return 0;
    }
}
