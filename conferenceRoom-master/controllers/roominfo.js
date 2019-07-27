var roomsModal = require('../modal/roomSchema');
var bookingsModal = require('../modal/booking')
roomDetails = (request, callback) => {

  roomsModal.find({}, function (err, docs) {
    if (err) {
      var errorMsg = "error: " + err.message;
      //response.status(500).send(err); 
      callback({
        'status': false,
        'data': errorMsg
      });

    } else {
      //response.status(200).end();
      callback({
        'status': true,
        'data': docs
      });
    }

  });

}

roomSearch = (request, callback) => {
  console.log("request", request)
  let query = {
    "location": request.location,
    "floor": request.floor
  }
  findRoom(query, (rooms) => {

    getBookings(request, rooms, (bookings) => {
      console.log("bookings", bookings)
      callback({
        status: rooms.status,
        rooms: bookings.data
        // bookings: bookings.data
      })

    })

  })

}

function findRoom(request, callback) {
  // console.log(request)
  roomsModal.find(request, function (err, docs) {
    if (err) {
      var errorMsg = "error: " + err.message;
      //response.status(500).send(err); 
      callback({
        'status': false,
        'data': err
      });

    } else {
      //response.status(200).end();
      console.log("rooms data", docs)
      callback({
        'status': true,
        'data': docs
      });
    }

  });
}

function getBookings(request, rooms, callback) {
  let query = {
    "location": request.location,
    "floor": request.floor
  }
  bookingsModal.find(query, function (err, bookings) {
    if (err) {
      var errorMsg = "error: " + err.message;
      callback({
        'status': false,
        'data': errorMsg
      });

    } else {
      //response.status(200).end();
      console.log("data", bookings)
      for (var i = 0; i < bookings.length; i++) {
        for (var j = 0; j < rooms.data.length; j++) {
          console.log(Date.parse('01/01/2011 ' + request.startTime + ':00') >= Date.parse('01/01/2011 ' + bookings[i].startTime + ':00'), Date.parse('01/01/2011 ' + request.startTime + ':00') >= Date.parse('01/01/2011 ' + bookings[i].endTime + ':00'))
          if (bookings[i].roomName == rooms.data[j].roomName && bookings[i].floor == rooms.data[j].floor && bookings[i].Date == request.Date) {
            if (Date.parse('01/01/2011 ' + request.startTime + ':00') >= Date.parse('01/01/2011 ' + bookings[i].startTime + ':00') && Date.parse('01/01/2011 ' + request.startTime + ':00') <= Date.parse('01/01/2011 ' + bookings[i].endTime + ':00')) {
              rooms.data.splice(i, 1);
            }
          }
        }
      }

      callback({
        'status': true,
        'data': rooms.data
      });
    }

  });
}
module.exports = {
  roomDetails: roomDetails,
  roomSearch: roomSearch
}