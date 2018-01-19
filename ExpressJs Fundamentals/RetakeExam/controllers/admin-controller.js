const Flight = require('mongoose').model('Flight');

module.exports = {
    getAddFlight: (req, res) => {
        res.render('admin/add');
    },
    addFlightPost: (req, res) => {
        let date = req.body.date;

        let flight = {
            destination: req.body.destination,
            origin: req.body.origin,
            date: date,
            time: req.body.time,
            imageUrl: req.body.imageUrl,
        };

        function errorHandler(e) {
            console.log(e);
            res.locals.globalError = e;
            res.render('admin/add');
        }

        Flight.create(flight, function (err, flight) {
            if (err) {
                console.log(err);
                return;
            }

            res.redirect('/');
        })
    },

    getEditFlight: (req, res) => {
        let flightId = req.params.id;

        Flight.findOne({_id: flightId}).populate('flight').then((flight) => {

            res.render('admin/edit', {flight})
        });
    },

    editFlightPost: (req, res) => {
        let flightId = req.params.id;

        let flight = {
            destination: req.body.destination,
            origin: req.body.origin,
            date: req.body.date,
            time: req.body.time,
            imageUrl: req.body.imageUrl,
        };


        Flight.findByIdAndUpdate({_id: flightId},flight, function (err, flight) {
            if (err) {
                console.log(err);
                return;
            }


            res.redirect('/');
        })
    },

    publishFlightPost: (req, res) => {
        let flightId = req.params.id;

        Flight.findByIdAndUpdate({_id: flightId},{'publicFlag': 'true'}, function (err) {
            if (err) {
                console.log(err);
                return;
            }

            res.redirect('/');
        })
    },


};
