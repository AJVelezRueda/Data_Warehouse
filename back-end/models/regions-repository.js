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



async function insertNewCountry(newCountry) {
    await db.query(`
    insert into items  (name, regions_id)
                values ( :name, :regions_id)
`, {
        replacements: newCountry,
        type: QueryTypes.INSERT
    });
}


async function insertNewRegion(newRegion) {
    await db.query(`
    insert into items  (name)
                values ( :name)
`, {
        replacements: newRegion,
        type: QueryTypes.INSERT
    });
}


module.exports = {
    insertNewCity,
    insertNewCountry
}