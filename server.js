const express = require('express');
var mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const routes = require("./routes");
const port = process.env.PORT || 3001;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Add routes, both API and view
app.use(routes);


mongoose.connect('mongodb://localhost/atlasDB');

var db = mongoose.connection;

require('./auth')(app);

db.on('error', function(err){
console.log('connection error', err);
});

db.once('open', function(){
console.log('Connection to DB successful');
});

app.listen(port, () => console.log(`Listening on port ${port}`));

