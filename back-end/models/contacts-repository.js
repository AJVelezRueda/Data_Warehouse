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

async function updateContactData(contact) {
    await db.query(`
    update contacts set 
    cities_id = :cities_id,
    contact_name = :contact_name,
    contact_email = :contact_email,
    contact_adress = :contact_adress,
    contact_phone = :contact_phone    
    where id = :id
`, {
        replacements: contact,
        type: QueryTypes.UPDATE
    });
}



function getContactById(id) {
    return findOne(`SELECT
        cities.id as cities_id,
        contact_name,
        contact_email,
        contact_adress,
        contact_phone
        FROM contacts
        INNER JOIN cities ON cities.id = contacts.cities_id
        WHERE contacts.id = :id
        `, id, 'contactos');
};

module.exports = {
    insertNewContact,
    getContactById,
    updateContactData
}