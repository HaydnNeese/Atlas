var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ModalSchema = new Schema({

    title:{
        type: String,
        unique: true,
        required: true
    },
    
    note:{
        type:String,
        required: true
    }

});

module.exports = {
    Modal: mongoose.model("Modal", ModalSchema),
    ModalSchema: ModalSchema
};