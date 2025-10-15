import { DataTypes } from "sequelize";
import sequelize from "../../config/database";

const Payment = sequelize.define(
  "Payment",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    orderId: { type: DataTypes.INTEGER, allowNull: false },
    amount: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    method: { type: DataTypes.STRING, allowNull: false },
    status: { type: DataTypes.STRING, defaultValue: "pending" },
  },
  {
    timestamps: true,
  },
);

export default Payment;
