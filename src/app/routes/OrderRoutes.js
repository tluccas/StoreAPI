import { Router } from "express";
import OrderController from "../controllers/OrderController.js";
import authMiddleware from "../middlewares/auth.js";
import { authorize } from "../middlewares/authorize.js";
const routes = new Router();

routes.get("/users/:userId", OrderController.findByUserId);

routes.post("/checkout", authMiddleware, OrderController.checkout);

routes.get("/", authorize("admin"), OrderController.findAll);
routes.get("/:id", OrderController.findById);
routes.post("/", authMiddleware, OrderController.create);
routes.put("/status/:id", OrderController.updateStatus);
routes.delete("/:id", OrderController.delete);

export default routes;
