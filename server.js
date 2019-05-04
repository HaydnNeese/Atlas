const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const routes = require("./routes");
const port = process.env.PORT || 3001;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var mongoose = require('mongoose');

var MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/atlasDB'

mongoose.connect(MONGODB_URI);

var db = mongoose.connection;

require('./auth')(app);
//Add routes, both API and view
app.use(routes);

db.on('error', function(err){
console.log('connection error', err);
});

db.once('open', function(){
console.log('Connection to DB successful');
});

app.listen(port, () => console.log(`Listening on port ${port}`));

