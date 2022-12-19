const express = require("express");
const router = express.Router();
const taskController = require("../controllers/task");
const authMiddleware = require("./middlewares/auth");

router.get(
  "/",
  (req, res, next) => authMiddleware.verifyToken(req, res, next),
  taskController.dashboardData
);

module.exports = router;
