import JWT from "jsonwebtoken";
import { promisify } from "util";
import authConfig from "../../config/auth.js";

export default async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: "Token não fornecido." });
  }

  const parts = authHeader.split(" ");
  if (parts.length !== 2) {
    return res
      .status(401)
      .json({ error: "Formato de token inválido. Use: Bearer <token>" });
  }

  const [scheme, token] = parts;

  if (scheme !== "Bearer") {
    return res.status(401).json({ error: "Tipo de autenticação inválido." });
  }

  if (!token || token.trim() === "") {
    return res.status(401).json({ error: "Token não fornecido." });
  }

  try {
    const decoded = await promisify(JWT.verify)(token, authConfig.secret);

    req.userId = decoded.id;
    req.userRole = decoded.role;

    return next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ error: "Token expirado." });
    }
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ error: "Token inválido." });
    }
    return res.status(401).json({ error: "Falha na autenticação." });
  }
};
