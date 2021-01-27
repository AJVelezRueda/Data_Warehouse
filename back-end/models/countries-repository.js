const { QueryTypes } = require("sequelize");
const { db } = require("../database");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const salt = 10;


async function insertNewCountry(newCountry) {
    await db.query(`
    insert into countries  (name, regions_id)
                values ( :name, :regions_id)
`, {
        replacements: newCountry,
        type: QueryTypes.INSERT
    });
}


module.exports = {
    insertNewCountry
}