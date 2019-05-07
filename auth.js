
var User = require('./models/User').User;
var Modal = require('./models/Modal').Modal;
var md5 = require('md5');
const jwt=require('jsonwebtoken');
const moment=require('moment');
const checkPW = (newPW, dbPassword) => {
  //console.log(newPW, dbPassword);
  return (newPW === dbPassword);
};

const SECRET = "TOKENKEY";

module.exports = function(app) {

// ----------- post for original signup -----------

  app.post('/api/world', (req, res) => {
    //console.log(req.body);
    var testdata = new User({
      username: req.body.username,
      password: md5(req.body.password), 
      email: req.body.email,
      phone: req.body.phone,
      pin: req.body.pin
    });
    
    testdata.save(function(err, data) {
      if(err) console.log(err);
      else res.json(data);
    });
  });

  // -------- Get for user login ----------

  app.post('/api/login', (req, res) => {
    //console.log('REQUEST ', req.body);
    let currentUser;
    User.findOne({email: req.body.email}, (err, data) => {
      //console.log(data);
      currentUser = data;

      //console.log('AuthJS Current User: ', currentUser);
    if (!currentUser) {
      return res.json({message: "none"});
    }
    const hashedPassword = md5(req.body.password);

    if (!checkPW(hashedPassword, currentUser.password)) {
      return res.json({message: "Invalid Password/Username"});
    }
    const token = jwt.sign({userID: currentUser._id}, SECRET, {
      expiresIn: 600
    });
    //console.log('this is login token: ', token);
    User.findById(currentUser._id)
      //.populate("modals")
      .then(data => {
        res.json({
          userID: currentUser._id,
          expires: moment().add(10, "m"),
          token: token, 
          data: data
        });
      });
    })
  });
};