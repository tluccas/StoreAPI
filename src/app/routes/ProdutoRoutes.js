import { Router } from "express";
import ProductController from "../controllers/ProductController";

const routes = new Router();

routes.get("/preco", ProductController.findByPrice);
routes.get("/", ProductController.findAll);
routes.get("/:id", ProductController.findById);

routes.post("/", ProductController.criar);

routes.put("/:id", ProductController.update);
routes.put("/estoque/:id", ProductController.updateStock);

routes.delete("/:id", ProductController.delete);

export default routes;
