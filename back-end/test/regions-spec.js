process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');
const assert = chai.assert;
const regions = require('../controllers/regions');
chai.use(chaiHttp);

const { withToken, signup } = require("./setup");

const agent = chai.request.agent(server);

describe('Regions', () => {
    beforeEach(async() => await regions.clean());
    afterEach(async() => await regions.clean());

    beforeEach(async() => await signup(agent));

    describe('GET /regions', () => {
        it('should return a list of all regions', async() => {
            const result = await withToken(agent.get('/regions'))
            assert.equal(result.status, 200);
            assert.deepEqual(result.body, { regions: [] });
        });
    });

    describe('POST /regions', () => {
        it('should return a region id', async() => {
            const { body } = await withToken(agent.post('/regions')).send({ name: "Latam" });

            assert.deepEqual(body, { id: 1 });
        });
    });

    describe('GET /regions/:id', () => {
        it('should return an object region', async() => {
            const { body } = await withToken(agent.post('/regions')).send({ name: "Latam" });
            const regionId = body.id;


            const res = await withToken(agent.get(`/regions/${regionId}`))

            assert.equal(res.status, 200);
            assert.deepEqual(res.body, {
                id: 1,
                name: 'Latam'
            });

        });
    });

});