const { QueryTypes } = require("sequelize");
const { db } = require("../database");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const salt = 10;


async function insertNewRegion(newRegion) {
    await db.query(`
    insert into items  (name)
                values ( :name)
`, {
        replacements: newRegion,
        type: QueryTypes.INSERT
    });
}


module.exports = {
    insertNewRegion
}