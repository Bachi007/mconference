var express = require('express');
var router = express.Router();
var addingRoomController = require('../controllers/addingRooms');
var User = require('../modal/users');
var jwt = require('jsonwebtoken');

/* GET home page. */
router.post('/addRoom', function (req, res) {
  console.log("req", req.body)
  addingRoomController.addingRooms(req.body, (response) => {
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

// route to return all users (GET http://localhost:8080/users)
router.get('/users', function (req, res) {
  User.find({}, function (err, users) {
    res.json(users);
  });
});

router.post('/authenticate', function (req, res) {
  console.log('req', req.body)
  // find the user
  User.findOne({
    name: req.body.name
  }, function (err, user) {

    if (err) throw err;

    if (!user) {
      res.json({ success: false, message: 'Authentication failed. User not found.' });
    } else if (user) {

      // check if password matches
      if (user.password != req.body.password) {
        res.json({ success: false, message: 'Authentication failed. Wrong password.' });
      } else {

        // if user is found and password is right
        // create a token with only our given payload
        // we don't want to pass in the entire user since that has the password
        const payload = {
          admin: user.admin
        };
        var token = jwt.sign(payload, 'secret', {
          expiresIn: 1440
        });

        // return the information including token as JSON
        res.json({
          success: true,
          message: 'Enjoy your token!',
          token: token,
          email: user.email
        });
      }
    }

  });
});

module.exports = router;
