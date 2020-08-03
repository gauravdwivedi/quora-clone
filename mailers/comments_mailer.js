const nodeMailer = require('../config/nodemailer');



exports.newComment = (comment) => {
    console.log('Inside new COmment Mailer',comment);

    
    nodeMailer.transporter.sendMail({
        from:'codingwithgaurav@gmail.com',
        to: comment.user.email,
        subject:'New Comment Published',
        html:'<h1>Your comment is now published.</h1>'
    }, (err,info)=>{
        if(err){ console.log('Error in sending mail',err); return}

        console.log('Message sent',info);
        return;
    })
}