var twilio = require('twilio');

var accountSid = 'ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'; // Your Account SID from www.twilio.com/console
var authToken = 'your_auth_token';   // Your Auth Token from www.twilio.com/console

var twilio = require('twilio');
var client = new twilio(accountSid, authToken);

client.messages.create({
    body: "Greetings! The current time is: XXXXXX 90TL7RNVNMX01H7",
    to: '+12092104311',  // Text this number
    from: '+13042242424' // From a valid Twilio number
})
    .then((message) => console.log(message.sid));