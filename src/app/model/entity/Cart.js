import { DataTypes } from "sequelize";
import sequelize from "../../config/database";

const Cart = sequelize.define(
  "Cart",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    userId: { type: DataTypes.INTEGER, allowNull: false },
  },
  {
    timestamps: true,
  },
);

export default Cart;
