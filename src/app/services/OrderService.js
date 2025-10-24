import models from "../../database/index.js";
import CartItem from "../models/entity/CartItem.js";
const { Order, OrderItem, Cart, Product } = models;

const sequelize = models.sequelize;

class OrderService {
  async findAll(userId) {
    try {
      const orders = await Order.findAll({
        include: [
          {
            model: OrderItem,
            as: "items",
            include: [Product],
          },
        ],
        order: [["createdAt", "DESC"]],
        where: {
          userId: userId,
        },
      });
      return orders;
    } catch (error) {
      console.error("Erro ao buscar pedidos:", error);
      throw new Error("Não foi possível buscar os pedidos.");
    }
  }

  async create({ userId, items }) {
    const t = await sequelize.transaction();
    try {
      if (!userId || !items || items.length === 0) {
        throw new Error("Parâmetros inválidos para criar pedido.");
      }

      const total = items.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0,
      );

      const newOrder = await Order.create(
        {
          userId,
          total,
          status: "pending",
        },
        { transaction: t },
      );

      for (const item of items) {
        await OrderItem.create(
          {
            orderId: newOrder.id,
            productId: item.productId,
            quantity: item.quantity,
            price: item.price,
          },
          { transaction: t },
        );
      }

      await t.commit();
      return this.findById(newOrder.id);
    } catch (error) {
      if (!t.finished) {
        await t.rollback();
      }
      console.error("Erro ao criar pedido:", error);
      throw new Error("Não foi possível criar o pedido.");
    }
  }

  async checkout(userId) {
    const t = await sequelize.transaction();

    try {
      const cart = await Cart.findOne({
        where: { userId },
        include: [
          // Busca todos os itens do carrinho com seus produtos associados
          {
            model: CartItem,
            as: "items", //Array de items do carrinho
            include: [Product], //Produto associado ao CartItem
          },
        ],
        transaction: t,
      });

      if (!cart || !cart.items || cart.items.length === 0) {
        throw new Error("Seu carrinho está vazio.");
      }

      let total = 0;
      for (const item of cart.items) {
        if (!item.Product) {
          throw new Error(
            `Produto com ID ${item.productId} não encontrado no carrinho.`,
          );
        }
        if (item.Product.stock < item.quantity) {
          throw new Error(
            `Estoque insuficiente para o produto: ${item.Product.name}`,
          );
        }
        total += item.Product.price * item.quantity;
      }

      const order = await Order.create(
        {
          userId,
          total,
          status: "pending",
        },
        { transaction: t },
      );

      for (const item of cart.items) {
        await OrderItem.create(
          {
            orderId: order.id,
            productId: item.productId,
            quantity: item.quantity,
            price: item.Product.price,
          },
          { transaction: t },
        );

        const product = item.Product;
        product.stock -= item.quantity;
        await product.save({ transaction: t });
      }

      await CartItem.destroy({ where: { cartId: cart.id }, transaction: t });

      await t.commit();

      return this.findById(order.id);
    } catch (error) {
      if (!t.finished) {
        await t.rollback();
      }
      console.error("Erro ao finalizar pedido:", error);
      throw new Error(error.message || "Não foi possível finalizar o pedido.");
    }
  }
}

export default OrderService;
