const db = require("../models");
var User = require('../models/User').User;
var Modal = require('../models/Modal').Modal;

module.exports = {

    findById: function(req, res) {
        
        console.log("THIS IS MY REQ PARMS ID >>>>>> ",req.params.id);
        
        User
            .findById(req.params.id)
            .populate("modals")
            .then(dbUser => { 
                
                res.json(dbUser);
                console.log("THIS IS THE RESPONSE FROM DBUSER FIND BY ID >>>>>", dbUser);
            
            })
            .catch(err => res.status(422).json(err))
    },

    create: function (req, res) {
       
       console.log("THIS IS OUR REQUEST BODY", req.body);

        Modal
            .create(req.body)
            .then(dbModal => {
               console.log("THIS IS OUR REQEST THEN", dbModal)
                return User.findOneAndUpdate({_id: req.params.id}, {$push: {modals: dbModal._id}}, {new:true})
            })
            .then(dbUser => res.json(dbUser))
            .catch(err => res.status(422).json(err));   

    }


};