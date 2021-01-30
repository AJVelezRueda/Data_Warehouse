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

    return result[0];
}

async function getCountriesByID(countries_id) {
    const countries = await db.query(`SELECT
    countries.name as name,
    regions.name as region_name,
    regions.id as region_id
    FROM countries
    INNER JOIN regions ON regions.id = countries.regions_id
    WHERE countries.id = :countries_id
    `, {
        replacements: { countries_id },
        type: QueryTypes.SELECT
    });
    return countries[0];
}


module.exports = {
    insertNewCountry,
    getCountriesByID
}