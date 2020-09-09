const router = require('express').Router();
const { getAll, getById } = require('../../models/seccion');

router.get('/', async(req, res) => {
    try {
        const rows = await getAll();
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/:seccionId', async(req, res) => {
    try {
        const row = await getById(req.params.seccionId);
        if (row) {
            res.json(row);
        } else {
            res.status(404).json({ error: 'No existe seccion para ese ID' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message, file: error.fileName, line: error.lineNumber });
    }
});

module.exports = router;