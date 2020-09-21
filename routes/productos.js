const router = require('express').Router();
const moment = require('moment');

const Producto = require('../models/Producto')


router.get('/', (req, res) => {
    Producto.getAll()
        .then((rows) => {
            res.json(rows);
        }).catch((err) => {
            res.json({ error: err.message });
        });
});

// router.get('/', async(req, res) => {
//     try {
//         const rows = await getAll();
//         rows.forEach(row => {
//             row.fecha_alta = moment(row.fecha_alta).format('DD-MM-YYYY');
//         })
//         res.render('productos/index', {
//             productos: rows
//         });
//     } catch (err) {
//         console.log(err);
//     }
// });

// router.post('/', async(req, res) => {
//     try {
//         req.body.fecha_alta = new Date();
//         const result = await Producto.create(req.body);
//         if (result['affectedRows'] === 1) {
//             const nuevoProducto = await getById(result['insertId']);
//             res.status(201).json({ success: 'Se ha insertado un nuevo producto', producto: nuevoProducto });
//         } else {
//             res.status(422).json({ error: 'No se ha podido insertar el producto' });
//         }
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// });


// router.put('/', async(req, res) => {
//     try {
//         const result = await Producto.update(req.body);
//         if (result['affectedRows'] === 1) {
//             res.json({ success: 'Se ha editado el producto' });
//         } else {
//             res.status(422).json({ error: 'No se ha podido actualizar' });
//         }
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// });

// router.delete('/', async(req, res) => {
//     try {
//         const result = await Producto.remove(req.body.id);
//         if (result['affectedRows'] === 1) {
//             res.json({ success: 'Se ha borrado el producto' });
//         } else {
//             res.status(422).json({ error: 'No se ha borrado el producto. Comprueba el ID' });
//         }
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// });

module.exports = router;