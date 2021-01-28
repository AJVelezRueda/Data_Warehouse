const { QueryTypes } = require("sequelize");
const { db, cleanTable, getAllResources } = require("../database");
const { insertNewCountry } = require("../models/countries-repository");


async function clean() {
    cleanTable('countries');
}

async function create(req, res) {
    const countries = {
        name: req.body.name,
        regions_id: req.body.regions_id
    };

    try {
        const countries_id = await insertNewCountry(countries);
        res.status(201).json({ id: countries_id });

    } catch (e) {
        res.status(500).json({ message: e.message });
    }
}

async function listAll(req, res) {
    const countries = await getAllResources('countries');
    res.json({ countries }).status(200);
}


module.exports = {
    clean,
    listAll,
    create
}