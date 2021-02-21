const { QueryTypes } = require("sequelize");
const { db, cleanTable, getAllResources, deleteResoueceById } = require("../database");
const { insertNewContact, getContactById, updateContactData } = require("../models/contacts-repository");
const { insertNewPreference, getPreferencesByID, deletePreferencesItems } = require("../models/preferences-repository");


async function clean() {
    await cleanTable('contacts');
    await cleanTable('preferences');
}

async function deleteContactById(id) {
    await deletePreferencesItems(id);
    await deleteResoueceById('contacts', id);
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
    const contact = await getContactById(Number(req.params.id));
    contact.preferences = await getPreferencesByID(contact.cities_id);
    res.json(contact).status(200);
}

async function remove(req, res) {
    await deleteContactById(Number(req.params.id));
    res.status(200).end();
}

async function update(req, res) {
    const id = Number(req.params.id)
    const contact = await getContactById(id);

    contact.id = id;
    contact.cities_id = req.body.cities_id;
    contact.contact_name = req.body.contact_name;
    contact.contact_email = req.body.contact_email;
    contact.contact_adress = req.body.contact_adress;
    contact.contact_phone = req.body.contact_phone;

    await updateContactData(contact);

    res.status(200).end();
}


module.exports = {
    clean,
    create,
    listAll,
    get,
    update,
    remove
}