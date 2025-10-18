import { Router } from "express";
import UserController from "../controllers/UserController.js";

const routes = new Router();

routes.get("/email", UserController.findByEmail);
routes.get("/", UserController.findAll);
routes.get("/:id", UserController.findById);
routes.post("/", UserController.create);
routes.put("/:id", UserController.update);
routes.delete("/:id", UserController.delete);

export default routes;
