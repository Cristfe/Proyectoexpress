const router = require('express').Router();

const apiProductosRouter = require('./api/productos');
const apiSeccionesRouter = require('./api/secciones');
const apiUsuariosRouter = require('./api/usuarios');

const { checkToken } = require('./middlewares');

router.use('/productos', checkToken, apiProductosRouter);
router.use('/secciones', checkToken, apiSeccionesRouter);
router.use('/usuarios', apiUsuariosRouter);

module.exports = router;