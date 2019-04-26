const db = require("../models");

module.exports = {
  findById: function(req, res) {
    db.User.findById(req.params.id)
      .populate("modals")
      .then(dbUser => res.json(dbUser))
      .catch(err => res.status(422).json(err));
  },

  create: function(req, res) {
    db.Modal.create(req.body)
      .then(dbModal => {
        return db.User.findOneAndUpdate(
          { _id: req.params.id },
          { $push: { modals: dbModal._id } },
          { new: true }
        );
      })
      .then(dbUser => res.json(dbUser))
      .catch(err => res.status(422).json(err));
  }
};
