const db = require("../models");

module.exports = {
    findById: function(req, res) {
        db.User.findById(req.params.id)
            .populate("modals")
            .then(dbUser => { 
                
                res.json(dbUser);
                console.log("THIS IS THE RESPONSE FROM DBUSER FIND BY ID >>>>>", dbUser);
            
            })
            .catch(err => res.status(422).json(err))
    },

    create: function (req, res) {
        db.Modal.create(req.body)
            .then(dbModal => {
               console.log("THIS IS OUR REQEST THEN", dbModal)
                return User.findOneAndUpdate({_id: req.params.id}, {$push: {modals: dbModal._id}}, {new:true})
            })
            .then(dbUser => res.json(dbUser))
            .catch(err => res.status(422).json(err));   
    }
};