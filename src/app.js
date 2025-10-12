import express from 'express';
import produtoRoutes from './app/routes/ProdutoRoutes';

class App {
    constructor(){
        this.server = express()
        this.middlewares();
        this.routes();
    }

    middlewares() {
        this.server.use(express.json());
    }

    routes(){
        this.server.use('/produtos', produtoRoutes);
    }
}

export default new App().server;
