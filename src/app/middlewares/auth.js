import JWT from "jsonwebtoken";
import { promisify } from "util";
import authConfig from "../../config/auth.js";

export default async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: "Token não fornecido." });
  }

  const [, token] = authHeader.split(" ");

  try {
    const decoded = await promisify(JWT.verify)(token, authConfig.secret);

    req.userId = decoded.id;

    return next();
  } catch {
    return res.status(401).json({ error: "Token inválido." });
  }
};
