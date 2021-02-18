const { QueryTypes } = require("sequelize");
const { db, findOne } = require("../database");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const salt = 10;


async function insertNewContact(contact) {
    const result = await db.query(`
    insert into contacts (cities_id, contact_name, contact_email, contact_adress, contact_phone)
    values (:cities_id, :contact_name, :contact_email, :contact_adress, :contact_phone)
`, {
        replacements: contact,
        type: QueryTypes.INSERT
    });

    return result[0];
}


function getCtactsByID(id) {
    return findOne(`SELECT
        cities.id as cities_id,
        contact_name,
        contact_email,
        contact_adress,
        contact_phone
        FROM contacts
        INNER JOIN cities ON cities.id = contacts.cities_id
        WHERE cities.id = :id
        `, id, 'contactos');
};

module.exports = {
    insertNewContact,
    getCtactsByID
}