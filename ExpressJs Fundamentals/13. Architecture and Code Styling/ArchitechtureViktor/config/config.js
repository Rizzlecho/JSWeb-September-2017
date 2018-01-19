module.exports = {
    development: {
        port: process.env.PORT || 5555,
        dbPath: 'mongodb://localhost:27017/demo-server-db'
    },
    production: {}
};