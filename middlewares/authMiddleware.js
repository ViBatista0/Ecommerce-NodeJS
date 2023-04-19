const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

const authMiddleware = asyncHandler(async (req, res, next) => {
  let token;
  if (req?.headers?.authorization?.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
    try {
      if (token) {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded?.id);
        req.user = user;
        next();
      }
    } catch (error) {
      throw new Error("Login expirado! Faça-o novamente.");
    }
  } else {
    throw new Error("Não tem nenhum token ligado a este login!");
  }
});

const isAdmin = asyncHandler(async (req, res, next) => {
  const {email} = req.user;
  const admUser = await User.findOne({email});

  if (admUser.role !== "admin") {
    throw new Error("Você não é um administrador!");
  } else {
    next();
  }
});

module.exports = { authMiddleware, isAdmin };
