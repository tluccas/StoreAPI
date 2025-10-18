import Product from "../models/entity/Product.js";

class ProductService {
  constructor() {}

  async findAll() {
    const data = await Product.findAll({
      limit: 1000,
    });

    return data;
  }

  async findById(id) {
    const product = await Product.findByPk(id);
    if (!product) {
      throw new Error(`Produto com ID ${id} não encontrado.`);
    }
    return product;
  }

  async findByPreco(preco) {
    const products = await Product.findAll({
      where: {
        price: preco,
      },
    });

    if (products == null || products.length === 0) {
      throw new Error(`Nenhum produto encontrado com o preço ${preco}.`);
    }
    return products;
  }

  async create(nome, preco, estoque, imagem, categoriaId) {
    // POSSÍVEL MELHORIA AQUI
    try {
      if (!nome || !preco || !estoque || !categoriaId) {
        throw new Error("Parâmetros inválidos para criar pagamento.");
      }

      const newProduct = await Product.create({
        name: nome,
        price: preco,
        stock: estoque,
        image: imagem,
        categoryId: categoriaId,
      });
      return newProduct;
    } catch (error) {
      console.error("Erro ao criar produto:", error);
      throw new Error("Não foi possível criar o produto.");
    }
  }

  async update(id, nome, preco, estoque) {
    try {
      const product = await this.listarPorID(id);

      await product.update({
        name: nome,
        price: preco,
        stock: estoque,
      });

      return product;
    } catch (error) {
      console.error("Erro ao atualizar produto:", error);
      throw new Error("Não foi possível atualizar o produto.");
    }
  }

  async updateEstoque(id, novoEstoque) {
    try {
      const product = await this.listarPorID(id);

      await product.update({
        stock: novoEstoque,
      });

      return product;
    } catch (error) {
      console.error("Erro ao atualizar estoque do produto:", error);
      throw new Error("Não foi possível atualizar o estoque do produto.");
    }
  }

  async delete(id) {
    try {
      const product = await this.listarPorID(id);

      await product.destroy();
      return true;
    } catch (error) {
      console.error("Erro ao remover produto:", error);
      throw new Error("Não foi possível remover o produto.");
    }
  }
}

export default ProductService;
