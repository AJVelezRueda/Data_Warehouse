process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');
const assert = chai.assert;
const countries = require('../controllers/countries');
const regions = require('../controllers/regions');
chai.use(chaiHttp);

const { withToken, signup } = require("./setup");

const agent = chai.request.agent(server);

describe('Countries', () => {
    beforeEach(async() => await countries.clean());
    afterEach(async() => await countries.clean());
    beforeEach(async() => await regions.clean());
    afterEach(async() => await regions.clean());

    beforeEach(async() => await signup(agent));

    async function foundARegion() {
        const { body: { id: regions_id } } = await withToken(agent.post('/regions')).send({
            name: "Latam"
        });
        return { regions_id };
    }

    describe('GET /countries', () => {
        it('should return a list of all countries', async() => {
            const result = await withToken(agent.get('/countries'))
            assert.equal(result.status, 200);
            assert.deepEqual(result.body, { countries: [] });
        });
    });

    describe('POST /countries', () => {
        it('should return a list of all countries', async() => {
            const { regions_id } = await foundARegion();

            const result = await withToken(agent.post('/countries'))
                .send({
                    name: 'Argentina',
                    regions_id: regions_id,
                });
            assert.isNotNull(result.body.id);
            assert.deepEqual(result.status, 201);
        });
    });

    describe('GET /countries/:id', () => {
        it('should return an object country', async() => {
            const { regions_id } = await foundARegion();

            const result = await withToken(agent.post('/countries'))
                .send({
                    name: 'Argentina',
                    regions_id: regions_id,
                });

            const res = await withToken(agent.get('/countries/1'))
            assert.equal(res.status, 200);
            assert.deepEqual(res.body, {
                name: 'Argentina',
                region_id: 1,
                region_name: 'Latam'
            });
        });
    });

});