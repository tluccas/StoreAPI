import models from "../../database/index.js";
const { Payment, Order } = models;

class PaymentService {
  constructor() {}

  async findAll() {
    const data = await Payment.findAll({
      limit: 100,
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

  async findByMethod(method) {
    try {
      const payments = await Payment.scope({
        method: [
          "byMethod",
          method.split(",").map((item) => item.toLowerCase()),
        ],
      }).findAll();
      if (payments == null || payments.length === 0) {
        throw new Error(`Nenhum pagamento encontrado para o método ${method}.`);
      }
      return payments;
    } catch (error) {
      console.error("Erro ao buscar pagamentos por método:", error);
      throw error;
    }
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
      });

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

      if (status === "confirmed") {
        const order = await Order.findByPk(payment.orderId);
        if (order) {
          order.status = "paid";
          await order.save();
        }
      }

      return payment;
    } catch (error) {
      console.error("Erro ao atualizar status do pagamento:", error);
      throw error;
    }
  }

  async getCurrentMensalPayments() {
    try {
      const payments = await Payment.scope("currentMonth").findAll();
      if (payments == null || payments.length === 0) {
        throw new Error("Nenhum pagamento encontrado para o mês atual.");
      }

      return payments;
    } catch (error) {
      console.error("Erro ao buscar pagamentos do mês atual:", error);
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
