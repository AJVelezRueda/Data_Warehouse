const { Sequelize, QueryTypes } = require("sequelize");

const db = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, 'D4T4IS@W3S0m3!i5N\'T1t?', {
    host: 'localhost',
    port: 3306,
    dialect: 'mysql'
})

async function findOne(query, id, type) {
    const results = await db.query(query, {
        replacements: { id },
        type: QueryTypes.SELECT
    });
    
    if (results.length === 0) {
        throw new Error(`No existe ${type} con id ${id}`);
    }
    return results[0];
}


function getResourceById(table, id) {
    return findOne(`select * from ${table} where id = :id`, id, table);
};

async function getAllResources(table) {
    return await db.query(`select * from ${table}`, { type: QueryTypes.SELECT });
}


async function deleteResoueceById(table, id) {
    await db.query(`delete from ${table} where id = :id`, {
        replacements: { id: id },
        type: QueryTypes.DELETE
    });
}

async function cleanTable(table) {
    await db.query("SET FOREIGN_KEY_CHECKS = 0;");
    await db.query(`truncate ${table}`, { type: QueryTypes.BULKDELETE });
    await db.query("SET FOREIGN_KEY_CHECKS = 1;");
}



module.exports = {
    db,
    getResourceById,
    getAllResources,
    deleteResoueceById,
    cleanTable,
    findOne
};