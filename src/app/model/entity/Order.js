import { DataTypes } from "sequelize";
import sequelize from "../../config/database";

const Order = sequelize.define(
  "Order",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    userId: { type: DataTypes.INTEGER, allowNull: false },
    total: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    status: { type: DataTypes.STRING, defaultValue: "pending" },
  },
  {
    timestamps: true,
  },
);

export default Order;
