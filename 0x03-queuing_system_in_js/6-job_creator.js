import { createQueue } from 'kue';

// Create a Kue queue instance
const queue = createQueue();

/**
 * Notification object containing the phone number and message.
 */
const notification = {
  phoneNumber: '4153518780',
  message: 'This is the code to verify your account'
};

/**
 * Create a job in the 'push_notification_code' queue with the notification data.
 * @param {Object} notification - The notification data to be pushed to the queue.
 */
const job = queue.create('push_notification_code', notification).save(function (error) {
  if (!error) {
    console.log(`Notification job created: ${job.id}`);
  }
});

/**
 * Event listener for job completion.
 */
job.on('complete', function() {
  console.log('Notification job completed');
}).on('failed', function() {
  console.log('Notification job failed');
});
