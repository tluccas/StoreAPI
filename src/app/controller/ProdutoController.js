import ProdutoService from '../service/ProdutoService';

const service = new ProdutoService();

class ProdutoController {

    listarTodos(req, res) {
        return res.json(service.listarTodos());
    }

    listarPorID(req, res) {
        const id = parseInt(req.params.id);
        const produto = service.listarPorID(id);
        return res.status(produto ? 200 : 404).json(produto || { erro: "Produto não encontrado" });
    }

    listarPorPreço(req, res) {
         const precoQuery = req.query.preco;

        if (!precoQuery) {
            return res.status(400).json({ erro: "Parâmetro 'preco' obrigatório" });
        }

        const preco = parseFloat(precoQuery);
        if (isNaN(preco)) {
            return res.status(400).json({ erro: "Parâmetro 'preco' inválido" });
        }

        const produtos = service.listarPorPreco(preco);
        const status = produtos.length > 0 ? 200 : 404;
        return res.status(status).json(produtos.length > 0 ? produtos : { erro: "Produtos não encontrados" });
    }

    criar(req, res) {
        const { nome, preco, estoque } = req.body;
        const novo = service.adicionar(nome, preco, estoque);
        return res.status(201).json(novo);
    }

    atualizar(req, res) {
        const id = parseInt(req.params.id);
        const { nome, preco, estoque } = req.body;
        const atualizado = service.atualizar(id, nome, preco, estoque);
        return res.status(atualizado ? 200 : 404).json(atualizado || { erro: "Produto não encontrado" });
    }

    atualizarEstoque(req, res) {
        const id = parseInt(req.params.id);
        const { estoque } = req.body;
        const atualizado = service.atualizarEstoque(id, estoque);
        return res.status(atualizado ? 200 : 404).json(atualizado || { erro: "Produto não encontrado" });
    }

    deletar(req, res) {
        const id = parseInt(req.params.id);
        const removido = service.remover(id);
        return res.status(removido ? 200 : 404).json(removido || { erro: "Produto não encontrado" });
    }
}

export default new ProdutoController();
