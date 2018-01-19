const Product = require('mongoose').model('Product');
const Order = require('mongoose').model('Order');


module.exports = {
    getCreateProduct: (req, res) => {
        res.render('admin/create-product');
    },
    createProduct: (req, res) => {
        let toppings = toppingsArray(req.body.toppingsString);

        if (req.body.size < 17 || req.body.size > 24) {
            errorHandler('Size must be between 17 and 24');
            return;
        }
        let product = {
            category: req.body.category,
            size: Number(req.body.size),
            imageUrl: req.body.imageUrl,
            toppings: toppings
        };

        function errorHandler(e) {
            console.log(e);
            res.locals.globalError = e;
            res.render('admin/create-product');
        }

        Product.create(product, function (err, product) {
            if (err) {
                console.log(err);
                return;
            }

            res.redirect('/');
        })
    },

    deleteProduct: (req, res) => {
        Product.remove({ _id: req.params.id }, function(err) {
            if (!err) {
                res.redirect('/');
            }
            else {
                console.log(err);
            }
        })

    },

    getAllOrders: (req, res) => {
        Order.find({}).populate('product').then((orders) => {
            // console.log(orders);

            for (let order of orders) {
                getStatus(order)
            }

            res.render('admin/order-status-admin', {orders})
        })
    },

    saveAll: (req, res) => {
        // Order.find({
        //     '_id': { $in: req.body.orderId }
        // }, function (err, orders) {
        //     for (let i = 0; i < orders.length; i++) {
        //         orders[i].status = req.body.status[i]
        //     }
        //     console.log(orders);
        //
        //     let promises = [];
        //
        //     for (let order of orders) {
        //         promises.push(order.save())
        //     }
        //
        //     Promise.all(promises).then(() => {
        //         res.redirect('/allOrders')
        //     }).catch((err) => {
        //         console.log(err)
        //     })
        // })
    },

};

function toppingsArray(toppings) {
    if (!toppings) {
        return [];
    }

    if (typeof toppings === 'string') {
        let toppingsArgs = toppings.split(',');
        let toppingsArray = [];

        for (let obj of toppingsArgs) {
            toppingsArray.push(obj);
        }

        return toppingsArray;
    }

    return toppings;
}

function getStatus(order) {
    if (order.status === 'Pending') {
        order.pending = true
    } else if (order.status === 'In Progress') {
        order.inProgress = true
    } else if (order.status === 'In transit') {
        order.inTransit = true
    } else if (order.status === 'Delivered') {
        order.delivered = true
    }
}