module.exports = function(app) {
    app.use('/api/handleRequest', require('./handleRequest.js'));
}