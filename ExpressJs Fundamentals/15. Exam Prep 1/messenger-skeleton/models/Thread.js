const mongoose = require('mongoose');

let threadSchema = new mongoose.Schema({
    users: [{ type: mongoose.Schema.Types.String, required: true }],
    dataCreated: { type: mongoose.Schema.Types.Date, default: Date.now }
});

module.exports = mongoose.model('Thread', threadSchema);
