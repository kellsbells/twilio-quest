const http = require('http');
const express = require('express');
const MessagingResponse = require('twilio').twiml.MessagingResponse;

const app = express();

app.post('/sms', (req, res) => {

    console.log('req.body.FromCountry: ', req.body.FromCountry);

    const fromCountry = req.body.FromCountry
    const twiml = new MessagingResponse();

    twiml.message(`Hi! It looks like your phone number was born in ${fromCountry}`);

    res.writeHead(200, { 'Content-Type': 'text/xml' });
    res.end(twiml.toString());
});

http.createServer(app).listen(8081, () => {
    console.log('Express server listening on port 8081');
});
