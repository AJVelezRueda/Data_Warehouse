const { QueryTypes } = require("sequelize");
const { db, cleanTable, getAllResources, deleteResoueceById } = require("../database");
const { insertNewCountry, getCountriesByID } = require("../models/countries-repository");


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

async function get(req, res) {
    const country = await getCountriesByID(Number(req.params.id))

    res.json(country).status(200);
}

async function remove(req, res) {
    deleteResoueceById('countries', Number(req.params.id));
    res.status(200).end();
}



module.exports = {
    clean,
    listAll,
    create,
    get,
    remove
}