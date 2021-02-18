const { QueryTypes } = require("sequelize");
const { db, findOne } = require("../database");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const salt = 10;


async function insertNewCity(newCity) {
    const result = await db.query(`
    insert into cities  (name, countries_id)
                values ( :name, :countries_id)
`, {
        replacements: newCity,
        type: QueryTypes.INSERT
    });

    return result[0];
}

function getCityByID(id) {    
    return findOne(`SELECT
        cities.name as name,
        countries.name as countries_name,
        countries.id as countries_id
        FROM cities
        INNER JOIN countries ON countries.id = cities.countries_id
        WHERE cities.id = :id
        `, id, 'ciudad');
}


module.exports = {
    insertNewCity,
    getCityByID
}