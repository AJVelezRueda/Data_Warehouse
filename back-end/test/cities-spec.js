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
        return regions_id;
    }

    async function foundACountry(regions_id) {
        const {
            body: { id: countries_id }
        } = await withToken(agent.post('/countries'))
            .send({
                name: 'Argentina',
                regions_id: regions_id,
            });

        return countries_id;
    }

    describe('GET /cities', () => {
        it('should return an empty list of all cities', async() => {
            const result = await withToken(agent.get('/cities'));
            assert.equal(result.status, 200);
            assert.deepEqual(result.body, { cities: [] });
        });
    });


    describe('POST /cities', () => {
        it('should return a 201 status after posting a city', async() => {
            const regions_id = await foundARegion();
            const countries_id = await foundACountry(regions_id);

            const result = await withToken(agent.post('/cities'))
                .send({
                    name: 'Bacare caca',
                    countries_id: countries_id,
                });

            assert.isNotNull(result.body.id);
        });
    });


    describe('GET /cities/:id', () => {
        it('should return an object city', async() => {
            const regions_id = await foundARegion();
            const countries_id = await foundACountry(regions_id);

            const result = await withToken(agent.post('/cities'))
                .send({
                    name: 'Bacare caca',
                    countries_id: countries_id,
                });

            assert.isNotNull(result.body.id);

            const res = await withToken(agent.get('/cities/1'));
            assert.equal(res.status, 200);
            assert.deepEqual(res.body, {
                name: 'Bacare caca',
                countries_id: 1,
                countries_name: 'Argentina'
            });
        });
    });


    describe('DELETE /cities/:id', () => {
        it('should return 200 status after deleting a city', async() => {
            const regions_id = await foundARegion();
            const countries_id = await foundACountry(regions_id);

            const result = await withToken(agent.post('/cities'))
                .send({
                    name: 'Bacare caca',
                    countries_id: countries_id,
                });

            assert.isNotNull(result.body.id);

            const res = await withToken(agent.delete(`/cities/1`));
            assert.equal(res.status, 200);


            const resultGet = await withToken(agent.get('/cities/1'));
            assert.equal(resultGet.status, 404);
        });
    });
});