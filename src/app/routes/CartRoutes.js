import { Router } from "express";
import CartController from "../controllers/CartController.js";

const routes = new Router();

routes.get("/:userId", CartController.findByUserId);
routes.post("/item", CartController.addItem);
routes.delete("/item", CartController.removeItem);
routes.delete("/:userId", CartController.delete);

export default routes;
