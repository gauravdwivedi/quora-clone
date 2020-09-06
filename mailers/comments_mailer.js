// const nodeMailer = require('../config/nodemailer');



// exports.newComment = (comment) => {

//     // console.log('Inside new COmment Mailer',comment);
//     //sending html template with email

//     let htmlString =nodeMailer.renderTemplate({
//         comment:comment
//     }, '/new_comment.ejs')
//     nodeMailer.transporter.sendMail({
//         from:'codingwithgaurav@gmail.com',
//         to: comment.user.email,
//         subject:'New Comment Published',
//         html:htmlString
//     }, (err,info)=>{
//         if(err){ console.log('Error in sending mail',err); return}

//         // console.log('Message sent',info);
//         return;
//     })
// }