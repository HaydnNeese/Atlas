const db = require("../models");
var User = require('../models/User').User;
var Modal = require('../models/Modal').Modal;

module.exports = {

    findById: function(req, res) {
        User
            .findById(req.params.id)
            .populate("modals")
            .then(dbUser => { 
                res.json(dbUser);
            })
            .catch(err => res.status(422).json(err))
    },

    create: function (req, res) {
        Modal
            .create(req.body)
            .then(dbModal => {
                return User.findOneAndUpdate({_id: req.params.id}, {$push: {modals: dbModal._id}}, {new:true})
            })
            .then(dbUser => res.json(dbUser))
            .catch(err => res.status(422).json(err));   

    },

    delete: function(req, res) {
        Modal
            .findById(req.params.id)
            .then(dbModal => dbModal.remove())
            .then(dbModal => res.json(dbModal))
            .catch(err => res.json(err));
    }

};