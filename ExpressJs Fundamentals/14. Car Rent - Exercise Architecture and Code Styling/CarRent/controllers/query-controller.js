const Car = require('mongoose').model('Car');

module.exports = {
    queryAll: (req, res) => {
        let page = Number(req.query.page);
        let prevPage = page-1;
        let nextPage = page+1;

        Car.find({}).where('rented').equals(false).sort('-creationDate').skip(page*3).limit(3).then((data) => {
            if(prevPage<0){
                prevPage=0;
            }

            let page = {
                prevPage,
                nextPage
            };
            res.render('query/viewAll', {data, page})
        });
    },
};