import models from "../../database/index.js";
const { OrderItem, Product, Order } = models;

class OrderItemService {
  constructor() {}

  async findAll() {
    const data = await OrderItem.findAll({
      limit: 100,
      include: [Product],
    });

    return data;
  }

  async findById(id) {
    const item = await OrderItem.findByPk(id, { include: [Product] });
    if (!item) {
      throw new Error(`Item de pedido com ID ${id} não encontrado.`);
    }
    return item;
  }

  async findByOrderId(orderId) {
    const items = await OrderItem.findAll({
      where: {
        orderId: orderId,
      },
      include: [Product],
    });

    if (items == null || items.length === 0) {
      throw new Error(
        `Nenhum item de pedido encontrado para o pedido ${orderId}.`,
      );
    }
    return items;
  }

  async create({ orderId, productId, quantity, price }) {
    try {
      if (!orderId || !productId || !quantity || !price) {
        throw new Error("Parâmetros inválidos para criar item de pedido.");
      }

      const product = await Product.findByPk(productId);
      if (!product) {
        throw new Error("Produto não encontrado.");
      }
      if (product.stock < quantity) {
        throw new Error("Estoque insuficiente.");
      }

      const newItem = await OrderItem.create({
        orderId,
        productId,
        quantity,
        price,
      });

      product.stock -= quantity;
      await product.save();

      const order = await Order.findByPk(orderId, { include: [OrderItem] });
      const total = order.OrderItems.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0,
      );
      await order.update({ total });

      return newItem;
    } catch (error) {
      console.error("Erro ao criar item de pedido:", error);
      throw new Error("Não foi possível criar o item de pedido.");
    }
  }

  async update(id, quantity) {
    try {
      const item = await this.findById(id);
      if (!quantity || quantity <= 0) {
        const err = new Error(
          "Parâmetro 'quantity' inválido para atualizar item de pedido.",
        );
        err.status = 400;
        throw err;
      }

      const product = await Product.findByPk(item.productId);
      const quantityDiff = quantity - item.quantity;

      if (product.stock < quantityDiff) {
        throw new Error("Estoque insuficiente.");
      }

      product.stock -= quantityDiff;
      await product.save();

      await item.update({
        quantity,
      });

      const order = await Order.findByPk(item.orderId, {
        include: [OrderItem],
      });
      const total = order.OrderItems.reduce(
        (acc, curr) => acc + curr.price * curr.quantity,
        0,
      );
      await order.update({ total });

      return item;
    } catch (error) {
      console.error("Erro ao atualizar item de pedido:", error);
      throw error;
    }
  }

  async delete(id) {
    try {
      const item = await this.findById(id);

      const product = await Product.findByPk(item.productId);
      product.stock += item.quantity;
      await product.save();

      await item.destroy();

      const order = await Order.findByPk(item.orderId, {
        include: [OrderItem],
      });
      if (order) {
        const total = order.OrderItems.reduce(
          (acc, curr) => acc + curr.price * curr.quantity,
          0,
        );
        await order.update({ total });
      }

      return true;
    } catch (error) {
      console.error("Erro ao remover item de pedido:", error);
      throw error.status
        ? error
        : new Error("Não foi possível remover o item de pedido.");
    }
  }
}

export default OrderItemService;
