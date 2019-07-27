var roomsModal = require('../modal/roomSchema');
var User = require('../modal/users');

addingRooms = (request, callback) => {

  roomsModal.create(request, function (err, docs) {
    if (err) {
      var errorMsg = "error: " + err.message;
      //response.status(500).send(err); 
      callback({
        'status': false,
        'data': err
      });

    } else {
      //response.status(200).end();
      console.log()
      callback({
        'status': true,
        'data': docs
      });
    }

  });

}

addUser = (request, callback) => {
  console.log("request", request);
  User.create(request, function (err, docs) {
    if (err) {
      var errorMsg = "error: " + err.message;
      //response.status(500).send(err); 
      callback({
        'status': false,
        'data': err
      });

    } else {
      //response.status(200).end();
      console.log()
      callback({
        'status': true,
        'data': docs
      });
    }

  });

}


module.exports = {
  addingRooms: addingRooms,
  addUser: addUser
}