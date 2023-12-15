const JWT = require("jsonwebtoken");
const User = require("../model/userSchema");
const auth = async (req, res, next) => {
  const { token } = req.cookies;
  try {
    if (!token) {
      throw new Error("Please Login");
    }
    const decode = JWT.verify(token, process.env.SECRET_KEY);

    const userExist = await User.findById(decode.id);
    req.user = userExist;
    next();
  } catch (error) {
    // res.status(400).json({
    //   message: error.message,
    // });
  }
};
module.exports = auth;
