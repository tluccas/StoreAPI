import ProdutoService from "../services/ProductService";
import {
  productSchema,
  productUpdateSchema,
  productStockSchema,
} from "../validators/ProductValidator.js";
const service = new ProdutoService();

class ProdutoController {
  listarTodos(req, res) {
    return res.json(service.findAll());
  }

  async findAll(req, res) {
    const page = parseInt(req.query.page) || 1;
    const limit = 25;

    try {
      const produtos = await service.findAll(page, limit);
      return res.status(200).json(produtos);
    } catch (error) {
      console.error("Erro no ProductController.findAll:", error.message);

      if (error.message.includes("banco de dados")) {
        return res.status(500).json({
          erro: "Erro interno ao buscar produtos. Tente novamente mais tarde ou entre em contato com o suporte.",
        });
      }

      return res.status(400).json({
        erro: error.message || "Erro inesperado ao buscar produtos.",
      });
    }
  }

  async findById(req, res) {
    const id = parseInt(req.params.id);
    try {
      const product = await service.findById(id);
      return res.status(200).json(product);
    } catch (error) {
      return res
        .status(404)
        .json({ erro: error.message || "Produto não encontrado" });
    }
  }

  async findByPrice(req, res) {
    const precoQuery = req.query.price;

    if (!precoQuery) {
      return res.status(400).json({ erro: "Parâmetro 'price' obrigatório" });
    }

    const preco = parseFloat(precoQuery);
    if (isNaN(preco)) {
      return res.status(400).json({ erro: "Parâmetro 'price' inválido" });
    }

    const products = await service.findByPreco(preco);
    const status = products.length > 0 ? 200 : 404;
    return res
      .status(status)
      .json(
        products.length > 0 ? products : { erro: "Produtos não encontrados" },
      );
  }

  async criar(req, res) {
    try {
      await productSchema.validate(req.body, { abortEarly: false });

      const { name, price, stock, categoryId, image, description } = req.body;

      const novo = await service.create({
        name,
        price,
        description,
        stock,
        image: image || null,
        categoryId,
      });

      return res.status(201).json(novo);
    } catch (error) {
      if (error.name === "ValidationError") {
        return res.status(400).json({
          erro: "Erro de validação",
          details: error.errors,
        });
      }

      console.error("Erro ao criar produto:", error);
      return res
        .status(500)
        .json({ erro: "Não foi possível criar o produto." });
    }
  }

  async update(req, res) {
    const id = parseInt(req.params.id);

    try {
      await productUpdateSchema.validate(req.body, { abortEarly: false });

      const { name, description, price, stock } = req.body;

      const atualizado = await service.update(
        id,
        name,
        description,
        price,
        stock,
      );
      return res.status(200).json(atualizado);
    } catch (error) {
      if (error.name === "ValidationError") {
        return res.status(400).json({
          erro: "Erro de validação",
          details: error.errors,
        });
      }

      console.error("Erro ao atualizar produto:", error);

      const status =
        error.status || (error.message.includes("não encontrado") ? 404 : 500);

      return res.status(status).json({ erro: error.message });
    }
  }

  async updateStock(req, res) {
    const id = parseInt(req.params.id);

    try {
      await productStockSchema.validate(req.body, { abortEarly: false });

      const { stock } = req.body;

      const atualizado = await service.updateStock(id, stock);
      return res.status(200).json(atualizado);
    } catch (error) {
      if (error.name === "ValidationError") {
        return res.status(400).json({
          erro: "Erro de validação",
          details: error.errors,
        });
      }

      const status =
        error.status || (error.message.includes("não encontrado") ? 404 : 500);
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
        error.status || (error.message.includes("não encontrado") ? 404 : 500);
      return res.status(status).json({ erro: error.message });
    }
  }
}

export default new ProdutoController();
