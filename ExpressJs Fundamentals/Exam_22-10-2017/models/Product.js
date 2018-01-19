const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    category: {type: mongoose.Schema.Types.String, required: true},
    size: {type: mongoose.Schema.Types.Number, required: true},
    imageUrl: {type: mongoose.Schema.Types.String, required: true},
    toppings: [{type: mongoose.Schema.Types.String, default: []}]
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;