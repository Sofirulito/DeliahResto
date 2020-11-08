const router = require('express').Router();
const bcrypt = require('bcryptjs');
const db = require('../../models');
const { check, validationResult } = require('express-validator');
const moment = require('moment');
const jwt = require('jwt-simple');
const middleware = require('../middlewares')

router.get('/', [ middleware.checkToken, middleware.adminRole ], async (req, res) => {
    db.User.findAll({
        include: [db.Orders]
    }).then(allUsers => res.send(allUsers));
});

router.put('/:userId', [ middleware.checkToken, middleware.adminRole ], async (req, res) => {
    const user = await db.User.findOne({ where: { id: req.params.userId } })
    if (user) {
        await User.update(req.body, {
            where: { id: req.params.userId }
        }). then(() => {    
            res.json({ success: 'Los datos han sido modificados' })
        })
    } else {
        return res.json({ error: `El usuario ${req.params.userId} no existe` });
    }
})

router.delete('/:userId',  [ middleware.checkToken, middleware.adminRole ], async (req, res) => {
    const user = await db.User.findOne({ where: { id: req.params.userId } })
    if(user){
        await User.destroy({
            where: { id: req.params.userId }
        }).then(() => {
            res.json({ success: "Usuario eliminado" });
        })
    } else{
        return res.json({ error: `El usuario ${req.params.userId} no existe` });
    }
})


router.post('/register', [
    check('username', 'El nombre de usuario esta vacio').not().isEmpty(),
    check('fullname', 'Ingresa el nombre completo').not().isEmpty(),
    check('email', 'Ingresa un email valido').isEmail(),
    check('password', 'Ingresa una clave').not().isEmpty(),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errores: errors.array() })
    }

    req.body.password = bcrypt.hashSync(req.body.password, 10);
    const user = await db.User.create(req.body)
        .then(() => {
            res.status(201).json('Usuario creado')
        })
        .catch((error) => {
            res.status(404).json(error);
        });
});

router.post(
    "/login", async (req, res) => {
        const user = await db.User.findOne({ where: { email: req.body.email } });
        if (user) {
            const samePass = bcrypt.compareSync(req.body.password, user.password);
            if (samePass) {
                res.json({ success: createToken(user) });
            } else {
                res.status(404).json({ error: "Error en usuario y/o contraseña" });
            }
        } else {
            res.status(404).json({ error: "Error en usuario y/o contraseña" });
        }
    });

// Crea el Token con el id del usuario, duración 1hora
const createToken = (user) => {
    const payload = {
        usuarioId: user.id,
        role: user.role,
        createdAt: moment().unix(),
        expiredAt: moment().add(60, 'minutes').unix()
    }

    return jwt.encode(payload, 'deliahResto')
};

module.exports = router;