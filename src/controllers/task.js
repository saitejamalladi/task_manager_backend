const { validationResult } = require("express-validator");
const taskService = require("../services/task");

class TaskController {
  //To get the dashboard Data
  async dashboardData(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
      }
      let response = await taskService.getDashboardData(req.body);
      res.status(200).json(response);
    } catch (err) {
      res.status(500).send(err);
    }
  }

  //To create a task
  async create(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
      }
      let response = await taskService.create(req.body);
      res.status(200).json(response);
    } catch (err) {
      res.status(500).send(err);
    }
  }

  //To list the tasks
  async list(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
      }
      let response = await taskService.list(req.query.__search);
      res.status(200).json(response);
    } catch (err) {
      res.status(500).send(err);
    }
  }

  //To update a task based on task id
  async update(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
      }
      let response = await taskService.update(req.params["taskId"], req.body);
      res.status(200).json(response);
    } catch (err) {
      res.status(500).send(err);
    }
  }

  //To remove a task based on task id
  async remove(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
      }
      let response = await taskService.remove(req.params["taskId"]);
      res.status(200).json(response);
    } catch (err) {
      res.status(500).send(err);
    }
  }
}

module.exports = new TaskController();
