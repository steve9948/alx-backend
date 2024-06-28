/**
 * Function to create and process push notification jobs.
 * @param {Array} jobs - An array of job objects containing data for the notifications.
 * @param {Object} queue - The Kue queue instance where jobs will be created and processed.
 * @throws Will throw an error if jobs is not an array.
 */
function createPushNotificationsJobs(jobs, queue) {
  // Check if the input is an array
  if (!Array.isArray(jobs)) {
    throw Error('Jobs is not an array');
  }

  // Iterate through the list of jobs and create a job in the queue for each notification
  jobs.forEach((myJob) => {
    let job = queue.create('push_notification_code_3', myJob);

    // Event listener for job completion
    job.on('complete', function() {
      console.log(`Notification job ${job.id} completed`);
    })
    // Event listener for job failure
    .on('failed', function(error) {
      console.log(`Notification job ${job.id} failed: ${error}`);
    })
    // Event listener for job progress
    .on('progress', function(progress, data) {
      console.log(`Notification job ${job.id} ${progress}% complete`);
    });

    // Save the job to the queue
    job.save((error) => {
      if (!error) console.log(`Notification job created: ${job.id}`);
    });
  });
}

module.exports = createPushNotificationsJobs;
