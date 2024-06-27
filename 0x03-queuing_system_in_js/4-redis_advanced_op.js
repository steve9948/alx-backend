// Import necessary functions from the 'redis' library
import { createClient, print } from 'redis';

// Create a Redis client instance
const redisClient = createClient();

// Event listener for successful connection to the Redis server
redisClient.on('connect', function() {
  console.log('Redis client connected to the server');
});

// Event listener for connection errors
redisClient.on('error', function(error) {
  console.log(`Redis client not connected to the server: ${error}`);
});

/**
 * Set multiple key-value pairs in a Redis hash named 'HolbertonSchools'
 * Each 'hset' sets a field in the hash to a specified value
 */
redisClient.hset('HolbertonSchools', 'Portland', '50', print);
redisClient.hset('HolbertonSchools', 'Seattle', '80', print);
redisClient.hset('HolbertonSchools', 'New York', '20', print);
redisClient.hset('HolbertonSchools', 'Bogota', '20', print);
redisClient.hset('HolbertonSchools', 'Cali', '40', print);
redisClient.hset('HolbertonSchools', 'Paris', '2', print);

/**
 * Retrieve all key-value pairs stored in the 'HolbertonSchools' hash
 * The 'hgetall' method retrieves all fields and values of the hash
 */
redisClient.hgetall('HolbertonSchools', function(error, result) {
  if (error) {
    console.log(error);
    throw error;
  }
  // Log the result to the console
  console.log(result);
});
