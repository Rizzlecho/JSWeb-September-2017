module.exports = {
    development: {
        port: process.env.PORT || 5000,
        dbPath: 'mongodb://localhost:27017/demo-server-db',
        useDb: false,
        storage: 'memory'
    },
    production: {}
};