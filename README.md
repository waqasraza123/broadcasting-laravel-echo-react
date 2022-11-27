# Use Case #1
A scheduler runs every 2 minutes to schedule and event to create enteries in the database table "boxes", once the entry is created in the db, that data is broadcasted to the frontend. On the frontend I am using Laravel Echo and Inertiajs to connect React with Laravel backend. Once the data reaches the frontend via Laravel Echo, I insert a box on the UI with the data coming from boxes table. Every time the scheduler runs, the boxes double until 16 and then the scheduler stops and sends the email to the user about task completion.

# Technical Details
- `php composer.phar require inertiajs/inertia-laravel
  `
- `composer require laravel/breeze`
- `php artisan breeze:install react`
- `npm install`
- `npm run dev`
- `composer require tightenco/ziggy`
- `composer require pusher/pusher-php-server`

- create a migration for boxes table ` php artisan make:migration create_boxes_table
  `
- when using mamp define the DB_SOCKET in .env  
 `DB_SOCKET=/Applications/MAMP/tmp/mysql/mysql.sock`
- `composer require symfony/mailgun-mailer symfony/http-client`
- `composer require guzzlehttp/guzzle`

connect to the socket channel on frontend  
broadcast an event every 2 minutes to the frontend channel  
an event is => create a box every 2 minutes

# implementation notes:  
- schedule an event for creating a database record  
with width, height, color(random)
- this event will be broadcasted on a public channel  
to the client
- client will receive the data(width, height, color, numberOfBoxes)  
and creates the box/boxes
- Our Event is = create record in the boxes table
- double the amount of inserted records every time
- stop the scheduler when records are 16
- Now create a `BoxCreatedEvent` and its Listener 
- using ShouldBroadcastNow instead of ShouldBroadcast to send the scheduled event  
to default queue/no delays/gets processed instantly/at priority.

# Mail
Emails are only being sent via gmail smtp servers.
Mailgun is not working. (Its a drivers issue).

# Use Case #2
SortBoxes will sort the boxes color-wise
red  
red  
red  
blue  
blue  
.  
.  
.  
ShuffleBoxes will randomize the above.
