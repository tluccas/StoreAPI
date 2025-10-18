import { Router } from "express";
import OrderController from "../controllers/OrderController.js";

const routes = new Router();

routes.get("/user/:userId", OrderController.findByUserId);
routes.get("/", OrderController.findAll);
routes.get("/:id", OrderController.findById);
routes.post("/", OrderController.create);
routes.put("/status/:id", OrderController.updateStatus);
routes.delete("/:id", OrderController.delete);

export default routes;
