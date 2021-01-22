console.log("test");

// require the library
var amqp = require('./node_modules/amqplib/callback_api');

// create a Channel, which is where most of the API for getting things done resides.

amqp.connect('amqp://guest:guest@localhost:5672', function(error0, connection){
    if(error0){
        throw error0;
    }
    // To send, we must declare a queue for us to send to: then we can publish a message to the queue:
    connection.createChannel(function(error1, channel){
        if(error1){
            throw error1;
        }
        
        var queue = 'hey';
        var msg = 'Hello World!';

        channel.assertQueue(queue, {
            durable: true
        });

        channel.sendToQueue(queue, Buffer.from(msg));
        console.log(" [x] Sent %s", msg);
    });
    
    setTimeout(function() {
        connection.close();
        process.exit(0);
    }, 1000);
    
});
