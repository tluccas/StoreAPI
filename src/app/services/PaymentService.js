import models from "../../database/index.js";
const { Payment } = models;

class PaymentService {
  constructor() {}

  async listarTodos() {
    try {
      const data = await Payment.findAll({
        limit: 1000,
      });

      if (!data || data.length === 0) {
        throw new Error("Nenhum pagamento encontrado.");
      }

      return data;
    } catch (error) {
      console.error("Erro ao listar pagamentos:", error);
      throw new Error("Não foi possível listar os pagamentos.");
    }
  }

  async listarPorId(id) {
    try {
      const payment = await Payment.findByPk(id);
      if (!payment) {
        throw new Error(`Pagamento com ID ${id} não encontrado.`);
      }
      return payment;
    } catch (error) {
      console.error(`Erro ao buscar pagamento com ID ${id}:`, error);
      throw new Error("Não foi possível buscar o pagamento.");
    }
  }

  async listarPorOrderId(orderId) {
    try {
      const payments = await Payment.findAll({ where: { orderId } });
      if (!payments || payments.length === 0) {
        throw new Error(
          `Nenhum pagamento encontrado para o pedido ID ${orderId}.`,
        );
      }
      return payments;
    } catch (error) {
      console.error(
        `Erro ao buscar pagamentos para o pedido ID ${orderId}:`,
        error,
      );
      throw new Error("Não foi possível buscar os pagamentos.");
    }
  }

  async create(orderId, amount, method, status) {
    try {
      if (!orderId || !amount || !method || !status) {
        throw new Error("Parâmetros inválidos para criar pagamento.");
      }

      const newPayment = await Payment.create({
        orderId: orderId,
        amount: amount,
        method: method,
        status: status,
      });

      return newPayment;
    } catch (error) {
      console.error("Erro ao criar pagamento:", error);
      throw new Error("Não foi possível criar o pagamento.");
    }
  }

  async updateStatus(id, status) {
    try {
      const payment = await this.listarPorId(id);
      if (!payment) {
        throw new Error(`Pagamento com ID ${id} não encontrado.`);
      }
      await payment.update({ status: status });
    } catch (error) {
      console.error(
        `Erro ao atualizar status do pagamento com ID ${id}:`,
        error,
      );
      throw new Error("Não foi possível atualizar o status do pagamento.");
    }
  }

  async update(orderId, amount, method, status) {
    try {
      const payment = await this.listarPorId(orderId);
      if (!payment) {
        throw new Error(`Pagamento com ID ${orderId} não encontrado.`);
      }
      await payment.update({
        amount: amount,
        method: method,
        status: status,
      });
      return payment;
    } catch (error) {
      console.error(`Erro ao atualizar pagamento com ID ${orderId}:`, error);
      throw new Error("Não foi possível atualizar o pagamento.");
    }
  }

  async delete(id) {
    try {
      const payment = await this.listarPorId(id);
      if (!payment) {
        throw new Error(`Pagamento com ID ${id} não encontrado.`);
      }
      await payment.destroy();
      return true;
    } catch (error) {
      console.error(`Erro ao remover pagamento com ID ${id}:`, error);
      throw new Error("Não foi possível remover o pagamento.");
    }
  }
}

export default PaymentService;
