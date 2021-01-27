const { QueryTypes } = require("sequelize");
const { db } = require("../database");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const salt = 10;


async function insertNewCountry(newCountry) {
    const result = await db.query(`
    insert into countries  (name, regions_id)
                values ( :name, :regions_id)
`, {
        replacements: newCountry,
        type: QueryTypes.INSERT
    });

    return result[0]
}

async function getCountriesData() {
    return await db.query("select id, name, regions_id from countries", { type: QueryTypes.SELECT })
}


module.exports = {
    insertNewCountry,
    getCountriesData
}