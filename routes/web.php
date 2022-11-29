<?php

use App\Events\BoxCreatedEvent;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Support\Facades\Mail;
use App\Http\Controllers\BoxController;

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

    $rows = \App\Models\Box::count();

    $rows = ($rows == 0 || $rows == 1) ? 1 : $rows;

    BoxCreatedEvent::dispatch($rows);
});

Route::get('test/email', function (){
    Mail::to(env("MAIL_TO_ADDRESS"))->queue(new \App\Mail\TaskCompletedMail());
});

Route::get('/', function (){
    return Inertia::render("BoxComponent");
});
Route::get('/boxes', [BoxController::class, "index"]);
