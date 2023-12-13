const User = require("../model/userSchema");
const options = require("../utils/cookiesOption");
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");
const cloudinary = require("cloudinary");
const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const { image } = req.files;

    const myCloud = await cloudinary.v2.uploader.upload(image.tempFilePath, {
      folder: "avatars",
      width: 150,
      crop: "scale",
    });
    if (!name) {
      throw new Error("Name is Required");
    } else if (!email) {
      throw new Error("Email is required");
    } else if (!password) {
      throw new Error("Password is required");
    }
    const isEmailExist = await User.findOne({ email });
    if (isEmailExist) {
      throw new Error("Email is already exist");
    }
    const user = await User.create({
      name,
      email,
      password,
      avatar: {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      },
    });

    let token = await user.generateToken();
    res.status(200).cookie("token", token, options).json({
      user,
      token,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email) {
      throw new Error("Please Enter Email");
    }
    if (!password) {
      throw new Error("Please Enter Password");
    }
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      throw new Error("Email and Password is incorrect");
    }
    const comparePassword = await user.comparePassword(password);

    if (!comparePassword) {
      throw new Error("Email and Password is incorrect");
    }
    const token = await user.generateToken();
    if (user && comparePassword) {
      res.status(200).cookie("token", token, options).json({
        user,
        token,
      });
    }
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};
const logout = async (req, res) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  res.status(200).json({
    message: "Success",
  });
};

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    console.log(email);
    let user = await User.findOne({ email });
    if (!user) {
      throw new Error("User Not Exist");
    }
    const token = await user.getResetToken();
    console.log(token);
    await user.save({ validateBeforeSave: true });
    const generateLinkToSend = `${req.protocol}://192.168.0.114:3000/password/reset/${token}`;
    const message = `Your password reset token is :- \n\n ${generateLinkToSend} \n\nIf you have not requested this email then, please ignore it.`;

    try {
      await sendEmail({
        user: user.email,
        subject: "Reset Password",
        message,
      });
      res.status(200).json({
        user,
        message: "Email send Successfully",
      });
    } catch (error) {
      user.resetPasswordToken = undefined;
      user.resetExpiryPassword = undefined;
      await user.save({ validateBeforeSave: true });
      res.status(400).json({
        message: error.message,
      });
    }
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};
const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password, confirmPassword } = req.body;
    console.log(password, confirmPassword, token);
    const resetPasswordToken = crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");
    const user = await User.findOne({
      resetPasswordToken: resetPasswordToken,
      resetExpiryPassword: { $gt: Date.now() },
    });
    if (!user) {
      throw new Error("Reset Password Token is invalid");
    }
    if (password !== confirmPassword) {
      throw new Error("Your both Password Does not Match");
    }
    (user.password = password),
      (user.resetExpiryPassword = undefined),
      (user.resetPasswordToken = undefined);
    await user.save();
    const gneratetoken = await user.generateToken();
    res.status(200).cookie("token", gneratetoken, options).json({
      user,
      token,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};
const getUserDetails = async (req, res) => {
  try {
    const { id } = req.user;
    const user = await User.findById(id);
    if (!user) {
      throw new Error("Please Login Again");
    }
    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};
const updatePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword, confirmNewPassword } = req.body;
    const user = await User.findById(req.user.id).select("+password");
    if (!user) {
      throw new Error("Please Login Again");
    }
    const comparePass = await user.comparePassword(oldPassword);
    if (!comparePass) {
      throw new Error("Password Does Not Match");
    }
    if (newPassword !== confirmNewPassword) {
      throw new Error("Please Confirm Both New Password");
    }
    if (oldPassword === newPassword) {
      throw new Error("Both Password Must be Unique");
    }
    user.password = newPassword;
    await user.save();
    const gneratetoken = await user.generateToken();
    console.log(gneratetoken);
    res.status(200).cookie("token", gneratetoken, options).json({
      user,
      gneratetoken,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};
const updateProfile = async (req, res) => {
  try {
    const { email, name } = req.body;

    const { id } = req.user;

    const findUser = await User.findById(id);

    if (!email) {
      throw new Error("Please Enter Email");
    }
    if (!name) {
      throw new Error("Please Enter Name");
    }
    if (req.files !== null) {
      await cloudinary.v2.uploader.destroy(findUser.avatar.public_id);
      const newImage = await cloudinary.v2.uploader.upload(
        req.files.avatar.tempFilePath,
        {
          folder: "avatars",
          width: 150,
          crop: "scale",
        }
      );
      const user = await User.findByIdAndUpdate(id, {
        email: email,
        name: name,
        avatar: {
          public_id: newImage.public_id,
          url: newImage.secure_url,
        },
      });
      await user.save();
      if (!user) {
        throw new Error("User Not Found");
      }
      res.status(200).json({
        success: true,
        user,
      });
    } else {
      const user = await User.findByIdAndUpdate(id, {
        email: email,
        name: name,
        avatar: {
          public_id: findUser.avatar.public_id,
          url: findUser.avatar.url,
        },
      });
      await user.save();
      if (!user) {
        throw new Error("User Not Found");
      }
      res.status(200).json({
        success: true,
        user,
      });
    }
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

const getAllUser = async (req, res) => {
  const users = await User.find();
  if (!users) {
    throw new Error("User Not Found");
  }
  res.status(200).json({
    success: true,
    users,
  });
};
const getSingleUser = async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);
  if (user) {
    res.status(200).json({
      success: true,
      user,
    });
  }
};

const updateUserRole = async (req, res) => {
  try {
    const { role } = req.body;
    const { id } = req.params;
    const findUser = await User.findById(id);
    const user = await User.findByIdAndUpdate(id, {
      role: role || findUser.role,
    });
    if (!user) {
      throw new Error("User Not Found");
    }
    user.save();
    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};
const deleteUser = async (req, res) => {
  const { id } = req.params;
  const user = await User.findByIdAndDelete(id);
  if (user) {
    res.status(200).json({
      message: "success",
      user,
    });
  }
};
exports.register = register;
exports.login = login;
exports.logout = logout;
exports.forgotPassword = forgotPassword;
exports.resetPassword = resetPassword;
exports.getUserDetails = getUserDetails;
exports.updatePassword = updatePassword;
exports.updateProfile = updateProfile;
exports.getAllUser = getAllUser;
exports.getSingleUser = getSingleUser;
exports.updateUserRole = updateUserRole;
exports.deleteUser = deleteUser;
