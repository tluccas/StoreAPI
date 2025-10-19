import Sequelize, { Model } from "sequelize";
import bcrypt from "bcryptjs";

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
        name: { type: Sequelize.STRING, allowNull: false },
        email: { type: Sequelize.STRING, allowNull: false, unique: true },
        password: { type: Sequelize.VIRTUAL },
        password_hash: { type: Sequelize.STRING, allowNull: false },
        role: { type: Sequelize.STRING, defaultValue: "user" },
      },
      {
        sequelize,
        tableName: "users_tb",
        freezeTableName: true,
        timestamps: true,
      },
    );

    this.addHook("beforeValidate", async (user) => {
      if (user.isNewRecord && user.password) {
        user.password_hash = await bcrypt.hash(user.password, 8);
      }
    });

    this.addHook("beforeSave", async (user) => {
      if (user.password) {
        user.password_hash = await bcrypt.hash(user.password, 8);
      }
    });
  }

  checkPassword(password) {
    return bcrypt.compare(password, this.password_hash);
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
