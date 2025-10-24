import PaymentService from "../services/PaymentService.js";
const service = new PaymentService();

class PaymentController {
  async findAll(req, res) {
    const payments = await service.findAll();
    return res
      .status(payments ? 200 : 400)
      .json(payments || { erro: "Nenhum pagamento encontrado" });
  }

  async findById(req, res) {
    const id = parseInt(req.params.id);
    try {
      const payment = await service.findById(id);
      return res.status(200).json(payment);
    } catch (error) {
      return res
        .status(404)
        .json({ erro: error.message || "Pagamento não encontrado" });
    }
  }

  async findByOrderId(req, res) {
    const orderId = parseInt(req.params.orderId);
    try {
      const payments = await service.findByOrderId(orderId);
      return res.status(200).json(payments);
    } catch (error) {
      return res.status(404).json({
        erro: error.message || "Nenhum pagamento encontrado para este pedido",
      });
    }
  }

  async create(req, res) {
    try {
      const { orderId, amount, method } = req.body;

      const novo = await service.create({
        orderId,
        amount,
        method,
      });

      return res.status(201).json(novo);
    } catch (error) {
      console.error("Erro ao criar pagamento:", error);
      return res
        .status(500)
        .json({ erro: "Erro ao criar pagamento: " + error.message });
    }
  }

  async updateStatus(req, res) {
    const id = parseInt(req.params.id);
    const { status } = req.body;
    const { userId } = req; // Obtém o ID do usuário autenticado

    try {
      const atualizado = await service.updateStatus(id, status, userId);
      return res.status(200).json(atualizado);
    } catch (error) {
      console.error("Erro ao atualizar status do pagamento:", error);

      const statusCode =
        error.status || (error.message.includes("não encontrado") ? 404 : 500);

      return res.status(statusCode).json({ erro: error.message });
    }
  }

  async delete(req, res) {
    const id = parseInt(req.params.id);

    try {
      await service.delete(id);
      return res.status(200).json({ sucesso: true });
    } catch (error) {
      const status =
        error.status || (error.message.includes("não encontrado") ? 404 : 500);
      return res.status(status).json({ erro: error.message });
    }
  }
}

export default new PaymentController();
