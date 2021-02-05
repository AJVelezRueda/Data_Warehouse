const { QueryTypes } = require("sequelize");
const { db } = require("../database");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const salt = 10;


async function insertNewPreference(preferences) {
    const result = await db.query(`
    insert into preferences (intrest, channel, contacts_id) 
    values (:intrest, :channel, :contacts_id)
`, {
        replacements: preferences,
        type: QueryTypes.INSERT
    });

    return result[0];
}
async function getPreferencesByID(contacts_id) {
    const preferences = await db.query(`SELECT
    contacts.id as contacts_id, 
    intrest, 
    channel
    FROM preferences
    INNER JOIN contacts ON contacts.id = preferences.contacts_id
    WHERE contacts.id = :contacts_id
    `, {
        replacements: { contacts_id },
        type: QueryTypes.SELECT
    });
    return preferences;
};

async function deletePreferencesItems(id) {
    await db.query(`delete from preferences where order_id = :id`, {
        replacements: { id: id },
        type: QueryTypes.DELETE
    });
}


module.exports = {
    insertNewPreference,
    getPreferencesByID,
    deletePreferencesItems
}