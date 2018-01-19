const controllers = require('../controllers');
const currentlyLogged = require('./auth');

module.exports = app => {

    app.get('/', controllers.home.index);

    // Auth
    app.get('/register', controllers.user.registerGet);
    app.post('/register', controllers.user.registerPost);
    app.get('/logout', controllers.user.logout);
    app.get('/login', controllers.user.loginGet);
    app.post('/login', controllers.user.loginPost);

    // Create product
    app.get('/createProduct', currentlyLogged.hasRole('Admin'), controllers.admin.getCreateProduct);
    app.post('/createProduct', currentlyLogged.hasRole('Admin'), controllers.admin.createProduct);

    //Delete product
    app.get('/delete/:id', currentlyLogged.hasRole('Admin'), controllers.admin.deleteProduct);

    // Order
    app.get('/order/:id', currentlyLogged.isAuthed, controllers.product.getOrder);
    app.post('/order/:id', currentlyLogged.isAuthed, controllers.product.postOrder);

    // My Orders
    app.get('/myOrders', currentlyLogged.isAuthed, controllers.product.getMyOrders);

    // Details
    app.get('/order/details/:id', currentlyLogged.isAuthed, controllers.product.getOrderDetails);

    // All Orders
    app.get('/allOrders', currentlyLogged.hasRole('Admin'), controllers.admin.getAllOrders);
    app.post('/allOrders', currentlyLogged.hasRole('Admin'), controllers.admin.saveAll);


    app.all('*', (req, res) => {
        res.status(404);
        res.send('404 Not Found');
        res.end();
    })
};