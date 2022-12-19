const { check, validationResult } = require("express-validator");
const authService = require("../services/auth");

class AuthController {
  async generateToken(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
      }
      let response = await authService.generateToken(req.body);
      if (response) {
        res.status(200).json(response);
      } else {
        res.status(401).json("Invalid Credentials");
      }
    } catch (err) {
      res.status(500).send(err);
    }
  }
}

module.exports = new AuthController();
