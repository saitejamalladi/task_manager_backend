const { check } = require("express-validator");
const { CREATE, UPDATE } = require("../../constants/validations");

class TaskMiddleware {
  validate(method) {
    switch (method) {
      case CREATE: {
        return [check("name", "Missing name").exists()];
      }
      case UPDATE: {
        return [
          check("name", "Missing name").exists(),
          check("completed", "Invalid completed").exists(),
        ];
      }
    }
  }
}

module.exports = new TaskMiddleware();
