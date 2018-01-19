module.exports = {
    development: {
        port: process.env.PORT || 3004,
        dbPath: 'mongodb://localhost:27017/demo-server-db'
    },
    production: {}
};