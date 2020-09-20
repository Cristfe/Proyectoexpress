const dbConfig = require("../dbConfig")

const getAllCb = (callback) => {
    db.query('SELECT * FROM productos', callback);
}

const getAllProductos = () => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM productos', (err, rows) => {
            if (err)
                reject(err);
            resolve(rows);
        });
    });
}

const getAllV2 = async() => {
    const rows = await executeQuery('select * from productos where id = ?', [4]);
    return rows;
}

const create = ({ nombre, descripcion, categoria, fecha_alta, imagen, precio, seccion }) => {
    const valores = [nombre, descripcion, categoria, fecha_alta, imagen, precio, seccion];

    return new Promise((resolve, reject) => {
        db.query('insert into productos (nombre, descripcion, categoria, fecha_alta, imagen, precio, seccion) values (?, ?, ?, ?, ?, ?, ?, ?)', valores, (err, result) => {
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

const update = ({ nombre, descripcion, categoria, fecha_alta, imagen, precio, seccion }) => {
    return new Promise((resolve, reject) => {
        db.query('UPDATE productos SET nombre = ?, descripcion = ?, categoria = ?, fecha_alta = ?, imagen = ?, precio = ?, seccion = ? WHERE id = ?', [nombre, descripcion, categoria, fecha_alta, imagen, precio, seccion], (err, result) => {
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
    getAllProductos,
    create,
    getById,
    update,
    remove
}