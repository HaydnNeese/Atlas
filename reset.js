const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');
var async = require('async');
var crypto = require('crypto');
var md5 = require('md5');
var User = require('./models/User').User;
var Modal = require('./models/Modal').Modal;
const dotenv = require("dotenv").config();


module.exports = function(app) {

    app.post('/api/forgot', function(req, res, next) {
        // console.log("WE ARE HERE")
        // console.log("THIS IS MY REQ.HEADERS EMAIL INFO>>>>>>", emailInfo)
        async.waterfall([
          function(done) {
            crypto.randomBytes(20, function(err, buf) {
              var token = buf.toString('hex');
              done(err, token);
            });
          },
          function(token, done) {
            User.findOne({ email: req.body.email }, function(err, user) {
            //  console.log("THIS IS OUR USER INFO FROM PASSWORD RESET LINK",user);
              if (user !== null) {

                user.resetPasswordToken = token;
                user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
        
                user.save(function(err) {
                  // console.log("THIS IS OUR TOKEN WITHIN USER SAVE>>>>>>",token);
                  // console.log("THIS IS OUR ERROR>>>>>>",err);
                  done(err, token, user);               
                });

              } else {   


              // console.log("WE ARE HERE IN NULL ROUTE",err);
              res.json(err);

            }
            });
          },
          function(token, user, done) {


            const transport = nodemailer.createTransport(smtpTransport({
              service: "gmail",
              host: "smtp.gmail.com",
              auth: {
                  user: 'atlas.alerts.info@gmail.com',
                  pass: process.env.emailPassword,
                    }
             })
            );
            var mailOptions = {
              to: user.email,
              from: 'atlas.alerts.info@gmail.com',
              subject: 'Atlas Password Reset',
              text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
                'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
                'http://'+'atlas-secure-info.herokuapp.com' + '/reset/' + token + '\n\n' +
                'If you did not request this, please ignore this email and your password will remain unchanged.\n'
            };
            transport.sendMail(mailOptions, (error, info) => {
              if (error) {
                  // console.log('send Email error: ', error);
              }else{
                  // console.log('email sent: ', info.response);
              }
            });
          }
        ], function(err) {
          if (err) return next(err);
          // res.redirect('/forgot');
          // console.log("we are here")
        });
      });


      app.get('/api/reset/:token', function(req, res) {
        // console.log("I AM HERE IN THE RESET ROUTE", req.params.token)
        // User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, 
        User.findOne({ resetPasswordToken: req.params.token},
        function(err, user) {
          
          // console.log("THIS IS MY USER>>>>>>>",user);
          res.json(user);
        });
        
      });

      app.post('/api/passwordreset/:token', function(req, res) {
        // console.log("I AM HERE IN THE PASSWORD RESET ROUTE", req.params.token)
        async.waterfall([
          function(done) {
            // User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, 
            User.findOne({ resetPasswordToken: req.params.token},function(err, user) {
              // console.log("THIS IS MY USER IN THE PASSWORD RESET ROUTE >>>>>>>",user);
              // console.log("THIS IS MY REQ BODY INFO>>>>>>>",req.body.password);
      
              user.password = md5(req.body.password);
              user.resetPasswordToken = undefined;
              user.resetPasswordExpires = undefined;
      
              user.save(function(err) {
                // console.log("WE ARE IN THE SAVE FUNTION IN THE PASSWORD RESET ROUTE")
                done(err); 

              });
            });
          },
        ], function(err) {
          // res.redirect('/');
        });
      });



}