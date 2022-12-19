const { check } = require("express-validator");
const authService = require("../../services/auth");
const { GENERATE_TOKEN } = require("../../constants/validations");

class AuthMiddleware {
  validate(method) {
    switch (method) {
      case GENERATE_TOKEN: {
        return [
          check("name", "missing name").exists(),
          check("apiKey", "missing api_key").exists(),
        ];
      }
    }
  }

  async verifyToken(req, res, next) {
    try {
      if (req.headers["authorization"]) {
        let token = req.headers["authorization"];
        if (token.startsWith("Bearer ")) {
          // Remove Bearer from string
          token = token.slice(7, token.length);
        }
        let tokenInfo = await authService.getTokenInfo(token);
        if (tokenInfo) {
          next();
        } else {
          return res.status(401).json("Invalid apiKey");
        }
      } else {
        return res.status(400).send("Missing apiKey");
      }
    } catch (error) {
      return res.status(500).send(`Internal server error ${error}`);
    }
  }
}

module.exports = new AuthMiddleware();
