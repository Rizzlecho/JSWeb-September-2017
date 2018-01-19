const controllers = require('../controllers');
const currentlyLogged = require('./auth');

module.exports = app => {

    app.get('/', controllers.home.index);

    app.get('/register', controllers.user.registerGet);
    app.post('/register', controllers.user.registerPost);
    app.get('/logout', controllers.user.logout);
    app.get('/login', controllers.user.loginGet);
    app.post('/login', controllers.user.loginPost);

    // Create product
    app.get('/createProduct', currentlyLogged.hasRole('admin'), controllers.admin.getCreateProduct);
    app.post('/createProduct', currentlyLogged.hasRole('admin'), controllers.admin.createProduct);

    // Order
    app.get('/order/:id', currentlyLogged.isAuthed, controllers.product.getOrder);
    app.post('/order/:id', currentlyLogged.isAuthed, controllers.product.postOrder);

    // All Orders
    app.get('/myOrders', currentlyLogged.isAuthed, controllers.product.myOrders);

    // Order details
    app.get('/details/:id', currentlyLogged.isAuthed, controllers.product.orderDetails);

    //Admin all orders
    app.get('/allOrders', currentlyLogged.hasRole('admin'), controllers.admin.getAllOrders);

    //Save all Orders
    app.post('/allOrders', currentlyLogged.hasRole('admin'), controllers.admin.saveAll);

    //Delete product
    app.get('/delete/:id', currentlyLogged.hasRole('admin'), controllers.admin.deleteProduct);

    app.all('*', (req, res) => {
        res.status(404);
        res.send('404 Not Found');
        res.end();
    })
};