import {Router} from 'express';
import ProdutoController from '../controller/ProdutoController';

const routes = new Router();

routes.get('/preco', ProdutoController.listarPorPreço);
routes.get('/', ProdutoController.listarTodos);
routes.get('/:id', ProdutoController.listarPorID);


routes.post('/', ProdutoController.criar);

routes.put('/:id', ProdutoController.atualizar);
routes.put('/estoque/:id', ProdutoController.atualizarEstoque);

routes.delete('/:id', ProdutoController.deletar);

export default routes;