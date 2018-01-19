const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;
const schemaType = mongoose.Schema.Types;

const keyChain = new mongoose.Schema({
    car: {type:ObjectId, ref: 'Car',require: true},
    renter: {type: ObjectId, ref:'User',required: true},
    rentDate: {type: Date, required:true},
    days: {type:Number, required: true}
});


const KeyChain = mongoose.model('KeyChain', keyChain);

module.exports = KeyChain;
