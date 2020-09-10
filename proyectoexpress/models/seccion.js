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

const getAllV2 = async() => {
    const rows = await executeQuery('select * from secciones where id = ?', [4]);
    return rows;
}

const create = ({ nombre, categoria, imagen }) => {
    const valores = [nombre, categoria, imagen];

    return new Promise((resolve, reject) => {
        db.query('insert into secciones (nombre, categoria, imagen) values (?, ?, ?)', valores, (err, result) => {
            if (err) {
                reject(err);
            }
            resolve(result);
        });
    });
}



const getById = (pSeccionId) => {
    return new Promise((resolve, reject) => {
        db.query('select * from secciones where id = ?', [pSeccionId], (err, rows) => {
            if (err) reject(err);
            if (rows.length !== 1) resolve(null);
            resolve(rows[0]);
        });
    });
}

const update = ({ nombre, categoria, imagen }) => {
    return new Promise((resolve, reject) => {
        db.query('UPDATE secciones SET nombre = ?, categoria = ?, imagen = ? WHERE id = ?', [nombre, categoria, imagen], (err, result) => {
            if (err) return reject(err);
            resolve(result);
        });
    });
}


const remove = (pSeccionId) => {
    return new Promise((resolve, reject) => {
        db.query('delete from secciones where id = ?', [pSeccionId], (err, result) => {
            if (err) reject(err);
            resolve(result);
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
    create,
    getById,
    update,
    remove
}