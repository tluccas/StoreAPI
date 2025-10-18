import models from "../../database/migrations/index.js";
const { Payment, Order } = models;

class PaymentService {
  constructor() {}

  async findAll() {
    const data = await Payment.findAll({
      limit: 1000,
    });

    return data;
  }

  async findById(id) {
    const payment = await Payment.findByPk(id);
    if (!payment) {
      throw new Error(`Pagamento com ID ${id} não encontrado.`);
    }
    return payment;
  }

  async findByOrderId(orderId) {
    const payments = await Payment.findAll({
      where: {
        orderId: orderId,
      },
    });

    if (payments == null || payments.length === 0) {
      throw new Error(`Nenhum pagamento encontrado para o pedido ${orderId}.`);
    }
    return payments;
  }

  async create({ orderId, amount, method }) {
    try {
      if (!orderId || !amount || !method) {
        throw new Error("Parâmetros inválidos para criar pagamento.");
      }

      const order = await Order.findByPk(orderId);
      if (!order) {
        throw new Error("Pedido não encontrado.");
      }

      const newPayment = await Payment.create({
        orderId,
        amount,
        method,
        status: "completed",
      });

      order.status = "paid";
      await order.save();

      return newPayment;
    } catch (error) {
      console.error("Erro ao criar pagamento:", error);
      throw new Error("Não foi possível criar o pagamento.");
    }
  }

  async updateStatus(id, status) {
    try {
      const payment = await this.findById(id);
      if (!status) {
        const err = new Error(
          "Parâmetro 'status' inválido para atualizar pagamento.",
        );
        err.status = 400;
        throw err;
      }
      await payment.update({
        status,
      });

      return payment;
    } catch (error) {
      console.error("Erro ao atualizar status do pagamento:", error);
      throw error;
    }
  }

  async delete(id) {
    try {
      const payment = await this.findById(id);
      await payment.destroy();
      return true;
    } catch (error) {
      console.error("Erro ao remover pagamento:", error);
      throw error.status
        ? error
        : new Error("Não foi possível remover o pagamento.");
    }
  }
}

export default PaymentService;
