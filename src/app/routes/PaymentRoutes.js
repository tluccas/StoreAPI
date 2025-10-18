import { Router } from "express";
import PaymentController from "../controllers/PaymentController.js";

const routes = new Router();

routes.get("/order/:orderId", PaymentController.findByOrderId);
routes.get("/", PaymentController.findAll);
routes.get("/:id", PaymentController.findById);
routes.post("/", PaymentController.create);
routes.put("/status/:id", PaymentController.updateStatus);
routes.delete("/:id", PaymentController.delete);

export default routes;
