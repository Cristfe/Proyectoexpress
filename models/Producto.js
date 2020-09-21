const dbConfig = require("../dbConfig")

const getAllCb = (callback) => {
    db.query('SELECT * FROM productos', callback);
}

const getAll = () => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM productos', (err, rows) => {
            if (err)
                reject(err);
            resolve(rows);
        });
    });
}


const create = ({ nombre, descripcion, fecha_alta, imagen, precio, fk_seccion }) => {
    const valores = [nombre, descripcion, fecha_alta, imagen, precio, fk_seccion];

    return new Promise((resolve, reject) => {
        db.query('insert into productos (nombre, descripcion, fecha_alta, imagen, precio) values (?, ?, ?, ?, ?)', valores, (err, result) => {
            if (err) {
                reject(err);
            }
            resolve(result);
        });
    });
}



const getById = (pProductoId) => {
    return new Promise((resolve, reject) => {
        db.query('select * from productos where id = ?', [pProductoId], (err, rows) => {
            if (err) reject(err);
            if (rows.length !== 1) resolve(null);
            resolve(rows[0]);
        });
    });
}

const update = ({ nombre, descripcion, fecha_alta, imagen, precio }) => {
    return new Promise((resolve, reject) => {
        db.query('UPDATE productos SET nombre = ?, descripcion = ?, fecha_alta = ?, imagen = ?, precio = ? WHERE id = ?', [nombre, descripcion, fecha_alta, imagen, precio], (err, result) => {
            if (err) return reject(err);
            resolve(result);
        });
    });
}


const remove = (pProductoId) => {
    return new Promise((resolve, reject) => {
        db.query('delete from productos where id = ?', [pProductoId], (err, result) => {
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
    remove,
    executeQuery
}