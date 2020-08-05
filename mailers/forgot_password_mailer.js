const nodeMailer = require('../config/nodemailer');



exports.newForgotPassWordEmail =(email,token)=>{
    console.log('inside forgot password mailer');

    let htmlString = nodeMailer.renderTemplate({
        email,token
    },'/reset_password.ejs')
    nodeMailer.transporter.sendMail({
        from:'codingwithgaurav@gmail.com',
        to:email,
        subject:'Reset Password',
        html:htmlString
    },(err,info)=>{
        if(err){ console.log('Error in sending Reset Password email',err);return}

        console.log('Email sent for reset password',info);
        return;
    })
}