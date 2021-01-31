const { QueryTypes } = require("sequelize");
const { db, cleanTable, getAllResources, deleteResoueceById } = require("../database");
const { insertNewCity, getCityByID } = require("../models/cities-repositories");


async function clean() {
    cleanTable('cities');
}

async function create(req, res) {
    const city = {
        name: req.body.name,
        countries_id: req.body.countries_id
    };

    try {
        const cities_id = await insertNewCity(city);
        res.status(201).json({ id: cities_id });

    } catch (e) {
        res.status(500).json({ message: e.message });
    }
}

async function listAll(req, res) {
    const cities = await getAllResources('cities');
    res.json({ cities }).status(200);
}

async function get(req, res) {
    const city = await getCityByID(Number(req.params.id))

    res.json(city).status(200);
}

async function remove(req, res) {
    deleteResoueceById('cities', Number(req.params.id));
    res.status(200).end();
}


module.exports = {
    clean,
    create,
    listAll,
    get,
    remove
}