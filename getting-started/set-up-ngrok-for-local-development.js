var express = require('express');
var app = express();

app.get('/', function (req, res) {
    res.send('Hello World');
})

var server = app.listen(8081, function () {
    var port = server.address().port

    console.log("Example app listening at http://0.0.0.0:", port)
})

// download ngrok
// from folder with ngrok download run
// $ ./ngrok http 8081
// also run
// $ node set-up-ngrok-for-local-development.js