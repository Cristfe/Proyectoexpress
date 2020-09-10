const router = require('express').Router();
const moment = require('moment');

const { getAll, create, getById, update, remove } = require('../models/seccion');


router.get('/', async(req, res) => {
    try {
        const rows = await getAll();
        rows.forEach(row => {
            row.nombre = moment(row.nombre);
        })
        res.render('secciones/index', {
            secciones: rows
        });
    } catch (err) {
        console.log(err);
    }
});

router.get('/new', (req, res) => {
    res.render('secciones/formulario');
});


router.get('/:seccionId', async(req, res) => {
    try {
        const seccion = await getById(req.params.seccionId);
        res.render('secciones/detail', { seccion });
    } catch (error) {
        console.log(error);
    }
});

router.post('/create', async(req, res) => {

    req.body.fecha_inc = new Date();
    const result = await create(req.body);

    res.redirect('/secciones');
});


router.get('/edit/:seccionId', async(req, res) => {
    const seccion = await getById(req.params.seccionId);
    res.render('secciones/update', { seccion });
});

router.post('/update', async(req, res) => {
    const result = await update(req.body);
    console.log(result);
    res.redirect(`/secciones/${req.body.id}`);
});

router.get('/delete/:seccionId', (req, res) => {
    remove(req.params.seccionId)
        .then(result => {
            res.redirect('/secciones');
        }).catch(error => console.log(error));
});

module.exports = router;