const dbConfig = require("../dbConfig")

const getAllCb = (callback) => {
    db.query('SELECT * FROM secciones', callback);
}

const getAll = () => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM secciones', (err, rows) => {
            if (err) {
                reject(err);
            }
            resolve(rows);
        });
    });
}

const executeQuery = (query, values = []) => {
    return new Promise((resolve, reject) => {
        db.query(query, values, (err, result) => {
            if (err) return reject(err);
            resolve(result);
        })
    });
}

module.exports = {
    getAllCb,
    getAll,
    executeQuery
}