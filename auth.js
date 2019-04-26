var User = require("./models/User").User;
var Modal = require("./models/Modal").Modal;
var md5 = require("md5");
const jwt = require("jsonwebtoken");
const moment = require("moment");

const checkPW = (newPW, dbPassword) => {
  return newPW === dbPassword;
};

const SECRET = "thisisaTOKENKEY";

module.exports = function(app) {
  app.use(function(req, res, next) {
    try {
      const token = (req.header("Authorization") || "").replace(/\"/g);
      if (!token) return next();
      jwt.verify(token, SECRET, (err, payload) => {
        if (err) {
          console.log(err, payload);
          return next();
        }
        User.findById(payload.userId).then(doc => {
          req.user = doc;
          next();
        });
      });
    } catch (e) {
      next(e);
    }
  });

  // -------- Get for user login ----------

  app.post("/api/login", async (req, res) => {
    const currentUser = (await User.find({ email: req.body.email }))[0] || null;
    if (!currentUser) {
      return res.status(400).json({ message: "none" });
    }

    const hashedPassword = md5(req.body.password);

    if (!checkPW(hashedPassword, currentUser.password)) {
      return res.status(400).json({ message: "Invalid Password/Username" });
    }
    const token = jwt.sign({ userId: currentUser._id }, SECRET, {
      expiresIn: 600
    });
    User.findById(currentUser._id)
      .populate("modals")
      .then(data => {
        res.json({
          userId: currentUser._id,
          expires: moment().add(10, "m"),
          token,
          data
        });
      });
  });
};
