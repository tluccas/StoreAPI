import Product from "../models/entity/Product.js";

class ProductService {
  constructor() {
    this.produtos = [
      { id: 1, nome: "Café", preco: 15.5, estoque: 10 },
      { id: 2, nome: "Arroz 1kg", preco: 10.5, estoque: 50 },
      { id: 3, nome: "Feijão 1kg", preco: 8.5, estoque: 20 },
      { id: 4, nome: "Leite 2L", preco: 8.5, estoque: 30 },
    ];
  }

  async listarTodos() {
    const data = await Product.findAll({
      limit: 1000,
    });

    return data;
  }

  async listarPorID(id) {
    const product = await Product.findByPk(id);
    if (!product) {
      throw new Error(`Produto com ID ${id} não encontrado.`);
    }
    return product;
  }

  async listarPorPreco(preco) {
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

  async adicionar(nome, preco, estoque, imagem, categoriaId) { // POSSÍVEL MELHORIA AQUI
    try{
      const newProduct = await Product.create({
        name: nome,
        price: preco,
        stock: estoque,
        image: imagem,
        categoryId: categoriaId,
      });
      return newProduct;
    }catch(error){
      console.error("Erro ao criar produto:", error);
      throw new Error("Não foi possível criar o produto.");
  }
}

 async atualizar(id, nome, preco, estoque) {
  try {
    const product = await this.listarPorID(id);

    await product.update({
      name: nome,
      price: preco,
      stock: estoque
    });

    return product;
  } catch (error) {
    console.error("Erro ao atualizar produto:", error);
    throw new Error("Não foi possível atualizar o produto.");
  }
}


  async atualizarEstoque(id, novoEstoque) {
    try{
      const product = await this.listarPorID(id);
      
      await product.update({
        stock: novoEstoque
      });

      return product;
    }catch(error){
      console.error("Erro ao atualizar estoque do produto:", error);
      throw new Error("Não foi possível atualizar o estoque do produto.");
    }
  }

  async remover(id) {
    try{
      const product = await this.listarPorID(id);

      await product.destroy();
      return true;
    }catch(error){
      console.error("Erro ao remover produto:", error);
      throw new Error("Não foi possível remover o produto.");
    }
    
  }

  }


export default ProductService;
