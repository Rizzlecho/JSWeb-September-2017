const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;
const schemaType = mongoose.Schema.Types;

const keyChain = new mongoose.Schema({
    order: {type:ObjectId, ref: 'Product',required: true},
    creator: {type: ObjectId, ref:'User',required: true},
    orderDate: {type: schemaType.Date, required:true},
    toppings: {type:schemaType.String, required: true}
});


const KeyChain = mongoose.model('KeyChain', keyChain);

module.exports = KeyChain;
