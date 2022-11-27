<?php

namespace App\Events;

use App\Mail\TaskCompletedMail;
use App\Models\Box;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcastNow;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Mail;

class BoxCreatedEvent implements ShouldBroadcastNow
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    /**
     * Create a new event instance.
     *
     * @return void
     */
    public function __construct($boxRows)
    {
        //double the number of boxes on each request
        for($i = 0; $i < $boxRows; $i++){
            $this->createBox();
        }
    }

    /**
     * returns a random color
     * @return string
     */
    public function getColor(){

        $colors = ["red", "yellow", "green", "blue", "pink", "grey"];

        $index = array_rand($colors);
        return $colors[$index];
    }

    /**
     * Creates a Model Box record in db
     * return: collection object
     */
    public function createBox(){

        $color = $this->getColor();

        //create the record in boxes table
        $box = new Box;
        $box->width = 100;
        $box->height = 40;
        $box->color = $color;
        $box->save();


        //fire a new event for sending email
        //when the task is finished
        $count = Box::count();
        try{
            if($count >= 16){
                //webdevelopers@hurak.co.uk
                Mail::to("waqasraza123@gmail.com")->send(new TaskCompletedMail());
            }
        }catch (Throwable $e) {
            report($e);

            return false;
        }

        return $box;
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return \Illuminate\Broadcasting\Channel|array
     */
    public function broadcastOn()
    {
        //broadcast data on public channel box.created
        //all the public data in this class will
        //automatically be pushed on the channel
        //in our case $box will be pushed to the channel
        return new Channel("box.created");
    }

    /**
     * Get the data to broadcast.
     *
     * @return array
     */
    public function broadcastWith()
    {
        $boxes = Box::all();
        return [
            "boxes" => $boxes
        ];
    }

}
