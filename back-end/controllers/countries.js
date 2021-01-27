const { QueryTypes } = require("sequelize");
const { db, cleanTable, deleteResoueceById } = require("../database");
const { insertNewCountry } = require("../models/countries-repository");

async function clean() {
    cleanTable('countries');
}

async function create(req, res) {
    const countries = {
        name: req.body.name
        regions_id: req.regions_id,
    };

    try {
        const countries_id = await insertNewCountry(countries);
        res.status(201).json({ id: countries_id });

    } catch (e) {
        res.status(500).json({ message: e.message });
    }
}


module.exports = {
    clean,
    create
}