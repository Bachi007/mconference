var bookingsModal = require('../modal/booking');

getHisotry = (request, callback) => {

    bookingsModal.find(request, function (err, docs) {
        if (err) {
            var errorMsg = "error: " + err.message;

            //response.status(500).send(err); 
            callback({
                'status': false,
                'data': err
            });

        } else {
            //response.status(200).end();
            // console.log()
            console.log("inside", docs);
            callback({
                'status': true,
                'data': docs
            });
        }
    });
}
cancelHistory = (request, callback) => {

    bookingsModal.deleteOne(request, function (err, docs) {
        if (err) {
            var errorMsg = "error: " + err.message;

            //response.status(500).send(err); 
            callback({
                'status': false,
                'data': err
            });

        } else {
            //response.status(200).end();
            // console.log()
            console.log("inside", docs);
            callback({
                'status': true,
                'data': docs
            });
        }
    });
}

module.exports = {
    getHisotry: getHisotry,
    cancelHistory: cancelHistory
}