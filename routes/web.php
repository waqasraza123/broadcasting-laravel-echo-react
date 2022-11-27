<?php

use App\Events\BoxCreatedEvent;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Support\Facades\Mail;

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

Route::get('test', function (){

//    Mail::to("waqasraza123@gmail.com")
//        ->send(new \App\Mail\TaskCompletedMail());
//
//    dd("here");

    $rows = \App\Models\Box::count();

    $rows = ($rows == 0 || $rows == 1) ? 1 : $rows;

    BoxCreatedEvent::dispatch($rows);
});

Route::get('/', function (){
    return Inertia::render("BoxComponent");
});
