const controllers = require('../controllers');
const authCheck = require('../util/auth-check');

module.exports = (app, endpoints) => {
    /*
    for (let controller in controllers.custom) {
        // TODO provide generic controller with validation from config
        app.get('/' + controller, controllers.custom[controller].get);
        app.post('/' + controller, controllers.custom[controller].post);
        app.get('/' + controller + '/:id', controllers.custom[controller].getById);
        app.post('/' + controller + '/:id', controllers.custom[controller].postById);
        app.delete('/' + controller + '/:id', controllers.custom[controller].deleteById);
    }
    */

    app.post('/auth/signup', controllers.auth.signup);
    app.post('/auth/login', controllers.auth.login);

    // Handshake
    // TODO return version information and directions to request endpoint docs
    app.get('/', (req, res) => {
        res.json({ message: 'API service listening for request' });
    });

    // Trip access
    app.get('/search', controllers.trips.search);
    app.get('/trips', controllers.trips.get);
    app.get('/trips/:id', controllers.trips.getById);

    // Cart
    app.get('/cart', authCheck, controllers.cart.get);
    app.post('/cart', authCheck, controllers.cart.post);
    app.delete('/cart/:id', authCheck, controllers.cart.deleteById);
    app.post('/cart/checkout', authCheck, controllers.cart.checkout);
    app.get('/cart/history', authCheck, controllers.cart.history);

    // 404
    app.all('*', (req, res) => {
        res.status(404);
        res.end('404 Not Found');
    });

    /*
    app.get('*', (req, res) => {
        res.end('./static/index.html');
    });
    */
};