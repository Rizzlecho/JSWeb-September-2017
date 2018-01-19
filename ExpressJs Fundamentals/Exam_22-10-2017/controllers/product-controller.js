const Product = require('mongoose').model('Product');
const Order = require('mongoose').model('Order');

module.exports = {
    getOrder: (req, res) => {
        let id = req.params.id;

        Product.findById(id, function (err, product) {
            if (err) {
                console.log(err);
                return;
            }
            res.render('product/customize-order', {product: product});
        })
    },

    postOrder: (req, res) => {
        let userId = req.user._id;
        let productId = req.params.id;

        let toppings = getToppings(req.body);

        let order = {
            creator: userId,
            product: productId,
            selectedToppings: toppings,
            date: new Date().toUTCString().split(',')[1].split('GMT')[0]
        };

        Order.create(order, function (err, order) {
            if (err) {
                console.log(err);
                return;
            }

            res.redirect(`/details/${order._id}`);

        })
    },
    myOrders: (req, res) => {
        let currentUserId = req.user._id;

        Order.find({creator: currentUserId}).populate('product').then((orders) => {
            res.render('product/order-status-user', {orders})
        })
    },
    orderDetails: (req, res) => {
        let orderId = req.params.id;

        Order.findOne({_id: orderId}).populate('product').then((order) => {

            // order = 'Pending';

            res.render('product/order-details', {order});
        })
    }
};

function getToppings(list) {
    let toppingsArray = [];

    for (let topping in list) {
        toppingsArray.push(topping);
    }

    return toppingsArray;
}
