const express = require("express");
const router = express.Router();
let authRouter = require("./auth");
let dashboardRouter = require("./dashboard");
let taskRouter = require("./task");

router.use("/login", authRouter);
router.use("/dashboard", dashboardRouter);
router.use("/tasks", taskRouter);

module.exports = router;
