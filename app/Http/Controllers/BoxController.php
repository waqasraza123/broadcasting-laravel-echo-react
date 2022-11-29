<?php

namespace App\Http\Controllers;

use App\Models\Box;
use Illuminate\Http\Request;

class BoxController extends Controller
{
    /**
     * @return void
     */
    public function index(){
        $boxes = Box::all();

        return response()->json($boxes);
    }
}
