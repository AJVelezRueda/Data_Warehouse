process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');
const assert = chai.assert;
const countries = require('../controllers/countries');
chai.use(chaiHttp);

const { withToken, signup } = require("./setup");

const agent = chai.request.agent(server);

describe('Countries', () => {
    beforeEach(async() => await countries.clean());
    afterEach(async() => await countries.clean());

    beforeEach(async() => await signup(agent));

    describe('GET /countries', () => {
        it('should return a list of all countries', async() => {
            const result = await withToken(agent.get('/countries'))
            assert.equal(result.status, 200);
            assert.deepEqual(result.body, { countries: [] });
        });
    });




});