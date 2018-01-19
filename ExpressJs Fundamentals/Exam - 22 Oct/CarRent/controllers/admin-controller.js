const Product = require('mongoose').model('Product');

module.exports = {
    createProductView: (req, res) => {  //addCarView
        res.render('adminPanel/createProductView');
    },
    createProduct:(req,res)=> {
        let productData = req.body;
        console.log(productData);

        if(req.body.size < 17 || req.body.size > 24) {
            errorHandler('Size must be between 17 and 24');
        }

        let objForCreation = {
            category: productData.category,
            size: productData.size,
            image: productData.imageUrl,
            toppings:productData.toppings // TOPPINGS FROM ARRAY
        };

        Product.create(objForCreation).then((d)=> {
            console.log(d);
            res.redirect('/')
        });

        function errorHandler(e) {
            console.log(e);
            res.locals.globalError = e;
            res.render('adminPanel/createProductView');
        }
    }


};