express = require('express');
const produtoRoutes = require('./routes/ProdutoRoutes');

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

module.exports = new App().server;
