module.exports = (sequelize, DataTypes) => {
    const Orders = sequelize.define('Orders',{
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        state: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        wayToPay: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        total: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    }, {});

    Orders.associate = function(models){
        Orders.belongsTo(models.User,{
            foreignKey: {
                allowNull: false
            }
        });

        Orders.belongsToMany(models.Products, {
            through: 'ProductOrder',
            as: 'products',
            foreignKey: 'orderId',
            otherKey: 'productId'
        });
    }

    return Orders;
}
