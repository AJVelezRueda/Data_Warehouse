const { QueryTypes } = require("sequelize");
const { db, findOne } = require("../database");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const salt = 10;



async function insert(user) {
    user.password_hash = await bcrypt.hash(user.password, salt);
    const result = await db.query(`
    insert into users (name, email, username, password_hash, role) values (:name, :email, :username, :password_hash, :role)
`, {
        replacements: user,
        type: QueryTypes.INSERT
    });
    const user_id = result[0];
    const token = jwt.sign({ user_id }, process.env.ACCESS_TOKEN_SECRET);
    return { user_id, token };
}


async function findUserById(id) {
    return findOne(`select id, name, username, email from users where id = :id`, id, 'usuario');
}


async function getUsersData() {
    return await db.query("select id, name, username, email from users", { type: QueryTypes.SELECT });
}

async function updateUserData(user) {
    await db.query(`
    update users set name = :name, email = :email where id = :id
`, {
        replacements: user,
        type: QueryTypes.UPDATE
    });
}

module.exports = {
    insert,
    findUserById,
    getUsersData,
    updateUserData
}