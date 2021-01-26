const { QueryTypes } = require("sequelize");
const { db, cleanTable, deleteResoueceById } = require("../database");
const { insertNewCity, insertNewCountry, insertNewRegion } = require("../models/regions-repository");



async function clean() {
    cleanTable('cities');
    cleanTable('countries');
    cleanTable('regions');
}

async function createCity(countries_id, cities) {
    for (let item of cities) {
        const newCity = {
            name: item.name,
            countries_id
        };

        await insertNewCity(newCity);
    }
}

async function createCountry(regions_id, countries) {
    for (let item of countries) {
        const newCountry = {
            name: item.name,
            regions_id
        };

        await insertNewCountry(newCountry);
    }
}

async function create(newRegion) {
    await insertNewRegion(newRegion)
}


module.exports = {
    clean,
    create,
    createCountry
}