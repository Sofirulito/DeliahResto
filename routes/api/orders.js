const router = require('express').Router();
const middleware = require('../middlewares');
const db = require('../../models');

router.post('/', [ middleware.checkToken], async (req, res) => {
    // Create and save the order
    const savedOrder = await db.Orders.create(
        req.body
    )

    // Loop req.products
    req.body.products.forEach((item) => {
        const newPO = {
            orderId: savedOrder.id,
            productId: item.id,
            quantity: item.qty
        }
        
        const savedProductOrder = db.ProductOrder.create(newPO, { returning: true });
    });

    // If everything goes well, respond with the order
    return res.status(200).json(savedOrder)
});

router.get('/', [ middleware.checkToken, middleware.adminRole ], async (req, res) => {
    db.Orders.findAll({
        include: [{
            model: db.Products,
            as: 'products'
        }]
    }).then(allOrders => res.send(allOrders));
});

router.get('/:orderId', [ middleware.checkToken, middleware.adminRole ], async (req, res) => {
    db.Orders.findAll({
        where: {
            id: req.params.orderId
        },
        include: [{
            model: db.Products,
            as: 'products'
        }]
    })
    .then(orders => res.send(orders))
});


router.put('/:orderId', [ middleware.checkToken, middleware.adminRole ], async (req, res) => {
    const order = await db.Orders.findOne({ where: { id: req.params.orderId } })
    if (order) {
        await db.Orders.update(req.body, {
            where: { id: req.params.orderId }
        }). then(() => {    
            res.json({ success: 'Los datos han sido modificados' })
        })
    } else {
        return res.json({ error: `La orden ${req.params.orderId} no existe` });
    }
})

router.delete('/:orderId',  [ middleware.checkToken, middleware.adminRole ], async (req, res) => {
    const order = await db.Orders.findOne({ where: { id: req.params.orderId } })
    if(order){
        await db.Orders.destroy({
            where: { id: req.params.orderId }
        }).then(() => {
            res.json({ success: "Orden eliminado" });
        })
    } else{
        return res.json({ error: `La orden ${req.params.orderId} no existe` });
    }
})


module.exports = router;