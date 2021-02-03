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


module.exports = {
    insertNewPreference
}