import { createQueue } from 'kue';

// Create a Kue queue instance
const queue = createQueue();

/**
 * Sends a notification to a specified phone number with a given message.
 * @param {string} phoneNumber - The phone number to send the notification to.
 * @param {string} message - The message to send in the notification.
 */
function sendNotification(phoneNumber, message) {
  console.log(`Sending notification to ${phoneNumber}, with message: ${message}`);
}

/**
 * Processes jobs in the 'push_notification_code' queue.
 * @param {Object} job - The job object containing data for the job.
 * @param {Function} done - The callback function to indicate job completion.
 */
queue.process('push_notification_code', function(job, done) {
  sendNotification(job.data.phoneNumber, job.data.message);
  done();
});
