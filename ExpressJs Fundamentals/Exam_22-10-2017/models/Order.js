const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    creator: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    product: {type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true},
    selectedToppings: [{type: mongoose.Schema.Types.String, default: []}],
    status: {type: mongoose.Schema.Types.String, default: 'Pending'},
    date: {type: String, required: true}
});

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;