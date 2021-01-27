const { QueryTypes } = require("sequelize");
const { db, cleanTable, deleteResoueceById } = require("../database");
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


module.exports = {
    clean,
    create,
    listAll
}