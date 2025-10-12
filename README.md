# Store API 🚀

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white)

Uma **API RESTful** para gerenciar produtos de forma rápida e eficiente.  
Permite **criar, listar, atualizar e deletar produtos**, além de filtrar por **ID ou preço**, gerenciar estoque e outras funcionalidades.

Desenvolvida com **Node.js, Express e MySQL**, seguindo a **arquitetura MVC**, garantindo **organização, escalabilidade e fácil manutenção**.

---

## 💻 Tecnologias

- **Node.js** – runtime JavaScript
- **Express** – framework web
- **MySQL** – banco de dados relacional
- **JavaScript (ES6+)**
- **MVC** – separação de responsabilidades (Controller, Service, Routes)


> [!NOTE]
> A persistência de produtos utilizando MySQL ainda está em desenvolvimento.
>No momento, para fins de teste, os produtos são armazenados em um array temporário.
>A funcionalidade de autenticação também está em desenvolvimento.

---

## ⚡ Funcionalidades

- ✅ Listar todos os produtos  
- ✅ Buscar produto por **ID**  
- ✅ Filtrar produtos por **preço** (`/produtos?preco=8.50`)  
- ✅ Adicionar novos produtos (nome, preço e estoque)  
- ✅ Atualizar produtos existentes  
- ✅ Atualizar apenas o **estoque**  
- ✅ Remover produtos do catálogo  

---

## 📂 Estrutura do Projeto

├─ src/
│ ├─ controller/ProdutoController.js
│ ├─ service/ProdutoService.js
│ ├─ routes/ProdutoRoutes.js
│ └─ app.js
│
├─ package.json
└─ README.md

- **controller/** – lógica das rotas  
- **service/** – lógica de negócio (CRUD e consultas)  
- **routes/** – definição das rotas da API  
- **app.js** – configuração do servidor Express  

## 🔗 Endpoints (até o momento)

- `GET /produtos`	Lista todos os produtos
- `GET	/produtos/:id`	Busca produto por ID
- `GET	/produtos?preco=VALOR`	Filtra produtos por preço
- `POST	/produtos`	Adiciona novo produto
- `PUT	/produtos/:id`	Atualiza produto (nome, preço, estoque)
- `PUT	/produtos/estoque/:id`	Atualiza apenas o estoque
- `DELETE /produtos/:id`	Remove produto


