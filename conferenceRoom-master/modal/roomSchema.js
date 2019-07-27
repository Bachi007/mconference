const mongoose = require('mongoose');


// Adding Rooms Schema DataModal
const RoomSchema = mongoose.Schema({
    roomName: {
        type: String,
        required: true
    },
    facilities: {
        type: Array,
        required: true
    },
    floor: {
        type: Number,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    history: {
        type: Array
    }
});


const Rooms = module.exports = mongoose.model('Rooms', RoomSchema);

