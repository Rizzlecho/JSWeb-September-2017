const controllers = require('../controllers');
const restrictedPages = require('./auth');

module.exports = app => {
    // app.get('/', controllers.home.index);
    app.get('/', controllers.query.queryAll);
    // app.get('/about', restrictedPages.hasRole('Admin'), controllers.home.about);
    app.get('/register', controllers.user.registerGet);
    app.post('/register', controllers.user.registerPost);
    app.post('/logout', controllers.user.logout);
    app.get('/login', controllers.user.loginGet);
    app.post('/login', controllers.user.loginPost);


    // Profile
    app.get('/userProfile/:id', controllers.user.getProfile);

    // Admin func
    app.get('/createProduct', restrictedPages.hasRole('Admin'), controllers.admin.createProductView);
    app.post('/createProduct', restrictedPages.hasRole('Admin'), controllers.admin.createProduct);

    // Query func
    // app.get('/', controllers.query.queryAll);

    // Customize order {Rent} logic
    app.get('/customize/:id', controllers.rent.customizeOrder);
    app.post('/rent/:id', controllers.rent.rentCar);


    app.all('*', (req, res) => {
        res.status(404);
        res.send('404 Not Found');
        res.end();
    });
};