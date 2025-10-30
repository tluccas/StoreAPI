import Sequelize from "sequelize";
import config from "../config/database.js";
import User from "../app/models/entity/User.js";
import Cart from "../app/models/entity/Cart.js";
import Order from "../app/models/entity/Order.js";
import OrderItem from "../app/models/entity/OrderItem.js";
import Payment from "../app/models/entity/Payment.js";
import Product from "../app/models/entity/Product.js";
import Category from "../app/models/entity/Category.js";
import CartItem from "../app/models/entity/CartItem.js";

const models = [
  User,
  Cart,
  Order,
  OrderItem,
  Payment,
  Product,
  Category,
  CartItem,
];

class DataBase {
  constructor() {
    this.connection = new Sequelize(config);
    this.init();
  }

  init() {
    models.forEach((model) => model.init(this.connection));

    models.forEach((model) => {
      if (model.associate) {
        model.associate(this.connection.models);
      }
    });
  }
}

const database = new DataBase();

const { connection: sequelize } = database;

export { database, sequelize };
export default {
  User,
  Cart,
  Order,
  OrderItem,
  Payment,
  Product,
  Category,
  CartItem,
  sequelize,
};
