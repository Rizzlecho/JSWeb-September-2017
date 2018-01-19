const Order = require('mongoose').model('Order');
const Product = require('mongoose').model('Product');

function toppingsArray(toppings) {
    if (!toppings){
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
module.exports = {
    getCreateProduct: (req, res) => {
        res.render('admin/create-product');
    },
    createProduct: (req, res) => {
        let toppings = toppingsArray(req.body.toppingsString);

        if(req.body.size < 17 || req.body.size > 24) {
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
    getAllOrders: (reg, res) => {

        Order.find({}).populate('product').then((orders) => {
            // orders['pending']
            res.render('admin/order-status-admin', {orders:orders});
        })
    },
    saveAll: (req,res) => {
        let newStatus = req.body.status;
        Order.findById(req.body.orderId).then((status)=> {
            status.status = newStatus;
            status.save().then(() =>{
                res.redirect('/allOrders');
                console.log(status.status);
            })
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

    }
};