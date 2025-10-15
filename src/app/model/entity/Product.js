import { DataTypes } from "sequelize";
import sequelize from "../../config/database";

const Product = sequelize.define(
  "Product",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT },
    price: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    stock: { type: DataTypes.INTEGER, defaultValue: 0 },
    image: { type: DataTypes.STRING },
    categoryId: { type: DataTypes.INTEGER, allowNull: false },
  },
  {
    timestamps: true,
  },
);

export default Product;
