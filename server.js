const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const routes = require("./routes");
const port = process.env.PORT || 3001;
const path = require("path");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
    app.get("/*", (req, res) => {
        res.sendFile(path.join(__dirname, './client/build/index.html'));
    });
}
// else { 
//     app.use(express.static(path.join(__dirname, 'client/public')));
//     app.get("/*", (req, res) => {
//         res.sendFile(path.join(__dirname, './client/public/index.html'));
//     });
// }

var mongoose = require('mongoose');

var MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/atlasDB'

mongoose.connect(MONGODB_URI);

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

