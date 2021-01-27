const { QueryTypes } = require("sequelize");
const { db, cleanTable, deleteResoueceById } = require("../database");
const { insertNewRegion } = require("../models/regions-repository");

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

module.exports = {
    clean,
    create
}