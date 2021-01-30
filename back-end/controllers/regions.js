const { QueryTypes } = require("sequelize");
const { db, cleanTable, deleteResoueceById, getResourceById } = require("../database");
const { insertNewRegion, getRegionsData } = require("../models/regions-repository");

async function clean() {
    cleanTable('regions');
}

async function create(req, res) {
    try {
        const newRegion = {
            name: req.body.name
        };
        res.status(201).json({ id: await insertNewRegion(newRegion) });
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
}


async function listAll(req, res) {
    const regions = await getRegionsData();
    res.json({ regions }).status(200);
}


async function get(req, res) {
    const region = await getResourceById('regions', Number(req.params.id))

    res.json(region).status(200);
}


module.exports = {
    clean,
    create,
    listAll,
    get
}