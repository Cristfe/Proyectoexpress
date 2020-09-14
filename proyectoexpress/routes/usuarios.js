const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Usuario = require('../models/Usuario');

//Registro
router.post('/registro', async(req, res) => {
    const email = await Usuario.getByEmail(req.body.email);
    const user = await Usuario.getByUser(req.body.usuario);
    console.log(req.body.usuario);

    if (email) {
        res.json({ error: 'El email ya está registrado' })
    } else if (user) {
        res.json({ error: 'El usuario ya está registrado' })
    } else {

        req.body.password = bcrypt.hashSync(req.body.password, 10);
        result = await Usuario.create(req.body);
        result['affectedRows'] === 1 ? res.json({ success: 'Registro correcto' }) : res.json({ error: 'Error en el registro' });
    }
});

//Login
router.post('/login', async(req, res) => {

    console.log(req.body);

    const usuario = await Usuario.getByEmail(req.body.email);
    console.log(usuario)
    if (usuario) {
        const password = bcrypt.compareSync(req.body.password, usuario.password);
        if (password) {
            res.json({ success: 'Login Correcto', token: createToken(usuario.id, usuario.rol), email: usuario.email, rol: usuario.rol })
        } else {
            res.json({ error: 'El email y/o la contraseña no son correctos' })
        }
    } else {
        res.json({ error: 'El email y/o la contraseña no son correctos' });
    }

});

//Datos de usuario
router.get('/login/:pEmail', async(req, res) => {
    try {
        const user = await Usuario.getByEmail(req.params.pEmail);
        res.json(user);
    } catch (err) {
        res.send(err);
    }
});

//Token
function createToken(pUsuarioId, pRol) {
    payload = {
        idUsuario: pUsuarioId,
        createdAt: Math.floor(Date.now()),
        expiredAt: Math.floor(Date.now() / 2000) + (60 * 60),
        rol: pRol
    }
    return jwt.sign(payload, process.env.SECRET_KEY);
}

//datos de perfil
router.get('/:usuario', async(req, res) => {
    const usuario = await Usuario.getByUser(req.params.usuario);
    console.log(req.params.usuario);
    try {
        res.json(usuario);
    } catch (err) {
        res.send(err)
    }
});

router.get('/id/:id', async(req, res) => {
    const usuario = await Usuario.getByUser(req.params.id);
    console.log(req.params.usuario);
    try {
        res.json(id);
    } catch (err) {
        res.send(err)
    }
});

router.get('/user/:userId', async(req, res) => {
    try {
        const usuario = await Usuario.getById(req.params.userId);
        res.json(usuario);
    } catch (err) {
        res.send(err);
    }
});


router.put('/edit/:usuarioId', async(req, res) => {
    console.log(req.params);
    const result = await Usuario.editUserId(req.params.usuarioId, req.body);
    if (result['affectedRows'] === 1) {
        res.json({ success: 'Usuario actualizado' });
    } else {
        res.json({ error: 'No se ha podido actualizar correctamente' });
    }
});

module.exports = router;