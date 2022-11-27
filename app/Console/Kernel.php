<?php

namespace App\Console;

use App\Events\BoxCreatedEvent;
use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;
use App\Models\Box;

class Kernel extends ConsoleKernel
{

    /**
     * returns 0 initially when table is empty
     * returns number of rows in boxes table
     */
    protected function getNumberOfBoxes(){
        //get the number of boxes
        $count = Box::count();
        return ($count == 0 || $count == 1) ? 1 : $count;
    }

    /**
     * Define the application's command schedule.
     *
     * @param  \Illuminate\Console\Scheduling\Schedule  $schedule
     * @return void
     */
    protected function schedule(Schedule $schedule)
    {

        $numberOfBoxes = $this->getNumberOfBoxes();


        //dispatch the event to create a box every 2 minutes
        $schedule->call(function () use ($numberOfBoxes){
            BoxCreatedEvent::dispatch($numberOfBoxes);
        })
        ->everyMinute()
        ->skip(function() use ($numberOfBoxes) {
            return $numberOfBoxes >= 16;
        });
    }

    /**
     * Register the commands for the application.
     *
     * @return void
     */
    protected function commands()
    {
        $this->load(__DIR__.'/Commands');

        require base_path('routes/console.php');
    }
}
