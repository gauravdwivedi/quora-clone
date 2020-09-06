// const queue = require('../config/kue');


// const commentsMailer = require('../mailers/comments_mailer');

// //process function 
// queue.process('email',function(job,done){
//     console.log('emails worker is processing a job'),job.data;

//     //calling the mailer
//     commentsMailer.newComment(job.data);

//     done();
// })