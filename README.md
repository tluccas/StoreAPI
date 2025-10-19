# StoreAPI 🚀

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white)
![Sequelize](https://img.shields.io/badge/Sequelize-52B0E7?style=for-the-badge&logo=sequelize&logoColor=white)

Uma **API RESTful robusta e escalável** construída com **Node.js, Express e Sequelize**, projetada para fornecer toda a infraestrutura de back-end necessária para uma aplicação de **e-commerce moderna**.  

Ela permite gerenciar **produtos, categorias, usuários, carrinhos, pedidos e pagamentos**, seguindo a **arquitetura MVC** para manter o código modular, organizado e fácil de manter.

---

## 💻 Tecnologias

- **Node.js** – runtime JavaScript  
- **Express** – framework web rápido e flexível  
- **MySQL** – banco de dados relacional  
- **Sequelize** – ORM para manipulação de dados  
- **JavaScript (ES6+)**  
- **MVC** – separação de responsabilidades (Controller, Service, Routes)

---

## ⚡ Funcionalidades

- ✅ Gerenciamento completo de **produtos**  
  - Listar todos os produtos  
  - Buscar por **ID**  
  - Filtrar por **preço**  
  - Adicionar, atualizar (incluindo estoque) e remover produtos  
- ✅ Gerenciamento de **categorias**  
- ✅ Cadastro e autenticação de **usuários**  
- ✅ Controle de **carrinhos de compras**  
- ✅ Criação e acompanhamento de **pedidos**  
- ✅ Processamento de **pagamentos**  
- ✅ Estrutura modular e escalável para futuras funcionalidades

---

## 📂 Estrutura do Projeto
```text
src/
├─ controllers/        # Lógica das rotas
│  └─ ProdutoController.js
├─ services/           # Lógica de negócio (CRUD, consultas)
│  └─ ProdutoService.js
├─ routes/             # Definição das rotas da API
│  └─ ProdutoRoutes.js
├─ models/             # Models Sequelize (Product, User, Category...)
├─ database/           # Configuração do banco, migrations e seeders
└─ app.js              # Configuração do servidor Express
```


---

## 🔗 Endpoints (Produtos)

- `GET /produtos` – Lista todos os produtos  
- `GET /produtos/:id` – Busca produto por ID  
- `GET /produtos?preco=VALOR` – Filtra produtos por preço  
- `POST /produtos` – Adiciona novo produto  
- `PUT /produtos/:id` – Atualiza produto (nome, preço, estoque)  
- `PUT /produtos/estoque/:id` – Atualiza apenas o estoque  
- `DELETE /produtos/:id` – Remove produto 

> [!NOTE]
>Em breve a documentação com todos os endpoints estará disponível.
