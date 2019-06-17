const got = require('got');

exports.handler = function (context, event, callback) {
    let twiml = new Twilio.twiml.MessagingResponse();

    got('https://dog-api.kinduff.com/api/facts', { json: true }).then(response => {
        twiml.message(response.body.facts[0]);
        callback(null, twiml);
    }).catch(error => {
        console.log(error.response.body);
        callback(error);
    });
};

// Add "got" to your list of npm modules