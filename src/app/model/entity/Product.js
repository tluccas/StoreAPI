import Sequelize, { Model } from "sequelize";

class Product extends Model {
  static init(sequelize) {
    super.init(
      {
        id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
        name: { type: Sequelize.STRING, allowNull: false },
        description: { type: Sequelize.TEXT },
        price: { type: Sequelize.DECIMAL(10, 2), allowNull: false },
        stock: { type: Sequelize.INTEGER, defaultValue: 0 },
        image: { type: Sequelize.STRING },
        categoryId: { type: Sequelize.INTEGER, allowNull: false },
      },
      {
        sequelize,
        tableName: "products_tb",
        freezeTableName: true,
        timestamps: true,
      },
    );
  }

  static associate(models) {
    if (models && models.Category) {
      this.belongsTo(models.Category, { foreignKey: "categoryId" });
    }

    if (models && models.OrderItem) {
      this.hasMany(models.OrderItem, { foreignKey: "productId" });
    }
  }
}

export default Product;
