const homeHandler = require('./homeHandler');
const staticHandler = require('./staticHandler');
const movieHandler = require('./movieHandler');
const viewAllHandler = require('./viewAllHandler');
const detailsHandler = require('./detailsHandler');

module.exports = [homeHandler, movieHandler, viewAllHandler, detailsHandler, staticHandler];
