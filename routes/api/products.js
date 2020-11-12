const router = require('express').Router();
const middleware = require('../middlewares');
const db = require('../../models');


router.get('/', async (req, res) => {
    db.Products.findAll().then(Products => res.send(Products));
});

router.post('/', [ middleware.checkToken, middleware.adminRole ], async (req, res) => {
    const product = await db.Products.create(req.body);
    res.json(product)
});

router.get('/:productId', [ middleware.checkToken, middleware.adminRole ], async (req, res) => {
    db.Products.findAll({
        where: {
            id: req.params.productId
        }
    })
    .then(Products => res.send(Products))
});

router.put('/:productId', [ middleware.checkToken, middleware.adminRole ], async (req, res) => {
    await db.Products.update(req.body, {
        where: { id: req.params.productId }
    });
    res.json({ success: 'Los datos han sido modificados'})
})

router.delete('/:productId', [ middleware.checkToken, middleware.adminRole ], async (req, res) => {
    await db.Products.destroy({
        where: { id: req.params.productId }
    });
    res.json({ success: 'El producto se ha borrado'})
})

module.exports = router;