var express = require("express");
var mailer = require('nodemailer');
var bodyParser = require('body-parser')
var app = express();
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

var smtpTransport = mailer.createTransport("SMTP",{
    service: "Gmail",
    auth: {
        user: "venkatesh.vangala1989@gmail.com",
        pass: "Venkat@488"
    }
});

var mail = {
    from: "Venkatesh Kumar venkatesh.vangala1989@gmail.com",
    // to: "venkatesh.vangala@imaginea.com",
    // subject: "Send Email Using Node.js",
    // text: "Node.js mail sending for ur school",
    // html: "<b>Node.js is done for you to send mail come we il host</b>"
}


app.get('/', function(req, res) {
    res.send('Simple node server created for email notification\n');
});


app.post('/sendEmail', function(req, res) {
    console.log(req.body)
    var toAddress = req.body.toAddress
    var subject = req.body.subject
    var message = req.body.message

    mail.to = toAddress
    mail.subject = subject
    mail.text = message
    mail.html = "<b>" + message + "</b>"
    console.log(mail)

    smtpTransport.sendMail(mail, function(error, response){
        if(error){
            console.log(error);
        }else{
            console.log("Message sent: " + response.message);
        }
        smtpTransport.close();
    });
    res.writeHead(200, {"Content-Type": "text/plain"});
    res.end("Server Created using simple http");
});


app.listen(9000);


