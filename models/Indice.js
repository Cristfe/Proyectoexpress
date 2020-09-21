const getIndexUserId = (userId) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM tbi_usuarios_productos, productos where productos.id = tbi_usuarios_productos.fk_producto and tbi_usuarios_productos.fk_usuario = ? order by tbi_usuarios_productos.id desc', [userId], (err, rows) => {
            if (err) reject(err);
            resolve(rows)
        })
    })
}

const createInIndex = (fk_usuario, fk_producto) => {
    return new Promise((resolve, reject) => {
        db.query('insert ignore into tbi_usuarios_productos (fk_usuario, fk_producto) VALUES (?, ?)', [fk_usuario, fk_producto], (err, result) => {
            if (err) reject(err);
            resolve(result)
        });
    });
};


const deleteIndex = (fk_usuario, fk_producto) => {
    return new Promise((resolve, reject) => {
        db.query('delete from tbi_usuarios_productos where fk_usuario=? and fk_producto= ?', [fk_usuario, fk_producto], (err, result) => {
            if (err) reject(err);
            resolve(result)
        })
    })

}

const updatePage = (fk_usuario, fk_producto, pagina) => {
    return new Promise((resolve, reject) => {
        db.query('update tbi_usuarios_productos set pagina=? where fk_usuario=? and fk_producto=?', [pagina, fk_usuario, fk_producto], (err, result) => {
            if (err) reject(err);
            resolve(result);
        })
    })
}

const getAllFks = (fk_usuario, fk_producto) => {
    return new Promise((resolve, reject) => {
        db.query('select * from tbi_usuarios_productos where fk_usuario=? and fk_producto=?', [fk_usuario, fk_producto], (err, rows) => {
            if (err) reject(err);
            resolve(rows)
        })
    })

}

const updateState = (id, estado) => {
    return new Promise((resolve, reject) => {
        db.query('update tbi_usuarios_productos set estado=? where id=?', [estado, id], (err, rows) => {
            if (err) reject(err);
            resolve(rows)
        })
    })
}

const insertPoints = (fk_usuario, fk_producto, puntuacion) => {
    return new Promise((resolve, reject) => {
        db.query('update tbi_usuarios_productos set puntuacion=? where fk_usuario=? and fk_producto=?', [puntuacion, fk_usuario, fk_producto], (err, result) => {
            if (err) reject(err);
            resolve(result)
        })
    })
}



const showAvg = (fk_producto) => {
    return new Promise((resolve, reject) => {
        db.query('select round(avg (puntuacion),0) as puntos from tbi_usuarios_productos where fk_producto =?', [fk_producto], (err, rows) => {
            if (err) reject(err);
            resolve(rows)

        });
    });
}


module.exports = { getIndexUserId, createInIndex, deleteIndex, updatePage, getAllFks, updateState, insertPoints, showAvg }