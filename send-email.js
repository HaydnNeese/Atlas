const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');


const transport = nodemailer.createTransport(smtpTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    auth: {
        user: 'atlas.alerts.info@gmail.com',
        pass: 'atlas555',
    }
}));

function sendEmail(to) {
    console.log('hitting sendEmail recipient: ', to);
    const mailOptions = {
        from: 'atlas.alerts.info@gmail.com',
        to: to,
        subject: 'Atlas Account Access',
        text: `Someone accessed your Atlas account. 
            If it was you, disregard this message. 
            At Atlas we are committed to keeping your information secure. 
            Thank you for using Atlas.`,
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
    console.log('recipient: ', to);
    sendEmail(to);
    res.end();
})

}
