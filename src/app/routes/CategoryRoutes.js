import { Router } from "express";
import CategoryController from "../controllers/CategoryController.js";
import { authorize } from "../middlewares/authorize.js";
const routes = new Router();

routes.get("/", CategoryController.findAll);
routes.get("/:id", CategoryController.findById);
routes.post("/", authorize("admin"), CategoryController.create);
routes.put("/:id", authorize("admin"), CategoryController.update);
routes.delete("/:id", authorize("admin"), CategoryController.delete);

export default routes;
