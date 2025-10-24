import Sequelize, { Model } from "sequelize";

class Cart extends Model {
  static init(sequelize) {
    super.init(
      {
        id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
        userId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          field: "userId",
        },
      },
      {
        sequelize,
        tableName: "carts_tb",
        freezeTableName: true,
        timestamps: true,
      },
    );
  }

  static associate(models) {
    if (models && models.User) {
      this.belongsTo(models.User, { foreignKey: "userId" });
    }

    if (models && models.CartItem) {
      this.hasMany(models.CartItem, { foreignKey: "cartId", as: "items" });
    }
  }
}

export default Cart;
