import Sequelize, { Model } from "sequelize";

class Order extends Model {
  static init(sequelize) {
    super.init(
      {
        id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
        userId: { type: Sequelize.INTEGER, allowNull: false, field: "userId" },
        total: {
          type: Sequelize.DECIMAL(10, 2),
          allowNull: false,
          defaultValue: 0,
        },
        status: {
          type: Sequelize.STRING,
          allowNull: false,
          defaultValue: "pending",
        },
      },
      {
        sequelize,
        tableName: "orders_tb",
        freezeTableName: true,
        timestamps: true,
      },
    );
  }

  static associate(models) {
    if (models && models.User) {
      this.belongsTo(models.User, { foreignKey: "userId" });
    }

    if (models && models.OrderItem) {
      this.hasMany(models.OrderItem, { foreignKey: "orderId", as: "items" });
    }

    if (models && models.Payment) {
      this.hasMany(models.Payment, { foreignKey: "orderId" });
    }
  }
}

export default Order;
