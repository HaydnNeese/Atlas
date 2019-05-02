const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const routes = require("./routes");
const port = process.env.PORT || 3001;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/atlasDB');

var db = mongoose.connection;

require('./auth')(app);
require('./reset')(app);
require('./send-email')(app);
//Add routes, both API and view
app.use(routes);

db.on('error', function(err){
console.log('connection error', err);
});

db.once('open', function(){
console.log('Connection to DB successful');
});

app.listen(port, () => console.log(`Listening on port ${port}`));

