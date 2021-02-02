process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');
const assert = chai.assert;
const regions = require('../controllers/regions');
const countries = require('../controllers/countries');
const cities = require('../controllers/cities');
const contact = require('../controllers/contacts');
chai.use(chaiHttp);

const { withToken, getToken, signup, getcontactId } = require("./setup");

const agent = chai.request.agent(server);


describe('contacts', () => {
    beforeEach(async() => await contact.clean());
    afterEach(async() => await contact.clean());

    beforeEach(async() => await regions.clean());
    afterEach(async() => await regions.clean());

    beforeEach(async() => await countries.clean());
    afterEach(async() => await countries.clean());

    beforeEach(async() => await cities.clean());
    afterEach(async() => await cities.clean());


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


    async function foundACity() {
        const regions_id = await foundARegion();
        const countries_id = foundACountry(regions_id);

        const {
            body: { id: cities_id }
        } = await withToken(agent.post('/cities'))
            .send({
                name: 'Bacare caca',
                countries_id: countries_id,
            });

        return cities_id;
    }

    describe('GET /contacts', () => {
        it('should return an empty list of all contacts', async() => {
            const result = await withToken(agent.get('/contacts'));
            assert.equal(result.status, 200);
            assert.deepEqual(result.body, { contacts: [] });
        });
    });


    describe('POST /contacts', () => {
        it('should return a 201 status after posting a contact', async() => {
            const regions_id = await foundARegion();
            const countries_id = await foundACountry(regions_id);
            const cities_id = await foundACity(countries_id);

            const result = await withToken(agent.post('/contacts'))
                .send({
                    preferences: [{ channel: 'Whatsapp', intrest: 70 }],
                    contact_name: "Lola Mora",
                    cities_id,
                    contact_email: "laLola@gmail.com",
                    contact_adress: "calle falsa 1234",
                    contact_phone: "2222515442",
                });

            assert.isNotNull(result.body.id);
            assert.equal(result.status, 201);
        });
    });



});