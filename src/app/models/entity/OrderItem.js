import Sequelize, { Model } from "sequelize";

class OrderItem extends Model {
  static init(sequelize) {
    super.init(
      {
        id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
        orderId: { type: Sequelize.INTEGER, allowNull: false },
        productId: { type: Sequelize.INTEGER, allowNull: false },
        quantity: { type: Sequelize.INTEGER, allowNull: false },
        price: { type: Sequelize.DECIMAL(10, 2), allowNull: false },
      },
      {
        sequelize,
        tableName: "order_items_tb",
        freezeTableName: true,
        timestamps: true,
      },
    );
  }

  static associate(models) {
    if (models && models.Order) {
      this.belongsTo(models.Order, { foreignKey: "orderId" });
    }

    if (models && models.Product) {
      this.belongsTo(models.Product, { foreignKey: "productId" });
    }
  }
}

export default OrderItem;
