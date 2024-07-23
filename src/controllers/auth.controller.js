const { createToken } = require("../utils/jwt");
const Joi = require("joi");
const bcrypt = require("bcrypt");
const prisma = require("../utils/connection");

const register = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    const check = Joi.object({
      fullName: Joi.string().min(6).required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(12).required(),
    });

    const { error } = check.validate({ fullName, email, password });
    if (error) return res.status(400).json({ message: error.message });

    const user = await prisma.users.findUnique({ where: { email } });

    if (user) {
      return res
        .status(403)
        .json({ message: "You have already registered with this email!" });
    }

    const hashedPass = await bcrypt.hash(password, 12);

    const newUser = await prisma.users.create({
      data: { fullName, email, password: hashedPass },
    });

    const token = createToken({
      id: newUser.id,
      isAdmin: newUser.isAdmin,
    });
    res.cookie("token", token);

    res.status(201).json({ message: "Success", data: token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error!" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const verify = Joi.object({
      email: Joi.string().min(6).required(),
      password: Joi.string().min(6).required(),
    });

    const { error } = verify.validate({ email, password });
    if (error) return res.status(400).json({ message: error.message });

    const findUser = await prisma.users.findUnique({ where: { email } });

    if (!findUser) {
      return res.status(403).json({ message: "Incorrect password or email!" });
    }

    const check = await bcrypt.compare(password, findUser.password);

    if (!check) {
      return res.status(403).json({ message: "Incorrect password or email!" });
    }

    const token = createToken({ id: findUser.id, isAdmin: findUser.isAdmin });
    res.cookie("token", token);

    res.json({ message: "You are successfully logged in!", data: token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error!" });
  }
};

module.exports = {
  register,
  login,
};
