// 'use strict';
require('dotenv').config();
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const nodemailer = require('nodemailer');
const port = process.env.PORT || 3222
const reviews = require('./routes/reviewRoutes')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())


app.get('/', (req, res, next) => {
    res.json({
        message: 'running'
    })
})

app.use('/reviews', reviews)


app.post('/send', (req, res, next) => {
    const body = req.body
    const parentFname = body.parentFname
    const parentLname = body.parentLname
    const studentFname = body.studentFname
    const studentLname = body.studentLname
    const email = body.email
    const phone = body.phone
    const message = body.message
    const subject = body.subject
    const asap = body.asap
    const whenToContact = body.whenToContact

    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    nodemailer.createTestAccount((err, account) => {
        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: 'Floerke.Media@gmail.com', // generated ethereal user
                pass: process.env.PASSWORD // generated ethereal password
            }
        });
    
        // setup email data with unicode symbols
        let mailOptions = {
            from: '"Floerke Media" <Floerke.Media@gmail.com>', // sender address
            to: 'skiroyjenkins@gmail.com', // list of receivers
            subject: 'New Student Request', // Subject line
            text: 'Hello world?', // plain text body
            html: `<h2>New Student Contact</h2>
            ${asap ? `<h4>Requested Contact ASAP</h4>` : ''}
            <h4>${parentFname} ${parentLname} has requested ${subject} help for their student ${studentFname} ${studentLname}.</h4>
            <h3>Parent Message:</h3>
            <p>${message}</p>
            <br/><h3>Contact Info:</h3>
            <h4>Email: ${email}</h4>
            <h4>Phone: ${phone}</h4>
            <h4>A good time to contact ${parentFname} is: ${whenToContact}</h4>` // html body
        };

        // send mail with defined transport object
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                res.status(500).json({error: 'Email send failed'})
                return console.log(error)
            }
            res.json({success: 'email sent'})
            console.log('Message sent: %s', info.messageId);
            // Preview only available when sending through an Ethereal account
            console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

            // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
            // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
        });
    });
})

app.use(notFound);
app.use(errorHandler);

function notFound(err, req, res, next) {
    res.status(404).send({error: 'Not found!', status: 404, url: req.originalUrl})
}

function errorHandler(err, req, res, next) {
    console.error('NOPE, LOL', err)
    const stack =  process.env.NODE_ENV !== 'production' ? err.stack : undefined
    res.status(500).send({error: err.message, stack, url: req.originalUrl})
}


app.listen(port, () => {
    process.env.NODE_ENV !== 'production' ?
    console.log(`I got you on http://localhost:${port}`) :
    console.log(`I got you on https://`)
})