const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3001;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
require('./auth')(app);


var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/atlasDB');

var db = mongoose.connection;

db.on('error', function(err){
console.log('connection error', err);
});

db.once('open', function(){
console.log('Connection to DB successful');
});

app.listen(port, () => console.log(`Listening on port ${port}`));

