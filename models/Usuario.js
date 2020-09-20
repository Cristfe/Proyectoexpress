const dbConfig = require("../dbConfig");

const create = ({ username, email, password }) => {
    const valores = [username, email, password, 1]
    return new Promise((resolve, reject) => {
        db.query('insert into usuarios (username, email, password, role) values (?, ?, ?, ?)', valores, (err, result) => {
            if (err) {
                reject(err);
            }
            resolve(result);
        })
    });
};

const getByEmail = (pEmail) => {
    return new Promise((resolve, reject) => {
        db.query('select * from usuarios where email = ?', [pEmail], (err, rows) => {
            if (err) reject(err);
            if (rows.length !== 1) resolve(null);
            resolve(rows[0]);
        });
    });
}

const getById = (pUsuarioId) => {
    return new Promise((resolve, reject) => {
        db.query('select * from usuarios where id = ?', [pUsuarioId], (err, rows) => {
            if (err) reject(err);
            if (rows.length !== 1) resolve(null);
            resolve(rows[0]);
        });
    });
}

module.exports = {
    create,
    getByEmail,
    getById
}