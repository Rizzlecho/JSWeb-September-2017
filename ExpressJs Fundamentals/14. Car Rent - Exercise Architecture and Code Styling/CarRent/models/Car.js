const mongoose = require('mongoose');
const schemaType = mongoose.Schema.Types;

const carSchema = new mongoose.Schema({
    mark: {type: schemaType.String, required: true},
    model: {type: schemaType.String, required: true},
    pricePerDay: {type: schemaType.Number, required: true},
    image: {type: schemaType.String, required: true},
    year: {type: schemaType.Number, required: true},
    rented: {type: schemaType.Boolean, required: true, default: false},
    creationDate: { type: schemaType.Date, default:Date.now}
});


const Car = mongoose.model('Car', carSchema);

module.exports = Car;
