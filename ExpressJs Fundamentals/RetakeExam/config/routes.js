const controllers = require('../controllers');
const currentlyLogged = require('./auth');

module.exports = app => {

    app.get('/', controllers.home.index);

    // Auth
    app.get('/register', controllers.user.registerGet);
    app.post('/register', controllers.user.registerPost);
    app.post('/logout', controllers.user.logout);
    app.get('/login', controllers.user.loginGet);
    app.post('/login', controllers.user.loginPost);

    // currentlyLogged.hasRole('Admin')

    // Add Flight
    app.get('/addFlight', currentlyLogged.hasRole('admin'), controllers.admin.getAddFlight);
    app.post('/addFlight', currentlyLogged.hasRole('admin'), controllers.admin.addFlightPost);

    // Details
    app.get('/details/:id', currentlyLogged.isAuthed, controllers.flights.getFlightDetails);
    app.post('/details/:id', currentlyLogged.hasRole('admin'), controllers.flights.createSeatPost);
    // app.post('/details/:id', currentlyLogged.hasRole('admin'), controllers.flights.publishFlightPost);

    // Edit
    app.get('/edit/:id', currentlyLogged.hasRole('admin'), controllers.admin.getEditFlight);
    app.post('/edit/:id', currentlyLogged.hasRole('admin'), controllers.admin.editFlightPost);

    // My Tickets
    app.get('/myTickets', currentlyLogged.isAuthed, controllers.user.getMyTickets);

    app.all('*', (req, res) => {
        res.status(404);
        res.send('404 Not Found');
        res.end();
    })
};