import Sequelize, { Model } from "sequelize";

class Payment extends Model {
  static init(sequelize) {
    super.init(
      {
        id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
        orderId: { type: Sequelize.INTEGER, allowNull: false },
        amount: { type: Sequelize.DECIMAL(10, 2), allowNull: false },
        method: { type: Sequelize.STRING, allowNull: false },
        status: { type: Sequelize.STRING, defaultValue: "pending" },
      },
      {
        sequelize,
        tableName: "payments_tb",
        freezeTableName: true,
        timestamps: true,
      },
    );
  }

  static associate(models) {
    if (models && models.Order) {
      this.belongsTo(models.Order, { foreignKey: "orderId" });
    }
  }
}

export default Payment;
