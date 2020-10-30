const router = require('express').Router();
const middleware = require('../middlewares');

const { Product } = require('../../db')

router.get('/', async (req, res) => {
    const products = await Product.findAll();
    res.json(products)
});

router.post('/', [ middleware.checkToken, middleware.adminRole ], async (req, res) => {
    const product = await Product.create(req.body);
    res.json(product)
});

router.put('/:productId', [ middleware.checkToken, middleware.adminRole ], async (req, res) => {
    await Product.update(req.body, {
        where: { id: req.params.productId }
    });
    res.json({ success: 'Los datos han sido modificados'})
})

router.delete('/:productId', [ middleware.checkToken, middleware.adminRole ], async (req, res) => {
    await Product.destroy({
        where: { id: req.params.productId }
    });
    res.json({ success: 'El producto se ha borrado'})
})

module.exports = router;