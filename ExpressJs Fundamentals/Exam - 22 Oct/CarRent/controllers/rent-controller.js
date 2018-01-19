const Product = require('mongoose').model('Product');
const User = require('mongoose').model('User');
const KeyChain = require('mongoose').model('KeyChain');

module.exports = {
    customizeOrder: (req, res) => {
        // console.log(req.params);
        let id = req.params.id;
        Product.findById(id).then((product) => {
            res.render('rent/customize', {product});
            let topData = product.toppings[0].split(',').map(x=>x.replace(/ /g,''));

            for (let pr of topData) {
                console.log(pr);
            }
        });

        // let topArray = [];
        // topArray.push(product.toppings[0].split(', '));
        // console.log(topArray);

    },
    rentCar: (req, res) => {
        let userId = req.user.id;
        let id = req.params.id;
        let days = Number(req.body.days);

        Product.findById(id).then((car) => {
            car.save().then(() => {
                User.findById(userId).then((user) => {
                    let keyObj = {
                        car: car._id,
                        renter: user._id,
                        rentDate: Date.now(),
                        days: days
                    };

                    KeyChain.create(keyObj).then(() => {
                        res.redirect('/viewAll')
                    });

                })
            })
        })
    }
};