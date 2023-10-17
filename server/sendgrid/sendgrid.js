const sendEmail = (emails, message, subject) => {

    const key = process.env.SENDGRID_API_KEY;
    const sgMail = require('@sendgrid/mail')
    sgMail.setApiKey(key)
    const msg = {
      // to: emails, // Change to your recipient
      to: "notifications@thefirstteepittsburgh.org",
      bcc: emails,
      from: 'notifications@thefirstteepittsburgh.org', // Change to your verified sender
      templateId: 'd-8ed996d8a4fa48bbaa58259052643102',
      dynamic_template_data: {
        mesg: message,
        // name: coach_name,
        subject: subject
      },
    }
    sgMail
      .send(msg)
      .then(() => {
        console.log('Email sent')
      })
      .catch((error) => {
        console.error(error)
      })
  }

module.exports = {sendEmail};