import OrderItemService from "../services/OrderItemService.js";
import {
  orderItemSchema,
  orderItemUpdateSchema,
} from "../validators/OrderItemValidator.js";
const service = new OrderItemService();

class OrderItemController {
  async findAll(req, res) {
    const items = await service.findAll();
    return res
      .status(items ? 200 : 400)
      .json(items || { erro: "Nenhum item de pedido encontrado" });
  }

  async findById(req, res) {
    const id = parseInt(req.params.id);
    try {
      const item = await service.findById(id);
      return res.status(200).json(item);
    } catch (error) {
      return res
        .status(404)
        .json({ erro: error.message || "Item de pedido não encontrado" });
    }
  }

  async findByOrderId(req, res) {
    const orderId = parseInt(req.params.orderId);
    try {
      const items = await service.findByOrderId(orderId);
      return res.status(200).json(items);
    } catch (error) {
      return res.status(404).json({
        erro:
          error.message || "Nenhum item de pedido encontrado para este pedido",
      });
    }
  }

  async create(req, res) {
    try {
      await orderItemSchema.validate(req.body, { abortEarly: false });

      const { orderId, productId, quantity, price } = req.body;

      const novo = await service.create({
        orderId,
        productId,
        quantity,
        price,
      });

      return res.status(201).json(novo);
    } catch (error) {
      if (error.name === "ValidationError") {
        return res.status(400).json({
          erro: "Erro de validação",
          details: error.errors,
        });
      }

      console.error("Erro ao criar item de pedido:", error);
      return res
        .status(500)
        .json({ erro: "Não foi possível criar o item de pedido." });
    }
  }

  async update(req, res) {
    const id = parseInt(req.params.id);

    try {
      await orderItemUpdateSchema.validate(req.body, { abortEarly: false });

      const { quantity } = req.body;

      const atualizado = await service.update(id, quantity);
      return res.status(200).json(atualizado);
    } catch (error) {
      if (error.name === "ValidationError") {
        return res.status(400).json({
          erro: "Erro de validação",
          details: error.errors,
        });
      }

      console.error("Erro ao atualizar item de pedido:", error);

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

export default new OrderItemController();
