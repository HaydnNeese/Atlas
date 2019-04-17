var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    username: String,
    password: String,
    email: String,
    phone: String,
    question: String,
    answer: String
});

module.exports = {
    User: mongoose.model("User", UserSchema),
    UserSchema: UserSchema
};
