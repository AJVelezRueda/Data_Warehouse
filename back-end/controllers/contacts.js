const { QueryTypes } = require("sequelize");
const { db, cleanTable, getAllResources } = require("../database");
const { insertNewContact, getCtactsByID } = require("../models/contacts-repository");
const { insertNewPreference } = require("../models/preferences-repository");


async function clean() {
    await cleanTable('contacts');
    await cleanTable('preferences');
}

async function insertPreferences(contacts_id, preferences) {
    console.log('insertando preferencias');
    for (let preference of preferences) {
        const newPreference = {
            intrest: preference.intrest,
            channel: preference.channel,
            contacts_id
        };

        await insertNewPreference(newPreference);
    }
}

async function create(req, res) {
    const contact = {
        cities_id: req.body.cities_id,
        contact_name: req.body.contact_name,
        contact_email: req.body.contact_email,
        contact_adress: req.body.contact_adress,
        contact_phone: req.body.contact_phone,
    };

    const preferences = req.body.preferences;
    try {
        const contacts_id = await insertNewContact(contact);
        await insertPreferences(contacts_id, preferences);
        res.status(201).json({ id: contacts_id });
    } catch (e) {
        res.json({ message: e.message }).status(500);
    }
}

async function listAll(req, res) {
    const contacts = await getAllResources('contacts');
    res.status(200).json({ contacts });
}

async function get(req, res) {
    const country = await getCtactsByID(Number(req.params.id))

    res.json(country).status(200);
}

module.exports = {
    clean,
    create,
    listAll,
    get
}