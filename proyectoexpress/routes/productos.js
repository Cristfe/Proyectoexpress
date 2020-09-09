const router = require('express').Router();
const moment = require('moment');

const { getAll, create, getById, update, remove } = require('../models/producto');


router.get('/', async(req, res) => {
    try {
        const rows = await getAll();
        rows.forEach(row => {
            row.fecha_inc = moment(row.fecha_inc).format('DD-MM-YYYY');
        })
        res.render('productos/index', {
            productos: rows
        });
    } catch (err) {
        console.log(err);
    }
});

router.get('/new', (req, res) => {
    res.render('productos/formulario');
});


router.get('/:departamentoId', async(req, res) => {
    try {
        const producto = await getById(req.params.departamentoId);
        res.render('productos/detail', { producto });
    } catch (error) {
        console.log(error);
    }
});

router.post('/create', async(req, res) => {

    req.body.fecha_inc = new Date();
    const result = await create(req.body);

    res.redirect('/productos');
});


router.get('/edit/:productoId', async(req, res) => {
    const producto = await getById(req.params.productoId);
    res.render('productos/update', { producto });
});

router.post('/update', async(req, res) => {
    const result = await update(req.body);
    console.log(result);
    res.redirect(`/productos/${req.body.id}`);
});

router.get('/delete/:productoId', (req, res) => {
    remove(req.params.productoId)
        .then(result => {
            res.redirect('/productos');
        }).catch(error => console.log(error));
});

module.exports = router;