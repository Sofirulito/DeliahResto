const Sequelize = require('sequelize');

const productModel = require('./models/products')
const userModel = require('./models/users')

const sequelize = new Sequelize('V9Jz5fm5ia', 'V9Jz5fm5ia', 'PyeOpCjLWB', {
    host: 'remotemysql.com',
    dialect: 'mysql',
})

const Product = productModel(sequelize, Sequelize);
const User = userModel(sequelize, Sequelize);

sequelize.sync({ force: false })
    .then(() => {
        console.log('Tablas sincronizadas')
    })

module.exports = {
    Product,
    User
}