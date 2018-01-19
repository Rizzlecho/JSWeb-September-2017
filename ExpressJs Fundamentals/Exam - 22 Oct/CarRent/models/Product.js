const mongoose = require('mongoose');
const schemaType = mongoose.Schema.Types;

const productSchema = new mongoose.Schema({
    category: {type: schemaType.String},
    size: {type: schemaType.Number, required: true},
    image: {type: schemaType.String, required: true},
    toppings: [{type: schemaType.String, required: true}]
});


const Product = mongoose.model('Product', productSchema);

module.exports = Product;
