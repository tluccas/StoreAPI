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
      const emailExists = await User.findOne({ where: { email } });
      if (emailExists) {
        const err = new Error("Email já está em uso.");
        err.status = 409;
        throw err;
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
      throw error.status
        ? error
        : new Error("Não foi possível criar o usuário.");
    }
  }

  async update(id, updateData) {
    const user = await this.findById(id);
    const { name, email, oldPassword, password, role } = updateData;

    if (email && email !== user.email) {
      const exists = await User.findOne({ where: { email } });
      if (exists) {
        const err = new Error("Email já está em uso.");
        err.status = 409;
        throw err;
      }
      user.email = email;
    }

    if (oldPassword) {
      const valid = await user.checkPassword(oldPassword);
      if (!valid) {
        const err = new Error("Senha antiga incorreta.");
        err.status = 400;
        throw err;
      }
      if (password) {
        user.password = password;
      }
    } else if (password) {
      const err = new Error("Para alterar a senha, informe a senha antiga.");
      err.status = 400;
      throw err;
    }

    if (name) user.name = name;
    if (role) user.role = role;

    await user.save();

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    };
  }
}

export default UserService;
