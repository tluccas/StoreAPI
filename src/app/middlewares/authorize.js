export const authorize = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.userRole) {
      return res.status(401).json({ error: "Role não definida." });
    }

    if (!allowedRoles.includes(req.userRole)) {
      return res.status(403).json({
        error: `Acesso negado. Roles permitidas: ${allowedRoles.join(", ")}`,
      });
    }

    return next();
  };
};
