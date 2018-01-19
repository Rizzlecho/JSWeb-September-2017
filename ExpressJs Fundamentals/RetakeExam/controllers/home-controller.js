const Flight = require('mongoose').model('Flight');

module.exports = {
    index: (req, res) => {
        Flight.find({}).then((flights) => {
            let allPublicFlights = [];
            let allFlights = [];


            for (let flight of flights) {
                if (flight.publicFlag) {
                    allPublicFlights.push(flight);
                }
                else if (flight.publicFlag === false) {
                    allFlights.push(flight);
                }
            }
            res.render('home/index', {allPublicFlights: allPublicFlights, allFlights: allFlights});
        })

    },

};