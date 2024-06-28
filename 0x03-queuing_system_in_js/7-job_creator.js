import { createQueue } from 'kue';

// List of jobs with phone numbers and messages to be sent
const jobs = [
  {
    phoneNumber: '4153518780',
    message: 'This is the code 1234 to verify your account'
  },
  {
    phoneNumber: '4153518781',
    message: 'This is the code 4562 to verify your account'
  },
  {
    phoneNumber: '4153518743',
    message: 'This is the code 4321 to verify your account'
  },
  {
    phoneNumber: '4153538781',
    message: 'This is the code 4562 to verify your account'
  },
  {
    phoneNumber: '4153118782',
    message: 'This is the code 4321 to verify your account'
  },
  {
    phoneNumber: '4153718781',
    message: 'This is the code 4562 to verify your account'
  },
  {
    phoneNumber: '4159518782',
    message: 'This is the code 4321 to verify your account'
  },
  {
    phoneNumber: '4158718781',
    message: 'This is the code 4562 to verify your account'
  },
  {
    phoneNumber: '4153818782',
    message: 'This is the code 4321 to verify your account'
  },
  {
    phoneNumber: '4154318781',
    message: 'This is the code 4562 to verify your account'
  },
  {
    phoneNumber: '4151218782',
    message: 'This is the code 4321 to verify your account'
  }
];

// Create a Kue queue instance
const queue = createQueue();

// Iterate through the list of jobs and create a job in the queue for each notification
jobs.forEach((myJob) => {
  let job = queue.create('push_notification_code_2', myJob).save((error) => {
    if (!error) console.log(`Notification job created: ${job.id}`);
  });

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
});
