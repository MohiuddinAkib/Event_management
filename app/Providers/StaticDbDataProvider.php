<?php

namespace App\Providers;

use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\ServiceProvider;

class StaticDbDataProvider extends ServiceProvider
{
    /**
     * Register services.
     *
     * @return void
     */
    public function register()
    {

    }

    /**
     * Bootstrap services.
     *
     * @return void
     */
    public function boot()
    {
//        Artisan::call("db:seed", [
//            "--class" => "RolesAndPermission"
//        ]);
//
//        Artisan::call("create:admin");
    }
}
