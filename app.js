'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();

const urlencodedParser = bodyParser.urlencoded({extended: false});

app.use(express.static(__dirname + '/public'));

app.post('/send', urlencodedParser, (req, res) => {
    const output = `
    <p>You have a new contact request</p>
    <h3>Contact Details</h3>
    <ul>  
      <li>Name: ${req.body.name}</li>
      <li>Phone: ${req.body.phone}</li>
    </ul>
  `;
    
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'contactformua@gmail.com',
            pass: 'kpi-ip85'
        },
        tls:{
            rejectUnauthorized:false
        }
    });
    
    const mailoptions = {
        from: 'contactformua@gmail.com', 
        to: 'contactformua@gmail.com', 
        subject: 'Contact Request',
        html: output
    };
    
    transporter.sendMail(mailoptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);   
    });
    res.redirect(req.get('referer'));
});

app.listen(8000, () => console.log('Server started'))
