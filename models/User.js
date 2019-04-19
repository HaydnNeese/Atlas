var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    username: { 
        type: String,
        unique: true
    },
    password: String,
    email: {
        type: String,
        unique: true
    },
    phone: String,
    question: String,
    answer: String
});

module.exports = {
    User: mongoose.model("User", UserSchema),
    UserSchema: UserSchema
};
