const {Router} = require('express');
const routes = new Router();
const ProdutoController = require('../controller/ProdutoController');

routes.get('/preco', ProdutoController.listarPorPreço);
routes.get('/', ProdutoController.listarTodos);
routes.get('/:id', ProdutoController.listarPorID);


routes.post('/', ProdutoController.criar);

routes.put('/:id', ProdutoController.atualizar);
routes.put('/estoque/:id', ProdutoController.atualizarEstoque);

routes.delete('/:id', ProdutoController.deletar);

module.exports = routes;