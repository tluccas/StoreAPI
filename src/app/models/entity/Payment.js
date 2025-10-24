import Sequelize, { Model } from "sequelize";

class Payment extends Model {
  static init(sequelize) {
    super.init(
      {
        id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
        orderId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          field: "orderId",
        },
        amount: { type: Sequelize.DECIMAL(10, 2), allowNull: false },
        method: {
          type: Sequelize.ENUM("credit", "debit", "cash", "pix"),
          allowNull: false,
        },
        status: {
          type: Sequelize.ENUM("pending", "confirmed", "canceled"),
          defaultValue: "pending",
        },
      },
      {
        sequelize,
        tableName: "payments_tb",
        freezeTableName: true,
        timestamps: true,
        scopes: {
          pending: {
            where: { status: "pending" },
          },
          confirmed: {
            where: { status: "confirmed" },
          },
          canceled: {
            where: { status: "canceled" },
          },
          byMethod(methods) {
            return { where: { method: { [Sequelize.Op.in]: methods } } };
          },
          currentMonth() {
            const now = new Date();
            const startDate = new Date(
              now.getFullYear(),
              now.getMonth(),
              1,
              0,
              0,
              0,
            );
            const endDate = new Date(
              now.getFullYear(),
              now.getMonth() + 1,
              0,
              23,
              59,
              59,
            );
            return {
              where: {
                createdAt: { [Sequelize.Op.between]: [startDate, endDate] },
              },
            };
          },
        },
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
