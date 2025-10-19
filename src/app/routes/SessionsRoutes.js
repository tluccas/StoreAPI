import SessionsController from "../controllers/SessionsController.js";
import { Router } from "express";

const routes = new Router();

routes.post("/", SessionsController.create);

export default routes;
