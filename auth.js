
var User = require('./models/User').User;
var Modal = require('./models/Modal').Modal;
var md5 = require('md5');
const jwt=require('jsonwebtoken');
const moment=require('moment');


const checkPW = (newPW, dbPassword) => {
  return (newPW === dbPassword);
}

module.exports = function(app){

  app.use(function(req,res,next){
    try{
    const token = req.header("Authorization").split(" ")[1]
    //console.log('***** AUTH.JS TOKEN: ', token);
    var verifyOptions = {
      expiresIn: "10m"
    }
    
    jwt.verify(token, "thisisaTOKENKEY", verifyOptions, function (err, payload) {
        console.log('This is PAYLOAD: ', payload);
        if (payload.expires.isAfter(moment())) {                            //check if payload.expires is expired. if it is, then go next
            User.findById(payload.userId).then(
                (doc)=>{
                    req.user=doc;
                    next()
                }
            )
        } else {
           console.log('********your token is expired');
           next()
        }
    })
}catch(e){
    next()
}
})

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
    //console.log('request header: ', req.header);
    //console.log('PRINTED req body', req.body);
    var reqEmail = req.body.email;                               //  set the username the email the user types in
    let currentUser = await User.find({ email: reqEmail });      //  only bring back that email
    if (currentUser.length == 0) {                               // check the database for the email entered
      //console.log("That email does not exist. If you don't have an account, sign up!");
      res.json({message: 'none'});
    }else{
     
      var dbPassword = currentUser[0].password;
      var newPW = md5(req.body.password)              //hash what the user typed in

      if (checkPW(newPW, dbPassword)){
        //var date = new Date();
        var ten_minutes = moment().add(10, 'm');
        // const token=jwt.sign({expires: ten_minutes, userId:currentUser[0]._id}, "thisisaTOKENKEY");

             //if user log in success, generate a JWT token for the user with a secret key
        const token=jwt.sign({UserId:currentUser[0]._id}, 'thisisaTOKENKEY', { expiresIn: '5s' });
        console.log(token);
        
          User.findById(currentUser[0]._id).populate("modals")  
            .then(data => {
              res.json({
                userId: currentUser[0]._id,
                // username:user.username,
                // image:user.image,
                // name:user.first,
                expires: ten_minutes,
                token,
                data                  // this data should contain the notes (modals) attached to this user.
            })
            })
                    
      }else{
        res.status(400).json({message:'Invalid Password/Username'});
      }                     
      
    }                                        
  });
  
}




