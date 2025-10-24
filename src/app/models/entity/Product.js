import Sequelize, { Model } from "sequelize";

class Product extends Model {
  static init(sequelize) {
    super.init(
      {
        id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
        name: { type: Sequelize.STRING, allowNull: false },
        description: { type: Sequelize.TEXT },
        price: {
          type: Sequelize.DECIMAL(10, 2),
          allowNull: false,
        },
        stock: {
          type: Sequelize.INTEGER,
          allowNull: false,
          defaultValue: 0,
        },
        createdAt: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        },
        updatedAt: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.literal(
            "CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP",
          ),
        },
        image: { type: Sequelize.STRING },
        categoryId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          field: "categoryId",
        },
      },
      {
        sequelize,
        tableName: "products_tb",
        freezeTableName: true,
        timestamps: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
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
