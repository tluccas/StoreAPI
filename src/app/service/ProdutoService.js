class ProdutoService {
  constructor() {
    this.produtos = [
      { id: 1, nome: "Café", preco: 15.5, estoque: 10 },
      { id: 2, nome: "Arroz 1kg", preco: 10.5, estoque: 50 },
      { id: 3, nome: "Feijão 1kg", preco: 8.5, estoque: 20 },
      { id: 4, nome: "Leite 2L", preco: 8.5, estoque: 30 },
    ];
  }

  listarTodos() {
    return this.produtos;
  }

  listarPorID(id) {
    return this.produtos.find((item) => item.id === id);
  }

  listarPorPreco(preco) {
    return this.produtos.filter(
      (item) => item.preco.toFixed(2) == preco.toFixed(2),
    );
  }

  adicionar(nome, preco, estoque) {
    const id = this.produtos[this.produtos.length - 1].id + 1;
    const novoProduto = { id, nome, preco, estoque };
    this.produtos.push(novoProduto);
    return novoProduto;
  }

  atualizar(id, nome, preco, estoque) {
    const index = this.produtos.findIndex((item) => item.id === id);
    if (index < 0) return null;
    this.produtos[index] = { id, nome, preco, estoque };
    return this.produtos[index];
  }

  atualizarEstoque(id, novoEstoque) {
    const produto = this.listarPorID(id);
    if (!produto) return null;

    produto.estoque = novoEstoque;
    return produto;
  }

  remover(id) {
    const index = this.produtos.findIndex((item) => item.id === id);
    if (index < 0) return null;
    return this.produtos.splice(index, 1)[0];
  }
}

export default ProdutoService;
