import CategoryService from "../services/CategoryService.js";
const service = new CategoryService();

class CategoryController {
  async findAll(req, res) {
    const categories = await service.findAll();
    return res
      .status(categories ? 200 : 400)
      .json(categories || { erro: "Nenhuma categoria encontrada" });
  }

  async findById(req, res) {
    const id = parseInt(req.params.id);
    try {
      const category = await service.findById(id);
      return res.status(200).json(category);
    } catch (error) {
      return res
        .status(404)
        .json({ erro: error.message || "Categoria não encontrada" });
    }
  }

  async create(req, res) {
    try {
      const { name } = req.body;

      const nova = await service.create({
        name,
      });

      return res.status(201).json(nova);
    } catch (error) {
      console.error("Erro ao criar categoria:", error);
      return res
        .status(500)
        .json({ erro: "Não foi possível criar a categoria." });
    }
  }

  async update(req, res) {
    const id = parseInt(req.params.id);
    const { name } = req.body;

    try {
      const atualizada = await service.update(id, name);
      return res.status(200).json(atualizada);
    } catch (error) {
      console.error("Erro ao atualizar categoria:", error);

      const status =
        error.status || (error.message.includes("não encontrada") ? 404 : 500);

      return res.status(status).json({ erro: error.message });
    }
  }

  async delete(req, res) {
    const id = parseInt(req.params.id);

    try {
      await service.delete(id);
      return res.status(200).json({ sucesso: true });
    } catch (error) {
      const status =
        error.status || (error.message.includes("não encontrada") ? 404 : 500);
      return res.status(status).json({ erro: error.message });
    }
  }
}

export default new CategoryController();
