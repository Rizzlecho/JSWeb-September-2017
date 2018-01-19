module.exports = {
    index: (req, res) => {
        res.render('home/index');

    },
    queryAll: (req, res) => {
        Product.find({}).then((data) => {
            let beef = [];
            let chicken = [];
            let lamb = [];

            for (let p of data) {
                if(p.category === 'beef'){
                    beef.push(p)
                }

                else if(p.category === 'chicken'){
                    chicken.push(p)
                }

                else if(p.category === 'lamb'){
                    lamb.push(p)
                }
            }
            res.render('home/index', {beef , chicken, lamb})
        });
    },
};