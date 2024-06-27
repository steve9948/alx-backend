// Import necessary functions from the 'redis' library and 'util' module
import { createClient, print } from 'redis';
import { promisify } from 'util';

// Create a Redis client instance
const client = createClient();

// Event listener for successful connection to the Redis server
client.on('connect', function() {
  console.log('Redis client connected to the server');
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
 * Asynchronous function to get and display the value associated with a given key from the Redis store
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
}

// Execute Redis commands in sequence
async function executeRedisCommands() {
  // Display value for 'Holberton' before setting a new value
  await displaySchoolValue('Holberton');
  // Set new value for 'HolbertonSanFrancisco'
  setNewSchool('HolbertonSanFrancisco', '100');
  // Display value for 'HolbertonSanFrancisco' after setting the new value
  await displaySchoolValue('HolbertonSanFrancisco');
}

// Ensure commands are run only after a successful connection
client.on('connect', executeRedisCommands);
