const mongoose = require('mongoose');


// Adding Rooms Schema DataModal
const BookingSchema = mongoose.Schema({
    hostName: {
        type: String,
        required: true
    },
    hostEmail: {
        type: String,
        required: true
    },
    roomName: {
        type: String,
        required: true
    },
    floor: {
        type: String,
        required: true
    },
    attendees: {
        type: Array,
        required: true
    },
    Agenda: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    Date: {
        type: String,
        required: true
    },
    startTime: {
        type: String,
        required: true
    },
    endTime: {
        type: String,
        required: true
    }
});

const Bookings = module.exports = mongoose.model('Bookings', BookingSchema);