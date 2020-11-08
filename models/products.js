module.exports = (sequelize, Datatypes) => {
    const Products = sequelize.define('Products',{
        id: {
            type: Datatypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: Datatypes.STRING,
        price: Datatypes.INTEGER,
    });

    Products.associate = function(models) {
        Products.belongsToMany(models.Orders, {
          through: 'ProductOrder',
          as: 'orders',
          foreignKey: 'productId',
          otherKey: 'orderId'
        });
    }

    return Products
}