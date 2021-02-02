const { QueryTypes } = require("sequelize");
const { db, cleanTable, getAllResources } = require("../database");
const { insertNewContact } = require("../models/contacts-repository");
const { insertNewPreference } = require("../models/preferences-repository");


async function clean() {
    cleanTable('contacts');
    cleanTable('preferences');
}

async function insertPreferences(contacts_id, preferences) {
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
        cities_id,
        contact_name: req.body.contact_name,
        contact_email: req.body.contact_email,
        contact_adress: req.body.adress,
        contact_phone: req.body.contact_phone,
    };

    const preferences = req.body.preferences;

    try {
        const contacts_id = await insertNewContact(contact);
        await insertPreferences(contacts_id, preferences);
        res.status(201).json({ id: contacts_id });

    } catch (e) {
        res.status(500).json({ message: e.message });
    }
}

async function listAll(req, res) {
    const contacts = await getAllResources('contacts');
    res.json({ contacts }).status(200);
}


module.exports = {
    clean,
    create,
    listAll
}