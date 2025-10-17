import Sequelize, { Model } from "sequelize";

class Category extends Model {
  static init(sequelize) {
    super.init(
      {
        id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
        name: { type: Sequelize.STRING, allowNull: false, unique: true },
        description: { type: Sequelize.TEXT },
      },
      {
        sequelize,
        tableName: "categories_tb",
        freezeTableName: true,
        timestamps: true,
      },
    );
  }

  static associate(models) {
    if (models && models.Product) {
      this.hasMany(models.Product, { foreignKey: "categoryId" });
    }
  }
}

export default Category;
