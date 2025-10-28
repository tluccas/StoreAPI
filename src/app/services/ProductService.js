import models from "../../database/index.js";
const { Product } = models;

class ProductService {
  constructor() {}

  async findAll(page, limit) {
    try {
      const offset = (page - 1) * limit;

      const totalItems = await Product.count();
      const data = await Product.findAll({
        limit,
        offset,
        order: [["id", "ASC"]],
      });

      return {
        page,
        perPage: limit,
        totalItems,
        totalPages: Math.ceil(totalItems / limit),
        data,
      };
    } catch (err) {
      console.error("Erro no ProductService.findAll:", err);
      throw new Error("Falha ao buscar produtos no banco de dados");
    }
  }

  async findById(id) {
    const product = await Product.findByPk(id);
    if (!product) {
      throw new Error(`Produto com ID ${id} não encontrado.`);
    }
    return product;
  }

  async findByPreco(preco) {
    const roundedPrice = parseFloat(preco.toFixed(2));
    const products = await Product.findAll({
      where: {
        price: roundedPrice,
      },
    });

    if (products == null || products.length === 0) {
      throw new Error(`Nenhum produto encontrado com o preço ${roundedPrice}.`);
    }
    return products;
  }

  async create({ name, price, description, stock, image, categoryId }) {
    try {
      if (!name || !price || !stock || !categoryId) {
        throw new Error("Parâmetros inválidos para criar produto.");
      }

      const newProduct = await Product.create({
        name,
        description: description || null,
        price,
        stock,
        image: image || null,
        categoryId,
      });

      return newProduct;
    } catch (error) {
      console.error("Erro ao criar produto:", error);
      throw new Error("Não foi possível criar o produto.");
    }
  }

  async update(id, name, description, price, stock) {
    try {
      const product = await this.findById(id);
      if (!name || !price || !description || !stock) {
        const err = new Error("Parâmetros inválidos para atualizar produto.");
        err.status = 400;
        throw err;
      }
      await product.update({
        name: name,
        description: description,
        price: price,
        stock: stock,
      });

      return product;
    } catch (error) {
      console.error("Erro ao atualizar produto:", error);
      throw error;
    }
  }

  async updateStock(id, newStock) {
    try {
      const product = await this.findById(id);
      if (newStock == null || isNaN(newStock) || newStock < 0) {
        const err = new Error("Parâmetro inválido para atualizar estoque.");
        err.status = 400;
        throw err;
      }
      await product.update({
        stock: newStock,
      });

      return product;
    } catch (error) {
      console.error("Erro ao atualizar estoque do produto:", error);
      throw error;
    }
  }

  async delete(id) {
    try {
      const product = await this.findById(id);
      await product.destroy();
      return true;
    } catch (error) {
      console.error("Erro ao remover produto:", error);
      throw error.status
        ? error
        : new Error("Não foi possível remover o produto.");
    }
  }
}

export default ProductService;
