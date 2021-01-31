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


async function getCityByID(cities_id) {
    const cities = await db.query(`SELECT
    cities.name as name,
    countries.name as countries_name,
    countries.id as countries_id
    FROM cities
    INNER JOIN countries ON countries.id = cities.countries_id
    WHERE cities.id = :cities_id
    `, {
        replacements: { cities_id },
        type: QueryTypes.SELECT
    });
    return cities[0];
}


module.exports = {
    insertNewCity,
    getCityByID
}