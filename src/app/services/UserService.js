import models from "../../database/index.js";
const { User } = models;

class UserService {
  constructor() {}

  async findAll() {
    const data = await User.findAll({
      limit: 100,
    });

    return data;
  }

  async findById(id) {
    const user = await User.findByPk(id);
    if (!user) {
      throw new Error(`Usuário com ID ${id} não encontrado.`);
    }
    return user;
  }

  async findByEmail(email) {
    const user = await User.findOne({
      where: {
        email: email,
      },
    });

    if (!user) {
      throw new Error(`Nenhum usuário encontrado com o email ${email}.`);
    }
    return user;
  }

  async create({ name, email, password, role }) {
    try {
      if (!name || !email || !password) {
        throw new Error("Parâmetros inválidos para criar usuário.");
      }

      const newUser = await User.create({
        name,
        email,
        password,
        role: role || "customer",
      });

      return newUser;
    } catch (error) {
      console.error("Erro ao criar usuário:", error);
      throw new Error("Não foi possível criar o usuário.");
    }
  }

  async update(id, name, email, password, role) {
    try {
      const user = await this.findById(id);
      if (!name || !email) {
        const err = new Error("Parâmetros inválidos para atualizar usuário.");
        err.status = 400;
        throw err;
      }
      await user.update({
        name,
        email,
        password,
        role,
      });

      return user;
    } catch (error) {
      console.error("Erro ao atualizar usuário:", error);
      throw error;
    }
  }

  async delete(id) {
    try {
      const user = await this.findById(id);
      await user.destroy();
      return true;
    } catch (error) {
      console.error("Erro ao remover usuário:", error);
      throw error.status
        ? error
        : new Error("Não foi possível remover o usuário.");
    }
  }
}

export default UserService;
