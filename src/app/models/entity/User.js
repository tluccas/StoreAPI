import Sequelize, { Model } from "sequelize";

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
        name: { type: Sequelize.STRING, allowNull: false },
        email: { type: Sequelize.STRING, allowNull: false, unique: true },
        password: { type: Sequelize.STRING, allowNull: false },
        role: { type: Sequelize.STRING, defaultValue: "user" },
      },
      {
        sequelize,
        tableName: "users_tb",
        freezeTableName: true,
        timestamps: true,
      },
    );
  }

  static associate(models) {
    if (models && models.Order) {
      this.hasMany(models.Order, { foreignKey: "userId" });
    }

    if (models && models.Cart) {
      this.hasOne(models.Cart, { foreignKey: "userId" });
    }
  }
}

export default User;
