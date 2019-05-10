const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');
const dotenv = require("dotenv").config();
const moment = require("moment");


const transport = nodemailer.createTransport(smtpTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    auth: {
        user: 'atlas.alerts.info@gmail.com',
        pass: process.env.emailPassword,
    }
}));

function sendEmail(to) {
    var date = moment.utc().format();
    var local = moment.utc(date).local().format('YYYY-MM-DD [at] HH:mm:ss');
    const mailOptions = {
        from: 'atlas.alerts.info@gmail.com',
        to: to,
        subject: 'Atlas Account Access',
        text: `Someone accessed your Atlas account on ${local}. 

If it was you, kindly disregard this message.

At Atlas, we are committed to keeping your information secure and keeping you informed 24/7. 

Thank you for using Atlas!

~ The Atlas Team ~`
    };
    transport.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('send Email error: ', error);
        }else{
            console.log('email sent: ', info.response);
        }
    });
};

module.exports = function(app) {

app.post('/api/email', (req, res) => {
    const to = Object.keys(req.body);
    sendEmail(to);
    res.end();
})

}
