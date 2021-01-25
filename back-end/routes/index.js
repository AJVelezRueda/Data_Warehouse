const user = require('../controllers/user');
const session = require('../controllers/session');

const { filterAdmin } = require("./authentication.js");


function routes(app) {
    app.get('/users', user.listAll, filterAdmin)
    app.get('/users/:id', user.get);
    app.post('/users', user.create);

    app.put('/users/:id', user.update);
    app.delete('/users/:id', user.remove, filterAdmin);

    app.post('/login', session.login);
}

module.exports = routes;