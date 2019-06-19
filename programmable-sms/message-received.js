const http = require('http');
const express = require('express');
const MessagingResponse = require('twilio').twiml.MessagingResponse;
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

const toDoList = [];

app.post('/sms', (req, res) => {

    const reqBody = req.body.Body;
    const reqArray = reqBody.split(' ');
    const actionWord = reqArray[0].toLowerCase();
    const toDoItem = reqArray.splice(1, reqArray.length).join(' ');

    const buildListResponse = () => {
        let text = '';
        toDoList.map((todo, index) => {
            text += `${index + 1}. ${todo} \n`;
        });
        return text;
    }

    const noActionSent = () => {
        let twiml = new MessagingResponse().message('Please preface your message with add, list, or remove');
        res.writeHead(200, { 'Content-Type': 'text/xml' });
        res.end(twiml.toString());
    }

    const addAction = () => {
        toDoList.push(toDoItem);
        let twiml = new MessagingResponse().message(`Yay! Your to-do item ${toDoItem} has been added to your to-do list.`);
        res.writeHead(200, { 'Content-Type': 'text/xml' });
        res.end(twiml.toString());
    }

    const listAction = () => {
        let twiml = new MessagingResponse().message({
            action: 'http://2e5b33fc.ngrok.io/status',
            method: 'POST'
        }, buildListResponse());
        res.writeHead(200, { 'Content-Type': 'text/xml' });
        res.end(twiml.toString());
    }

    const removeAction = () => {
        toDoList.splice(toDoItem - 1, 1);
        let twiml = new MessagingResponse().message(buildListResponse());
        res.writeHead(200, { 'Content-Type': 'text/xml' });
        res.end(twiml.toString());
    }


    switch (actionWord) {
        case 'add':
            addAction();
            break;
        case 'list':
            listAction();
            break;
        case 'remove':
            removeAction();
            break;
        default:
            noActionSent();
    }
});


app.post('/status', (req, res) => {
    const messageSid = req.body.MessageSid;
    const messageStatus = req.body.MessageStatus;

    console.log(`SID: ${messageSid}, X-Twilio-Signature: ${ req.headers['x-twilio-signature'] }, Status: ${messageStatus}`);

    res.sendStatus(200);
});

http.createServer(app).listen(8081, () => {
    console.log('Express server listening on port 8081');
});
