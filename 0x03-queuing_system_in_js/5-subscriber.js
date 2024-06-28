import { createClient } from 'redis';

// Create a Redis client
const redisClient = createClient();

/**
 * Event listener for successful connection to the Redis server.
 */
redisClient.on('connect', function () {
    console.log('Redis client connected to the server');
});

/**
 * Event listener for errors when attempting to connect to the Redis server.
 * @param {Error} error - The error object containing the error message.
 */
redisClient.on('error', function (error) {
    console.log(`Redis client not connected to the server: ${error.message}`);
});

/**
 * Subscribe to the 'holberton school channel'.
 */
redisClient.subscribe('holberton school channel');

/**
 * Event listener for receiving messages on subscribed channels.
 * @param {string} channel - The name of the channel the message was received on.
 * @param {string} message - The message received from the channel.
 */
redisClient.on('message', function (channel, message) {
    console.log(`${message}`);

    // Check if the received message is 'KILL_SERVER'
    if (message === 'KILL_SERVER') {
        // Unsubscribe from the 'holberton school channel'
        redisClient.unsubscribe('holberton school channel');

        // End the connection to the Redis server
        redisClient.end(true);
    }
});
