const { QueryTypes } = require("sequelize");
const { db, cleanTable, getAllResources, deleteResoueceById } = require("../database");
const { insertNewCity, getCityByID } = require("../models/cities-repositories");


async function clean() {
    await cleanTable('cities');
}

async function create(req, res) {
    const city = {
        name: req.body.name,
        countries_id: req.body.countries_id
    };

    try {
        const cities_id = await insertNewCity(city);
        res.json({ id: cities_id }).status(201);

    } catch (e) {
        res.json({ message: e.message }).status(500);
    }
}

async function listAll(req, res) {
    const cities = await getAllResources('cities');
    res.json({ cities }).status(200);
}

async function get(req, res) {
    try {
        const city = await getCityByID(Number(req.params.id))
        res.json(city).status(200);
    } catch (e) {
        res.status(404).end();
    }
}

async function remove(req, res) {
    try{
        await deleteResoueceById('cities', Number(req.params.id));
        res.status(200).end();
    } catch (e){
        res.status(400).json({ message: "No se puede eliminar. Verificá que ciudad no esté en uso" });
    }
}


module.exports = {
    clean,
    create,
    listAll,
    get,
    remove
}