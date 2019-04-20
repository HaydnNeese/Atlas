
var User = require('./models/User').User;
var md5 = require('md5');

const checkPW = (newPW, dbPassword) => {
  if (newPW === dbPassword) {
    console.log("CONGRATS! You're logged in!")
    // need to set up routing the user to the user profile page. 
  }else{
    console.log("ACCESS DENIED!!!!");
  }
}

module.exports = function(app){

  app.post('/api/world', (req, res) => {
    console.log(req.body);
    var testdata = new User({
      username: req.body.username,
      password: md5(req.body.password), 
      email: req.body.email,
      phone: req.body.phone,
      question: req.body.question,
      answer: req.body.answer
    });
    
    testdata.save(function(err, data) {
      if(err) console.log(err);
      else res.json(data);
    });
  });

  // -------- Get for user login ----------

  app.post('/api/login', async (req, res) => {
    console.log('PRINTED req body', req.body);
    var reqEmail = req.body.email;                               //  set the username the email the user types in
    let currentUser = await User.find({ email: reqEmail });      //  only bring back that email
    if (currentUser.length == 0) {                               // check the database for the email entered
      console.log("That email does not exist. If you don't have an account, sign up!");
    }else{
      console.log('this is current user: ', currentUser[0]);
      var dbPassword = currentUser[0].password;
      console.log("printed from AUTH.JS", JSON.stringify(dbPassword));
      var newPW = md5(req.body.password)              //hash what the user typed in
      console.log('New Password: ', newPW)
      checkPW(newPW, dbPassword);                     //call the function to check the password. 
    }
    
  });
  
}




