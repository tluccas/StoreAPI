import CartService from "../services/CartService.js";
const service = new CartService();

class CartController {
  async findByUserId(req, res) {
    const { userId } = req;
    try {
      const cart = await service.findByUserId(userId);
      if (!cart) {
        return res.status(404).json({ erro: "Carrinho não encontrado" });
      }
      return res.status(200).json(cart);
    } catch (error) {
      return res
        .status(404)
        .json({ erro: error.message || "Carrinho não encontrado" });
    }
  }

  async addItem(req, res) {
    try {
      const { userId } = req;
      const { productId, quantity } = req.body;
      const cart = await service.addItem(userId, productId, quantity);
      return res.status(200).json(cart);
    } catch (error) {
      return res
        .status(500)
        .json({ erro: error.message || "Não foi possível adicionar o item." });
    }
  }

  async removeItem(req, res) {
    try {
      const { userId } = req;
      const { productId, quantity } = req.body;
      const cart = await service.removeItem(userId, productId, quantity);
      return res.status(200).json(cart);
    } catch (error) {
      return res
        .status(500)
        .json({ erro: error.message || "Não foi possível remover o item." });
    }
  }

  async delete(req, res) {
    const { userId } = req;

    try {
      await service.delete(userId);
      return res.status(200).json({ sucesso: true });
    } catch (error) {
      const status =
        error.status || (error.message.includes("não encontrado") ? 404 : 500);
      return res.status(status).json({ erro: error.message });
    }
  }
}

export default new CartController();
