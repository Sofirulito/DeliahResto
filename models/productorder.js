'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProductOrder extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  ProductOrder.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    productId: DataTypes.UUID,
    orderId: DataTypes.UUID,
    quantity: DataTypes.DECIMAL
  }, {
    sequelize,
    modelName: 'ProductOrder',
  });
  return ProductOrder;
};