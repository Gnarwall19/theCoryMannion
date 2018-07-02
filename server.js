require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

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
      user: GMAIL_USER,
      pass: GMAIL_PASS
    }
  });

  let mailOptions = {
    from: req.body.email,
    to: GMAIL_USER,
    //subject: req.body.subject,
    text: req.body.message
  };

  transporter.sendMail(mailOptions, (err, res) => {
    if (err) {
      console.log(err);
    } else {
      res.render('index.html');
      console.log('Message Sent!');
    }
  });
});




app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`));
