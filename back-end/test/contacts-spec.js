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

const { withToken, signup } = require("./setup");

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

    beforeEach(async() => await signup(agent));


    describe('GET /contacts', () => {
        it('should return an empty list of all contacts', async() => {
            const result = await withToken(agent.get('/contacts'));
            assert.equal(result.status, 200);
            assert.deepEqual(result.body, { contacts: [] });
        });
    });

    async function foundACity() {
        const { body: { id: regions_id } } = await withToken(agent.post('/regions')).send({
            name: "Latam"
        });

        const res = await withToken(agent.post('/countries'))
            .send({
                name: 'Argentina',
                regions_id: regions_id,
            });

        const result = await withToken(agent.post('/cities'))
            .send({
                name: 'Bacare caca',
                countries_id: res.body.id,
            });

        const cities_id = result.body.id;
        return cities_id;
    };


    async function createAContact() {
        const cities_id = await foundACity();

        const { body: { id: contacts_id } } = await withToken(agent.post('/contacts'))
            .send({
                preferences: [{ channel: 'Whatsapp', intrest: 70 }],
                contact_name: "Lola Mora",
                cities_id: cities_id,
                contact_email: "laLola@gmail.com",
                contact_adress: "calle falsa 1234",
                contact_phone: "2222515442",
            });

        return contacts_id;
    }


    describe('POST /contacts', () => {
        it('should return a 201 status after posting a contact', async() => {
            const cities_id = await foundACity();

            const result = await withToken(agent.post('/contacts'))
                .send({
                    preferences: [{ channel: 'Whatsapp', intrest: 70 }],
                    contact_name: "Lola Mora",
                    cities_id: cities_id,
                    contact_email: "laLola@gmail.com",
                    contact_adress: "calle falsa 1234",
                    contact_phone: "2222515442",
                });

            assert.isNotNull(result.body.id);
            assert.equal(result.status, 201);
        });
    });

    describe('GET /contacts/:id', () => {
        it('should return an object ccontact', async() => {
            const cities_id = await foundACity();

            const result = await withToken(agent.post('/contacts'))
                .send({
                    preferences: [{ channel: 'Whatsapp', intrest: 70 }],
                    contact_name: "Lola Mora",
                    cities_id: cities_id,
                    contact_email: "laLola@gmail.com",
                    contact_adress: "calle falsa 1234",
                    contact_phone: "2222515442",
                });

            assert.isNotNull(result.body.id);

            const res = await withToken(agent.get('/contacts/1'));
            assert.equal(res.status, 200);
            assert.deepEqual(res.body, {
                preferences: [{ contacts_id: 1, intrest: 70, channel: 'Whatsapp' }],
                contact_name: "Lola Mora",
                cities_id: cities_id,
                contact_email: "laLola@gmail.com",
                contact_adress: "calle falsa 1234",
                contact_phone: "2222515442",
            });
        });
    });

    describe('DELETE /contacts/:id', () => {
        it('should return 200 status after deleting a city', async() => {
            const cities_id = await foundACity();

            const result = await withToken(agent.post('/contacts'))
                .send({
                    preferences: [{ channel: 'Whatsapp', intrest: 70 }],
                    contact_name: "Lola Mora",
                    cities_id: cities_id,
                    contact_email: "laLola@gmail.com",
                    contact_adress: "calle falsa 1234",
                    contact_phone: "2222515442",
                });

            assert.isNotNull(result.body.id);
            const res = await withToken(agent.delete(`/contacts/1`));
            assert.equal(res.status, 200);
        });
    });

});