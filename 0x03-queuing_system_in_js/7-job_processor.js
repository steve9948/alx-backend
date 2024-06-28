import { createQueue } from 'kue';

// List of blacklisted phone numbers
const blacklist = ['4153518780', '4153518781'];

// Create a Kue queue instance
const queue = createQueue();

/**
 * Sends a notification to a specified phone number with a given message.
 * Checks if the phone number is blacklisted before sending.
 * @param {string} phoneNumber - The phone number to send the notification to.
 * @param {string} message - The message to send in the notification.
 * @param {Object} job - The job object containing data for the job.
 * @param {Function} done - The callback function to indicate job completion.
 */
function sendNotification(phoneNumber, message, job, done) {
  // Set job progress to 0%
  job.progress(0, 100);

  // Check if phone number is blacklisted
  if (blacklist.includes(phoneNumber)) {
    done(Error(`Phone number ${phoneNumber} is blacklisted`));
    return;
  }

  // Set job progress to 50%
  job.progress(50, 100);
  
  // Log sending notification
  console.log(`Sending notification to ${phoneNumber}, with message: ${message}`);
  
  // Indicate job completion
  done();
}

/**
 * Processes jobs in the 'push_notification_code_2' queue.
 * Limits the number of concurrent jobs being processed to 2.
 * @param {Object} job - The job object containing data for the job.
 * @param {Function} done - The callback function to indicate job completion.
 */
queue.process('push_notification_code_2', 2, function(job, done) {
  sendNotification(job.data.phoneNumber, job.data.message, job, done);
});
