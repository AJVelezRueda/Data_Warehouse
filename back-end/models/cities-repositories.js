const { QueryTypes } = require("sequelize");
const { db } = require("../database");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const salt = 10;


async function insertNewCity(newCity) {
    await db.query(`
    insert into items  (name, countries_id)
                values ( :name, :countries_id)
`, {
        replacements: newCity,
        type: QueryTypes.INSERT
    });
}


module.exports = {
    insertNewCity
}