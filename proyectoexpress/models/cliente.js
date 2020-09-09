const conexion = require("../dbConfig")
module.exports = {
    insertar(nombre, direccion, valoración, cuenta) {
        return new Promise((resolve, reject) => {
            conexion.query(`insert into clientes
            (nombre,direccion, valoracion, cuenta)
            values
            (?, ?)`, [nombre, direccion, valoración, cuenta], (err, resultados) => {
                if (err) reject(err);
                else resolve(resultados.insertId);
            });
        });
    },
}