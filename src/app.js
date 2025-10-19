import express from "express";
import produtoRoutes from "./app/routes/ProdutoRoutes.js";
import categoryRoutes from "./app/routes/CategoryRoutes.js";
import userRoutes from "./app/routes/UserRoutes.js";
import orderRoutes from "./app/routes/OrderRoutes.js";
import cartRoutes from "./app/routes/CartRoutes.js";
import orderItemRoutes from "./app/routes/OrderItemRoutes.js";
import paymentRoutes from "./app/routes/PaymentRoutes.js";

import "./database/index.js";

class App {
  constructor() {
    this.server = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(express.json());
  }

  routes() {
    this.server.use("/produtos", produtoRoutes);
    this.server.use("/categorias", categoryRoutes);
    this.server.use("/usuarios", userRoutes);
    this.server.use("/pedidos", orderRoutes);
    this.server.use("/carrinho", cartRoutes);
    this.server.use("/itens-pedido", orderItemRoutes);
    this.server.use("/pagamentos", paymentRoutes);
  }
}

export default new App().server;
