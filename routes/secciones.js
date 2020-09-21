const router = require('express').Router();
const moment = require('moment');
const seccion = require('../models/seccion');

router.get('/', (req, res) => {
    seccion.getAll()
        .then((rows) => {
            res.json(rows);
        }).catch((err) => {
            res.json({ error: err.message });
        });
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
    const result = await seccion.create(req.body);
    result['affectedRows'] === 1 ? res.json({ success: 'Producto añadido' }) : res.json({ error: 'Error al añadir' });
    res.redirect('/productos');

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

router.delete('/:seccionId', async(req, res) => {
    const result = await seccion.remove(req.params.seccionId)
    if (result['affectedRows'] === 1) {
        res.json({ success: 'La sección ha sido borrada' });
    } else {
        res.json({ error: 'Ha habido un problema y no se ha podido borrar la sección' });
    }
});

module.exports = router;