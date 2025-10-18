import Sequelize, { Model } from "sequelize";

class CartItem extends Model {
  static init(sequelize) {
    super.init(
      {
        id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
        quantity: { type: Sequelize.INTEGER, allowNull: false },
        cartId: { type: Sequelize.INTEGER, allowNull: false },
        productId: { type: Sequelize.INTEGER, allowNull: false },
      },
      {
        sequelize,
        tableName: "cart_items_tb",
        freezeTableName: true,
        timestamps: true,
      },
    );
  }

  static associate(models) {
    if (models && models.Cart) {
      this.belongsTo(models.Cart, { foreignKey: "cartId" });
    }

    if (models && models.Product) {
      this.belongsTo(models.Product, { foreignKey: "productId" });
    }
  }
}

export default CartItem;
