const express = require("express");
const {
  getAll,
  getOne,
  create,
  update,
  remove,
} = require("../controllers/taskController");
const authMiddleware = require("../middlewares/authMiddleware");
const validate = require("../middlewares/validate");
const {
  createTaskSchema,
  updateTaskSchema,
} = require("../middlewares/schemas/taskSchemas");

const router = express.Router();

// All task routes require a valid JWT
router.use(authMiddleware);

router.get("/", getAll);
router.get("/:id", getOne);
router.post("/", validate(createTaskSchema), create);
router.put("/:id", validate(updateTaskSchema), update);
router.delete("/:id", remove);

module.exports = router;
