import models from "../../database/migrations/index.js";
const { Category } = models;

class CategoryService {
  constructor() {}

  async findAll() {
    const data = await Category.findAll({
      limit: 1000,
    });

    return data;
  }

  async findById(id) {
    const category = await Category.findByPk(id);
    if (!category) {
      throw new Error(`Categoria com ID ${id} não encontrada.`);
    }
    return category;
  }

  async create({ name }) {
    try {
      if (!name) {
        throw new Error("Parâmetros inválidos para criar categoria.");
      }

      const newCategory = await Category.create({
        name,
      });

      return newCategory;
    } catch (error) {
      console.error("Erro ao criar categoria:", error);
      throw new Error("Não foi possível criar a categoria.");
    }
  }

  async update(id, name) {
    try {
      const category = await this.findById(id);
      if (!name) {
        const err = new Error("Parâmetros inválidos para atualizar categoria.");
        err.status = 400;
        throw err;
      }
      await category.update({
        name: name,
      });

      return category;
    } catch (error) {
      console.error("Erro ao atualizar categoria:", error);
      throw error;
    }
  }

  async delete(id) {
    try {
      const category = await this.findById(id);
      await category.destroy();
      return true;
    } catch (error) {
      console.error("Erro ao remover categoria:", error);
      throw error.status
        ? error
        : new Error("Não foi possível remover a categoria.");
    }
  }
}

export default CategoryService;
