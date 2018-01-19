module.exports = {
    development: {
        port: process.env.PORT || 3002,
        dbPath: 'mongodb://localhost:27017/retake-exam'
    },
    production: {}
};