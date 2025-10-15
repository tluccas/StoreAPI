import { DataTypes } from "sequelize";
import sequelize from "../../config/database";

const OrderItem = sequelize.define(
  "OrderItem",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    orderId: { type: DataTypes.INTEGER, allowNull: false },
    productId: { type: DataTypes.INTEGER, allowNull: false },
    quantity: { type: DataTypes.INTEGER, allowNull: false },
    price: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
  },
  {
    timestamps: false,
  },
);

export default OrderItem;
