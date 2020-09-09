const router = require('express').Router();
const { getAll, create, getById, remove, update } = require('../../models/producto');

router.get('/', async(req, res) => {
    console.log(req.user);
    try {
        const productos = await getAll();
        res.json(productos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/', async(req, res) => {
    try {
        req.body.fecha_inic = new Date();
        const result = await create(req.body);
        if (result['affectedRows'] === 1) {
            const nuevoProducto = await getById(result['insertId']);
            res.status(201).json({ success: 'Se ha insertado un nuevo producto', producto: nuevoProducto });
        } else {
            res.status(422).json({ error: 'No se ha podido insertar el producto' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.delete('/', async(req, res) => {
    try {
        const result = await remove(req.body.id);
        if (result['affectedRows'] === 1) {
            res.json({ success: 'Se ha borrado el producto' });
        } else {
            res.status(422).json({ error: 'No se ha borrado el producto. Comprueba el ID' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put('/', async(req, res) => {
    try {
        const result = await update(req.body);
        if (result['affectedRows'] === 1) {
            res.json({ success: 'Se ha editado el producto' });
        } else {
            res.status(422).json({ error: 'No se ha podido actualizar' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;