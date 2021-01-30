process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');
const assert = chai.assert;
const regions = require('../controllers/regions');
const countries = require('../controllers/countries');
const cities = require('../controllers/cities');
chai.use(chaiHttp);

const { withToken, signup } = require("./setup");

const agent = chai.request.agent(server);

describe('Countries', () => {
    beforeEach(async() => await regions.clean());
    afterEach(async() => await regions.clean());

    beforeEach(async() => await countries.clean());
    afterEach(async() => await countries.clean());

    beforeEach(async() => await cities.clean());
    afterEach(async() => await cities.clean());

    beforeEach(async() => await signup(agent));

    async function foundARegion() {
        const { body: { id: regions_id } } = await withToken(agent.post('/regions')).send({
            name: "Latam"
        });
        return { regions_id };
    }



    describe('POST /cities', () => {
        it('should return a 201 status after posting a city', async() => {
            const { regions_id } = await foundARegion();

            const {
                body: { id: countries_id }
            } = await withToken(agent.post('/countries'))
                .send({
                    name: 'Argentina',
                    regions_id: regions_id,
                });

            const result = await withToken(agent.post('/cities'))
                .send({
                    name: 'Bacare caca',
                    countries_id: countries_id,
                });

            assert.isNotNull(result.body.id);

            assert.deepEqual(result.status, 201);
        });
    });
});