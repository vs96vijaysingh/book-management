const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter name"],
    },
    email: {
      type: String,
      required: [true, "Please enter email"],
      unique: [true, "Email already exists"],
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please enter a valid email",
      ],
      validate: [validator.isEmail, "Please enter a valid email"],
    },
    password: {
      type: String,
      required: [true, "Please enter password"],
    },
    cPassword: {
      type: String,
    },
    mobile: {
      type: String,
      required: [true, "Please enter mobile"],
    },
    token: {
      type: String,
    },
  },
  { timestamp: true }
);

const UserModel = mongoose.model("Users", userSchema);
module.exports = UserModel;
