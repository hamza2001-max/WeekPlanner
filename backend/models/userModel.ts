export {};
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const validator = require("validator");
const bcrypt = require("bcrypt");

interface emailInterface {
  email: string;
}
interface passwordInterface {
  password: string;
}
const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.statics.signup = async function (
  email: emailInterface,
  password: passwordInterface
) {
  if (!email || !password) {
    throw Error("The input fields are empty.");
  }
  if (!validator.isEmail(email)) {
    throw Error("Please enter a correct email.");
  }
  if (!validator.isStrongPassword(password)) {
    throw Error("Enter a stronger password");
  }
  const exists = await this.findOne({ email });
  if (exists) {
    throw Error("Email already exits, Enter a new one.");
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  const user = await this.create({ email, password: hash });
  return user;
};

userSchema.statics.login = async function (
  email: emailInterface,
  password: passwordInterface
) {
  if (!email || !password) {
    throw Error("The input fields are empty.");
  }
  const user = await this.findOne({ email });
  if (!user) {
    throw Error("User does not exist.");
  }
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw Error("Wrong password");
  }
  return user;
};

module.exports = mongoose.model("User", userSchema);
