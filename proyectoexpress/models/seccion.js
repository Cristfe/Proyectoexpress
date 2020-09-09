const conexion = require("../dbConfig")
module.exports = {
    insertar(nombre, categoría) {
        return new Promise((resolve, reject) => {
            conexion.query(`insert into seccion
            (nombre, categoria)
            values
            (?, ?)`, [nombre, categoria], (err, resultados) => {
                if (err) reject(err);
                else resolve(resultados.insertId);
            });
        });
    },
}