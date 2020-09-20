const router = require('express').Router();
const moment = require('moment');

const Producto = require('../models/Producto')


router.get('/', (req, res) => {
    Producto.getAllProductos()
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


// router.get('/new', (req, res) => {
//     res.render('productos/formulario');
// });


// router.get('/:seccionId', async(req, res) => {
//     try {
//         const producto = await getById(req.params.seccionId);
//         res.render('productos/detail', { producto });
//     } catch (error) {
//         console.log(error);
//     }
// });

// router.get('/descripcion/:id', async(req, res) => {
//     try {
//         const viewer = await Producto.getByIdDescription(req.params.id);
//         res.json(viewer);
//     } catch (err) {
//         res.send(err);
//     }
// })

// router.post('/create', async(req, res) => {

//     req.body.fecha_alta = new Date();
//     const result = await create(req.body);

//     res.redirect('/productos');
// });


// router.get('/edit/:productoId', async(req, res) => {
//     const producto = await getById(req.params.productoId);
//     res.render('productos/update', { producto });
// });

// router.post('/update', async(req, res) => {
//     const result = await update(req.body);
//     console.log(result);
//     res.redirect(`/productos/${req.body.id}`);
// });

// router.get('/delete/:productoId', (req, res) => {
//     remove(req.params.productoId)
//         .then(result => {
//             res.redirect('/productos');
//         }).catch(error => console.log(error));
// });

module.exports = router;