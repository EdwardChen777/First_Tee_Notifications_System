// server/index.js
// import { getCoachId, sessionParticipants, coachSessions } from "./salesforce/salesforce.js";
var salesforce = require('./salesforce/salesforce');
var twilio = require('./twilio/twilio');
var sendgrid = require('./sendgrid/sendgrid');
var nodemailer = require('./nodemailer/nodemailer')

const express = require("express");
const path = require('path');

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json());

app.get("/api", (req, res) => {
    res.json({ message: "Hello from server!" });
});

// take the email of the coach and check if it's in the system 
app.post("/checklogin",(req,res) => {
    res.json({ message: "Hello from server!" });
});

// get all the sessions for a coach 
app.post("/coachId",(req,res) => {
    // retrieve coach's email from the request query parameters 
    let coachEmail = req.body.email;
    // get coach id from email 
    salesforce.getCoachId(coachEmail,res);
    // res.json(sessions);
});

// get all the sessions for a coach 
app.get("/sessions",(req,res) => {
    // retrieve coach's email from the request query parameters 
    const coachEmail = req.query.session;
    // get coach sessions from email
    salesforce.coachSessions(coachEmail,res);
});

// get all the participants for a session 
app.get("/participants",(req,res) => {
    const sessionId = req.query.participant;
    salesforce.sessionParticipants(sessionId,res);
});

app.get("/coaches",(req,res) => {
    const sessionId = req.query.session;
    console.log("retrieving coaches");
    salesforce.sessionCoaches(sessionId,res);
});

// send the message after receiving list of phone numbers and emails 
app.post("/sendmessage", (req,res) => {
    // getting the body of post request 
    const body = req.body;
    const subject = body.subject;
    const msg = body.message;
    const coachId = body.coachId;


    // send message to participants
    salesforce.sessionNumbers(coachId, twilio.sendMessage, msg);
    salesforce.sessionEmails(coachId, nodemailer.sendEmail, msg, subject)

    // send message to coaches
    salesforce.coachNumbers(coachId, twilio.sendMessage, msg);
    salesforce.coachEmails(coachId, nodemailer.sendEmail, msg, subject)

    // res.json({ message: "Message Successfully Sent" });
    res.status(200).send('Status: OK')
})

app.use(express.static(path.resolve(__dirname, '../client/build')));

// All other GET requests not handled before will return our React app
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});