const mongoose = require('mongoose');

const seatSchema = new mongoose.Schema({
    price: {type: mongoose.Schema.Types.Number, required: true},
    type: {type: mongoose.Schema.Types.String, required: true},
    ticketCounter: {type: mongoose.Schema.Types.Number, required: true},
    flightId: {type: mongoose.Schema.Types.String, required: true},
});

const Seat = mongoose.model('Seat', seatSchema);
module.exports = Seat;