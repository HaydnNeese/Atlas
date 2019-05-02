//------ This is for the password stuff 
const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');
var async = require('async');
var crypto = require('crypto');
var User = require('./models/User').User;
var Modal = require('./models/Modal').Modal;


module.exports = function(app) {

    app.post('/api/forgot', function(req, res, next) {
        console.log("WE ARE HERE")
        async.waterfall([
          function(done) {
            crypto.randomBytes(20, function(err, buf) {
              var token = buf.toString('hex');
              done(err, token);
            });
          },
          function(token, done) {
            User.findOne({ email: req.body.email }, function(err, user) {
             console.log("THIS IS OUR USER INFO FROM PASSWORD RESET LINK",user);
              if (!user) {
                // req.flash('error', 'No account with that email address exists.');
                // return res.redirect('/forgot');
              }
      
              user.resetPasswordToken = token;
              user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
      
              user.save(function(err) {
                console.log("THIS IS OUR TOKEN WITHIN USER SAVE>>>>>>",token);
                console.log("THIS IS OUR ERROR>>>>>>",err);
                done(err, token, user);
               
              });
            });
          },
          function(token, user, done) {
            // var smtpTransport = nodemailer.createTransport('SMTP', {
            //   service: 'Gmail',
            //   auth: {
            //     user: 'jstone074@gmail.com',
            //     pass: 'Circle08'
            //   }
            // });

            const transport = nodemailer.createTransport(smtpTransport({
              service: "gmail",
              host: "smtp.gmail.com",
              auth: {
                  user: 'atlas.alerts.info@gmail.com',
                  pass: 'atlas555',
              }
             }));


            console.log("THIS IS OUR SMTPTRANSPORT INFO>>>>>", transport);
            
            var mailOptions = {
              to: user.email,
              from: 'passwordreset@demo.com',
              subject: 'Node.js Password Reset',
              text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
                'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
                'http://' + req.headers.host + '/reset/' + token + '\n\n' +
                'If you did not request this, please ignore this email and your password will remain unchanged.\n'
            };
            transport.sendMail(mailOptions, (error, info) => {
              if (error) {
                  console.log('send Email error: ', error);
              }else{
                  console.log('email sent: ', info.response);
              }
            });
            // transport.sendMail(mailOptions, function(err) {
            //   req.flash('info', 'An e-mail has been sent to ' + user.email + ' with further instructions.');
            //   console.log("THIS IS OUR ERROR>>>>>",err);
            //   done(err, 'done');
            // });
          }
        ], function(err) {
          if (err) return next(err);
          // res.redirect('/forgot');
          console.log("we are here")
        });
      });
}