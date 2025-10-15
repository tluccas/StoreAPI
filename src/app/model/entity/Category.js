import { DataTypes } from "sequelize";
import sequelize from "../../config/database";

const Category = sequelize.define(
  "Category",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false, unique: true },
    description: { type: DataTypes.TEXT },
  },
  {
    timestamps: true,
  },
);

export default Category;
