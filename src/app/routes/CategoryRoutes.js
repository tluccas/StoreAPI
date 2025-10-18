import { Router } from "express";
import CategoryController from "../controllers/CategoryController.js";

const routes = new Router();

routes.get("/", CategoryController.findAll);
routes.get("/:id", CategoryController.findById);
routes.post("/", CategoryController.create);
routes.put("/:id", CategoryController.update);
routes.delete("/:id", CategoryController.delete);

export default routes;
