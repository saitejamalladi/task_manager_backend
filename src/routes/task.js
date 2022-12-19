const express = require("express");
const router = express.Router();
const authMiddleware = require("./middlewares/auth");
const taskMiddleware = require("./middlewares/task");
const taskController = require("../controllers/task");
const { UPDATE, CREATE } = require("../constants/validations");

router.post(
  "/",
  (req, res, next) => authMiddleware.verifyToken(req, res, next),
  taskMiddleware.validate(CREATE),
  taskController.create
);
router.get(
  "/",
  (req, res, next) => authMiddleware.verifyToken(req, res, next),
  taskController.list
);
router.put(
  "/:taskId",
  (req, res, next) => authMiddleware.verifyToken(req, res, next),
  taskMiddleware.validate(UPDATE),
  taskController.update
);
router.delete(
  "/:taskId",
  (req, res, next) => authMiddleware.verifyToken(req, res, next),
  taskController.remove
);

module.exports = router;
