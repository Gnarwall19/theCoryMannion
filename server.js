require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const twilio = require('twilio');
const client = new twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/views'));
app.use("/public", express.static(__dirname + '/public'));

app.get('/', function (req, res) {
  res.sendFile('index.html');
});

// POST Route from contact form
app.post('/contact', (req, res) => {
  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS
    }
  });

  let mailOptions = {
    from: req.body.email,
    to: process.env.GMAIL_USER,
    subject: `New Contact From Your Web Page`,
    text: req.body.message
  };

  transporter.sendMail(mailOptions, (err, res) => {
    if (err) {
      console.log(err);
    } else {
      // res.render COMFIRMATION MODAL;
      return console.log('Message Sent!');
      // ^Sends 2 messages before crashing
    }
  });


  client.messages.create({
    to: process.env.TWILIO_RECIEVER,
    from: process.env.TWILIO_SENDER,
    body: `${req.body.email} has expressed interest in contacting you!`
  });

});




app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`));
