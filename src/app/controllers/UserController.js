import UserService from "../services/UserService.js";
import { userSchema, userUpdateSchema } from "../validators/UserValidator.js";

const service = new UserService();

class UserController {
  async findAll(req, res) {
    const users = await service.findAll();
    return res
      .status(users ? 200 : 400)
      .json(users || { erro: "Nenhum usuário encontrado" });
  }

  async findById(req, res) {
    const id = parseInt(req.params.id);
    try {
      const user = await service.findById(id);
      return res.status(200).json(user);
    } catch (error) {
      return res
        .status(404)
        .json({ erro: error.message || "Usuário não encontrado" });
    }
  }

  async findByEmail(req, res) {
    const email = req.query.email;

    if (!email) {
      return res.status(400).json({ erro: "Parâmetro 'email' obrigatório" });
    }

    try {
      const user = await service.findByEmail(email);
      return res.status(200).json(user);
    } catch (error) {
      return res
        .status(404)
        .json({ erro: error.message || "Usuário não encontrado" });
    }
  }

  async create(req, res) {
    try {
      await userSchema.validate(req.body, { abortEarly: false });
      const { name, email, password, role } = req.body;

      const novo = await service.create({
        name,
        email,
        password,
        role,
      });

      return res
        .status(201)
        .json({ id: novo.id, name: novo.name, email: novo.email });
    } catch (error) {
      if (error.name === "ValidationError") {
        return res.status(400).json({ errors: error.errors });
      }
      return res
        .status(error.status || 500)
        .json({ erro: error.message || "Não foi possível criar o usuário." });
    }
  }

  async update(req, res) {
    const id = parseInt(req.params.id);

    try {
      await userUpdateSchema.validate(req.body, { abortEarly: false });
      const { name, email, password, role } = req.body;

      const atualizado = await service.update(id, name, email, password, role);
      return res.status(200).json(atualizado);
    } catch (error) {
      if (error.name === "ValidationError") {
        return res.status(400).json({ errors: error.errors });
      }
      console.error("Erro ao atualizar usuário:", error);

      const status =
        error.status || (error.message.includes("não encontrado") ? 404 : 500);

      return res.status(status).json({ erro: error.message });
    }
  }

  async delete(req, res) {
    const id = parseInt(req.params.id);

    try {
      await service.delete(id);
      return res.status(200).json({ sucesso: true });
    } catch (error) {
      const status =
        error.status || (error.message.includes("não encontrado") ? 404 : 500);
      return res.status(status).json({ erro: error.message });
    }
  }
}

export default new UserController();
