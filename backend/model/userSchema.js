const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const JWT = require("jsonwebtoken");
const crypto = require("crypto");
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter Your Name"],
    maxLength: [20, "Your Charector Length Must be under 20 charector"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Please Enter Your Email"],
    unique: true,
    validate: [validator.isEmail, "email is invalid"],
  },
  password: {
    type: String,
    required: [true, "Please Enter Password"],
    maxLength: [8, "password must be 8 charector"],
    select: false,
  },
  avatar: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  role: {
    type: String,
    default: "user",
  },
  resetPasswordToken: String,
  resetExpiryPassword: Date,
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});
userSchema.methods.generateToken = async function () {
  return await JWT.sign({ id: this._id }, process.env.SECRET_KEY, {
    expiresIn: "2d",
  });
};

userSchema.methods.comparePassword = async function (pass) {
  return await bcrypt.compare(pass, this.password);
};
userSchema.methods.getResetToken = async function () {
  const resetToken = await crypto.randomBytes(20).toString("hex");
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.resetExpiryPassword=Date.now() + 15 * 60 * 1000;
  return resetToken
};
module.exports = mongoose.model("user", userSchema);
