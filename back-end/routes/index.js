const cors = require('cors')
const user = require('../controllers/user');
const session = require('../controllers/session');
const regions = require('../controllers/regions');
const countries = require('../controllers/countries');
const cities = require('../controllers/cities');
const contacts = require('../controllers/contacts');
const { filterAdmin } = require("./authentication.js");


function routes(app) {
    app.get('/users', user.listAll, filterAdmin);
    app.get('/users/:id', user.get);
    app.post('/users', user.create);

    app.put('/users/:id', user.update);
    app.delete('/users/:id', user.remove, filterAdmin, cors());

    app.get('/regions', regions.listAll, filterAdmin);
    app.get('/regions/:id', regions.get, filterAdmin);
    app.post('/regions', regions.create, filterAdmin);

    app.delete('/regions/:id', regions.remove, filterAdmin, cors());

    app.get('/countries', countries.listAll, filterAdmin);
    app.get('/countries/:id', countries.get, filterAdmin);
    app.post('/countries', countries.create, filterAdmin);

    app.delete('/countries/:id', countries.remove, filterAdmin, cors());

    app.get('/cities', cities.listAll, filterAdmin);
    app.post('/cities', cities.create, filterAdmin);
    app.get('/cities/:id', cities.get, filterAdmin);

    app.delete('/cities/:id', cities.remove, filterAdmin);

    app.post('/contacts', contacts.create, filterAdmin);
    app.get('/contacts', contacts.listAll, filterAdmin);
    app.get('/contacts/:id', contacts.get, filterAdmin);

    app.delete('/contacts/:id', contacts.remove, filterAdmin, cors());

    app.post('/login', session.login);
}

module.exports = routes;