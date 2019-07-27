var express = require('express');
var router = express.Router();
var roominfo = require('../controllers/roominfo');
var roomBooking = require('../controllers/bookingcontroller');
var User = require('../modal/users');
var addRooms = require('../controllers/addingRooms');
var historyController = require('../controllers/history');

require('dotenv').config()
/* GET users listing. */
router.get('/roomInfo', function (req, res, next) {
  roominfo.roomDetails({}, (response) => {
    if (response.status) {
      //responding back with suucess status code and response
      res.status('200');
      res.json(response);
    } else {
      //responding back with failed status code and response
      res.status('500');
      res.json(response);
    }
  })

});
router.post('/roomBooking', function (req, res, next) {
  console.log("req", req.body)
  roomBooking.bookings(req.body, (response) => {
    if (response.status) {
      //responding back with suucess status code and response
      res.status('200');
      res.json(response);
    } else {
      //responding back with failed status code and response
      res.status('500');
      res.json(response);
    }
  })
});


router.get('/addUser', function (req, res) {
  var name = req.query.name;
  var password = req.query.password;
  // create a sample user
  var obj = {
    name: name,
    password: password,
    admin: req.query.admin,
    email: req.query.email
  }
  addRooms.addUser(obj, (response) => {
    if (response.status) {
      //responding back with suucess status code and response
      res.status('200');
      res.json(response);
    } else {
      //responding back with failed status code and response
      res.status('500');
      res.json(response);
    }
  })
})

router.post('/search', function (req, res, next) {
  roominfo.roomSearch(req.query, (response) => {
    if (response.status) {
      //responding back with suucess status code and response
      res.status('200');
      res.json(response);
    } else {
      //responding back with failed status code and response
      res.status('500');
      res.json(response);
    }
  })
});

router.get('/history', function (req, res) {
  console.log("body", req.query)
  var request = { "hostName": req.query.user }
  historyController.getHisotry(request, (response) => {
    if (response.status) {
      //responding back with suucess status code and response
      res.status('200');
      console.log("history", response);
      res.json(response);
    } else {
      //responding back with failed status code and response
      res.status('500');
      console.log("history", response);

      res.json(response);

    }
  })
});

router.get('/cancelBooking', function (req, res) {
  console.log("body cancel", req.query)
  var request = { "_id": req.query.id }
  historyController.cancelHistory(request, (response) => {
    if (response.status) {
      //responding back with suucess status code and response
      res.status('200');
      console.log("history", response);
      res.json(response);
    } else {
      //responding back with failed status code and response
      res.status('500');
      console.log("history", response);

      res.json(response);

    }
  })
});


module.exports = router;
