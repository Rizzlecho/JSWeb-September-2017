const mongoose = require('mongoose');

const flightSchema = new mongoose.Schema({
    destination: {type: mongoose.Schema.Types.String, required: true},
    origin: {type: mongoose.Schema.Types.String, required: true},
    date: {type: mongoose.Schema.Types.String, required: true},
    time: {type: mongoose.Schema.Types.String, required: true},
    imageUrl: {type: mongoose.Schema.Types.String, required: true},
    publicFlag: {type: mongoose.Schema.Types.Bool, default: false}
});

const Flight = mongoose.model('Flight', flightSchema);
module.exports = Flight;