const fs = require('fs');
const db = require('./../config/dataBase');
const qs = require('querystring');

let getCreationForm = (req, res) => {
    fs.readFile('./views/addMovie.html', (err, data) => {
        if (err) {
            console.log(err.message);
            return;
        }

        res.writeHead(200, {
            'content-type': 'text/html'
        });

        res.write(data);
        res.end();
    })
};

module.exports = (req, res) => {
    if (req.pathname === '/addMovie' && req.method === 'GET') {
        getCreationForm(req, res);
    }

    else if (req.pathname === '/addMovie' && req.method === 'POST') {
        let body = [];
        req.on('data', (chunk) => {
            body.push(chunk);
        }).on('end', () => {
            body = Buffer.concat(body).toString();       // at this point, `body` has
            let movieBody = qs.parse(body);              // the entire request body stored in it as a string
            let validMovieFlag = true;

            for (let prop in movieBody) {
                if (movieBody[prop] === '') {
                    validMovieFlag = false;
                }
            }

            if (validMovieFlag) {
                db.push(movieBody);
                fs.readFile('./views/addMovie.html', (err, data) => {
                    if (err) {
                        console.log(err.message);
                        return;
                    }
                    data = data.toString().replace('<div id="replaceMe">{{replaceMe}}</div>',
                        '<div id="succssesBox"><h2 id="succssesMsg">Movie Added</h2></div>');

                    res.writeHead(200, {
                        'content-type': 'text/html'
                    });

                    res.write(data);
                    res.end();
                });
            }

            else {
                fs.readFile('./views/addMovie.html', (err, data) => {
                    if (err) {
                        console.log(err.message);
                        return;
                    }
                    data = data.toString().replace('<div id="replaceMe">{{replaceMe}}</div>',
                        '<div id="errBox"><h2 id="errMsg">Please fill all fields</h2></div>');

                    res.writeHead(200, {
                        'content-type': 'text/html'
                    });

                    res.write(data);
                    res.end();
                });
            }

        });
    }

    else {
        return true;
    }
};