const isAdmin = (...role) => {
  return (req, res, next) => {
    try {
      if (!role.includes(req.user.role)) {
        throw new Error("invalid role");
      }
      next();
    } catch (error) {
      res.status(400).json({
        message: error.message,
      });
    }
  };
};
module.exports = isAdmin;
