import models from "../../database/migrations/index.js";
const { Order, OrderItem } = models;

class OrderService {
  constructor() {}

  async findAll() {
    const data = await Order.findAll({
      limit: 100,
      include: [{ model: OrderItem, as: "items" }],
    });

    return data;
  }

  async findById(id) {
    const order = await Order.findByPk(id, {
      include: [{ model: OrderItem, as: "items" }],
    });
    if (!order) {
      throw new Error(`Pedido com ID ${id} não encontrado.`);
    }
    return order;
  }

  async findByUserId(userId) {
    const orders = await Order.findAll({
      where: {
        userId: userId,
      },
      include: [{ model: OrderItem, as: "items" }],
    });

    if (orders == null || orders.length === 0) {
      throw new Error(`Nenhum pedido encontrado para o usuário ${userId}.`);
    }
    return orders;
  }

  async create({ userId, items }) {
    try {
      if (!userId || !items || items.length === 0) {
        throw new Error("Parâmetros inválidos para criar pedido.");
      }

      const total = items.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0,
      );

      const newOrder = await Order.create({
        userId,
        total,
        status: "pending",
      });

      for (const item of items) {
        await OrderItem.create({
          orderId: newOrder.id,
          productId: item.productId,
          quantity: item.quantity,
          price: item.price,
        });
      }

      return this.findById(newOrder.id);
    } catch (error) {
      console.error("Erro ao criar pedido:", error);
      throw new Error("Não foi possível criar o pedido.");
    }
  }

  async updateStatus(id, status) {
    try {
      const order = await this.findById(id);
      if (!status) {
        const err = new Error(
          "Parâmetro 'status' inválido para atualizar pedido.",
        );
        err.status = 400;
        throw err;
      }
      await order.update({
        status,
      });

      return order;
    } catch (error) {
      console.error("Erro ao atualizar status do pedido:", error);
      throw error;
    }
  }

  async delete(id) {
    try {
      const order = await this.findById(id);
      await OrderItem.destroy({ where: { orderId: id } });
      await order.destroy();
      return true;
    } catch (error) {
      console.error("Erro ao remover pedido:", error);
      throw error.status
        ? error
        : new Error("Não foi possível remover o pedido.");
    }
  }
}

export default OrderService;
