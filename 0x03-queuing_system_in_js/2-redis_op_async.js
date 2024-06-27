// Import necessary functions from the 'redis' library and 'util' module
import { createClient, print } from 'redis';
import { promisify } from 'util';

// Create a Redis client instance
const client = createClient();

// Event listener for successful connection to the Redis server
client.on('connect', function() {
  console.log('Redis client connected to the server');
  // Execute Redis commands after successful connection
  executeRedisCommands();
});

// Event listener for connection errors
client.on('error', function (err) {
  console.log(`Redis client not connected to the server: ${err}`);
});

/**
 * Function to set a new key-value pair in the Redis store
 * @param {string} schoolName - The key to set in the Redis store
 * @param {string} value - The value to associate with the key
 */
function setNewSchool(schoolName, value) {
  client.set(schoolName, value, print);
}

// Promisify the 'client.get' method for use with async/await
const get = promisify(client.get).bind(client);

/**
 * Asynchronous function getting and displaying value associated
 * with a given key from the Redis store
 * @param {string} schoolName - The key to retrieve from the Redis store
 */
async function displaySchoolValue(schoolName) {
  try {
    // Await the result of the 'get' operation
    const result = await get(schoolName);
    // Log the result to the console
    console.log(`${schoolName}: ${result}`);
  } catch (error) {
    // Log any errors encountered during the 'get' operation
    console.log(`Error getting value for ${schoolName}: ${error}`);
    throw error;
  }
