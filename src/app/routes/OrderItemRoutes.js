import { Router } from "express";
import OrderItemController from "../controllers/OrderItemController.js";

const routes = new Router();

routes.get("/order/:orderId", OrderItemController.findByOrderId);
routes.get("/", OrderItemController.findAll);
routes.get("/:id", OrderItemController.findById);
routes.post("/", OrderItemController.create);
routes.put("/:id", OrderItemController.update);
routes.delete("/:id", OrderItemController.delete);

export default routes;
