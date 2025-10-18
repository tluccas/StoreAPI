import OrderService from "../services/OrderService.js";
const service = new OrderService();

class OrderController {
  async findAll(req, res) {
    const orders = await service.findAll();
    return res
      .status(orders ? 200 : 400)
      .json(orders || { erro: "Nenhum pedido encontrado" });
  }

  async findById(req, res) {
    const id = parseInt(req.params.id);
    try {
      const order = await service.findById(id);
      return res.status(200).json(order);
    } catch (error) {
      return res
        .status(404)
        .json({ erro: error.message || "Pedido não encontrado" });
    }
  }

  async findByUserId(req, res) {
    const userId = parseInt(req.params.userId);
    try {
      const orders = await service.findByUserId(userId);
      return res.status(200).json(orders);
    } catch (error) {
      return res.status(404).json({
        erro: error.message || "Nenhum pedido encontrado para este usuário",
      });
    }
  }

  async create(req, res) {
    try {
      const { userId, items } = req.body;

      const novo = await service.create({
        userId,
        items,
      });

      return res.status(201).json(novo);
    } catch (error) {
      console.error("Erro ao criar pedido:", error);
      return res.status(500).json({ erro: "Não foi possível criar o pedido." });
    }
  }

  async updateStatus(req, res) {
    const id = parseInt(req.params.id);
    const { status } = req.body;

    try {
      const atualizado = await service.updateStatus(id, status);
      return res.status(200).json(atualizado);
    } catch (error) {
      console.error("Erro ao atualizar status do pedido:", error);

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

export default new OrderController();
