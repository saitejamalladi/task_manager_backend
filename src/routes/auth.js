const express = require("express");
const router = express.Router();
const authMiddleware = require("./middlewares/auth");
const authController = require("../controllers/auth");
const { GENERATE_TOKEN } = require("../constants/validations");

router.post(
  "/",
  authMiddleware.validate(GENERATE_TOKEN),
  authController.generateToken
);
module.exports = router;
