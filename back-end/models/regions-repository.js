const { QueryTypes } = require("sequelize");
const { db } = require("../database");


async function insertNewRegion(newRegion) {
    const result = await db.query(`
    insert into regions (name)
                values (:name)
`, {
        replacements: newRegion,
        type: QueryTypes.INSERT
    });

    return result[0]
}


async function getRegionsData() {
    return await db.query("select id, name from regions", { type: QueryTypes.SELECT });
}

module.exports = {
    insertNewRegion,
    getRegionsData
}