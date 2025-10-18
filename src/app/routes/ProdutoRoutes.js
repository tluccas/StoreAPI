import { Router } from "express";
import ProductController from "../controllers/ProductController";

const routes = new Router();

routes.get("/preco", ProductController.listarPorPreço);
routes.get("/", ProductController.listarTodos);
routes.get("/:id", ProductController.listarPorID);

routes.post("/", ProductController.criar);

routes.put("/:id", ProductController.atualizar);
routes.put("/estoque/:id", ProductController.atualizarEstoque);

routes.delete("/:id", ProductController.deletar);

export default routes;
