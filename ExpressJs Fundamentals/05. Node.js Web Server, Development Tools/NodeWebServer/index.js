const http = require('http');
const url = require('url');
const faviconHandler = require('./handlers/favicon-handler');
const homeHandler = require('./handlers/home-handler');
const staticHandler = require('./handlers/static-file-handler');
const port = 1337;


http
    .createServer((req, res) => {
        req.path = url.parse(req.url).pathname;
        let handlers = [homeHandler, faviconHandler, staticHandler];
        for (let i = 0; i < handlers.length; i++) {
            let handler = handlers[i];
            let result = handler(req,res);
            if(!result){
                break;
            }
        }

    }).listen(port);

console.log(`Server is listening on port ${port}`);
