var nodemailer = require('nodemailer');

const user = process.env.NODEMAILER_USER;
const password = process.env.NODEMAILER_PASSWORD;
const clientId = process.env.NODEMAILER_CLIENT_ID;
const clientSecret = process.env.NODEMAILER_CLIENT_SECRET;
const refreshToken = process.env.NODEMAILER_REFRESH_TOKEN;

const sendEmail = (emails, message, subject) => {
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        // auth:{
        //     user: 'notifications@thefirstteepittsburgh.org',
        //     pass: '5370Schenley'
        // }
        auth: {
            type: 'OAuth2',
            user: user,
            pass: password,
            clientId: clientId,
            clientSecret: clientSecret,
            refreshToken: refreshToken
        }
    });

    var mailOptions = {
        from: 'notifications@thefirstteepittsburgh.org',
        to: 'notifications@thefirstteepittsburgh.org',
        bcc: emails,
        subject: subject,
        text: message
    }

    transporter.sendMail(mailOptions, function(error,info){
        if(error) {
            console.log(error);
        } else {
            console.log('Email Sent');
        }
    })

}

module.exports = {sendEmail};