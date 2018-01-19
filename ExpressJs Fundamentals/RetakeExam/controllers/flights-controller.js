const Flight = require('mongoose').model('Flight');
const Seat = require('mongoose').model('Seat');

module.exports = {
    getFlightDetails: async (req, res) => {
        let flightId = req.params.id;

        let flight = await Flight.findOne({_id: flightId}).populate('flight');
        let seats = await Seat.find({flightId: req.params.id}).populate('seat');

        res.render('details/details', {flight, seats});

    },


    createSeatPost: (req, res) => {
        let flightId = req.params.id;

        let seat = {
            price: req.body.price,
            type: req.body.type,
            ticketCounter: req.body.ticketCounter,
            flightId: flightId,
        };


        Seat.create(seat, function (err, seat) {
            if (err) {
                console.log(err);
                return;
            }

            res.redirect('/details/' + flightId);
        })
    }


};
