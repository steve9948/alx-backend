import { createClient } from 'redis';

// Create a Redis client for publishing messages
const publisher = createClient();

/**
 * Event listener for successful connection to the Redis server.
 */
publisher.on('connect', function () {
    console.log('Redis client connected to the server');
});

/**
 * Event listener for errors when attempting to connect to the Redis server.
 * @param {Error} error - The error object containing the error message.
 */
publisher.on('error', function (error) {
    console.log(`Redis client not connected to the server: ${error.message}`);
});

/**
 * Publishes a message to the 'holberton school channel' after a specified delay.
 * @param {string} message - The message to be published.
 * @param {number} time - The time in milliseconds to wait before sending the message.
 */
function publishMessage(message, time) {
    setTimeout(function () {
        console.log(`About to send ${message}`);
        publisher.publish('holberton school channel', message);
    }, time);
}

// Publish messages with specific delays
publishMessage("Holberton Student #1 starts course", 100);
publishMessage("Holberton Student #2 starts course", 200);
publishMessage("KILL_SERVER", 300);
publishMessage("Holberton Student #3 starts course", 400);
