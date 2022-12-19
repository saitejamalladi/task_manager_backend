//Mast task list that holds tasks
let taskList = [];

class TaskService {
  //To get the dashboard Data
  async getDashboardData() {
    return {
      tasksCompleted: taskList.filter((task) => task.completed).length,
      totalTasks: taskList.length,
      latestTasks: taskList
        .sort((taskA, taskB) => taskB.id - taskA.id)
        .slice(0, 3),
    };
  }

  //To create a task
  async create(task) {
    let taskId = 1 + taskList.length;
    let newTask = {
      id: taskId,
      name: task.name,
      completed: false,
    };
    taskList.push(newTask);
    return newTask;
  }

  //To list the tasks
  async list(searchName) {
    if (taskList.length > 0 && searchName) {
      return taskList
        .filter((task) =>
          task.name?.toLowerCase().includes(searchName.toLowerCase())
        )
        ?.sort((taskA, taskB) => taskB.id - taskA.id);
    }
    return taskList?.sort((taskA, taskB) => taskB.id - taskA.id);
  }

  //To update a task based on task id
  async update(taskId, task) {
    let updatedTask = taskList.find((task) => task.id === parseInt(taskId));
    updatedTask = {
      ...updatedTask,
      ...task,
    };
    taskList = [
      ...taskList.filter((task) => task.id !== parseInt(taskId)),
      updatedTask,
    ];
    return updatedTask;
  }

  //To remove a task based on task id
  async remove(taskId) {
    let removedTask = taskList.find((task) => task.id === parseInt(taskId));
    taskList = taskList.filter((task) => task.id !== parseInt(taskId));
    return removedTask;
  }
}
module.exports = new TaskService();
