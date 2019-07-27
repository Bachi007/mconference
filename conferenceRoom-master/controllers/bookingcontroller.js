var roomsModal = require('../modal/roomSchema');
var bookingsModal = require('../modal/booking');
var nodemailer = require('nodemailer');
// var smtpTransport = require('nodemailer-smtp-transport');
var mailAccountUser = 'mconference4u@gmail.com'
var mailAccountPassword = 'Miracle@123'

var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: mailAccountUser,
    pass: mailAccountPassword
  }
});

bookings = (request, callback) => {
  console.log("request", request);
  let toEmails = [];
  request.attendees.forEach(element => {
    toEmails.push(element.name)
  });
  bookingsModal.create(request, function (err, docs) {
    if (err) {
      var errorMsg = "error: " + err.message;
      //response.status(500).send(err); 
      callback({
        'status': false,
        'data': err
      });

    } else {
      //response.status(200).end();

      var mailOptions = {
        from: 'saipavan.anand@gmail.com',
        to: toEmails,
        subject: 'Invitation for Conference',
        text: request.Agenda,
        html: `<html lang="en">
        <head>
          <title>Bootstrap Example</title>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">
          <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.0/jquery.min.js"></script>
          <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js"></script>
          <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"></script>
        </head>
        <body>
        
        <p>Hello, </p>
        <p>You have been invited for the following event. Please check the event details below</p>
          <div class="row">
            <div class="col-1" style="font-weight: 500;">Venue :    `+ request.roomName + `</div>
        
          </div>
          <div class="row">
            <div class="col-1" style="font-weight: 500;">Location :    `+ request.location + `</div>
          </div>
          <div class="row">
            <div class="col-1" style="font-weight: 500;">Date :    `+ request.Date + `</div>
          </div>
        <div class="row">
            <div class="col-1" style="font-weight: 500;">Time :    `+ request.startTime + ` to ` + request.endTime + `</div>
          </div>
        
        </body>
        </html>`
      };



      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });

      callback({
        'status': true,
        'data': docs
      });
    }
  });
}
module.exports = {
  bookings: bookings
}