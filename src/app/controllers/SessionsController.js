import User from "../models/entity/User.js";
import JWT from "jsonwebtoken";
import authConfig from "../../config/auth.js";

class SessionsController {
  async create(req, res) {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ error: "Usuário não existente" });
    }

    if (!(await user.checkPassword(password))) {
      return res.status(401).json({ error: "Senha errada" });
    }
    const { id, name, role } = user;

    return res.json({
      user: {
        id,
        name,
        email,
        role,
      },
      token: JWT.sign({ id, role }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }
}
export default new SessionsController();
