require('dotenv').config();
const userLib = require("./backend/lib/userLib");
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT || 5010;
const options = {
    extensions: ['htm', 'html','css','js','ico','jpg','jpeg','png','svg'],
    index: ['index.html'],  
}
app.use(express.static("public", options));

// app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/card.html');
});
app.get('/', function(req, res) {
    res.sendFile(__dirname + '/1.html');
});
app.get('/resume', function(req, res) {
    res.sendFile(__dirname + '/resume.html');
});
mongoose.set('strictQuery', true);
mongoose.connect(process.env.MONGO_CONNECTION_STRING, {}, function(err) {
    if (err) {
        console.error(err);
    } else {
        console.log('Connected to database');
        // TODO : donot create a user if atleast 1 user exist in the table
        userLib.createFirstUser(function(err, res) {
            if (err) {
                //console.error(err);
            } else {
                console.log(res);
            }
        });
        app.listen(port, function() {
            console.log('Server started on port ' + port);
        });
    }
});