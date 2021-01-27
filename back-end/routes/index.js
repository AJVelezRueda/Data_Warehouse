const user = require('../controllers/user');
const session = require('../controllers/session');
const regions = require('../controllers/regions');
const countries = require('../controllers/countries');
const { filterAdmin } = require("./authentication.js");


function routes(app) {
    app.get('/users', user.listAll, filterAdmin);
    app.get('/users/:id', user.get);
    app.post('/users', user.create);

    app.put('/users/:id', user.update);
    app.delete('/users/:id', user.remove, filterAdmin);

    app.get('/regions', regions.listAll, filterAdmin);
    app.post('/regions', regions.create, filterAdmin);

    app.get('/countries', countries.listAll, filterAdmin);

    app.post('/login', session.login);
}

module.exports = routes;