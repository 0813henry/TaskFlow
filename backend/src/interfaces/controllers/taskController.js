const CreateTaskUseCase = require("../../application/use-cases/tasks/CreateTaskUseCase");
const GetTasksUseCase = require("../../application/use-cases/tasks/GetTasksUseCase");
const GetTaskByIdUseCase = require("../../application/use-cases/tasks/GetTaskByIdUseCase");
const UpdateTaskUseCase = require("../../application/use-cases/tasks/UpdateTaskUseCase");
const DeleteTaskUseCase = require("../../application/use-cases/tasks/DeleteTaskUseCase");
const MongoTaskRepository = require("../../infrastructure/repositories/MongoTaskRepository");

// Dependency injection
const taskRepository = new MongoTaskRepository();
const createTaskUseCase = new CreateTaskUseCase(taskRepository);
const getTasksUseCase = new GetTasksUseCase(taskRepository);
const getTaskByIdUseCase = new GetTaskByIdUseCase(taskRepository);
const updateTaskUseCase = new UpdateTaskUseCase(taskRepository);
const deleteTaskUseCase = new DeleteTaskUseCase(taskRepository);

/** GET /api/tasks?status=pendiente */
const getAll = async (req, res, next) => {
  try {
    const { status } = req.query;
    const tasks = await getTasksUseCase.execute({
      userId: req.user.id,
      status: status || null,
    });
    res.status(200).json({ success: true, data: tasks });
  } catch (err) {
    next(err);
  }
};

/** GET /api/tasks/:id */
const getOne = async (req, res, next) => {
  try {
    const task = await getTaskByIdUseCase.execute({
      taskId: req.params.id,
      userId: req.user.id,
    });
    res.status(200).json({ success: true, data: task });
  } catch (err) {
    next(err);
  }
};

/** POST /api/tasks */
const create = async (req, res, next) => {
  try {
    const task = await createTaskUseCase.execute({
      ...req.body,
      userId: req.user.id,
    });
    res.status(201).json({ success: true, data: task });
  } catch (err) {
    next(err);
  }
};

/** PUT /api/tasks/:id */
const update = async (req, res, next) => {
  try {
    const task = await updateTaskUseCase.execute({
      taskId: req.params.id,
      userId: req.user.id,
      ...req.body,
    });
    res.status(200).json({ success: true, data: task });
  } catch (err) {
    next(err);
  }
};

/** DELETE /api/tasks/:id */
const remove = async (req, res, next) => {
  try {
    const result = await deleteTaskUseCase.execute({
      taskId: req.params.id,
      userId: req.user.id,
    });
    res.status(200).json({ success: true, data: result });
  } catch (err) {
    next(err);
  }
};

module.exports = { getAll, getOne, create, update, remove };
