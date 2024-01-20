import { Router } from "express";
import { authenticate_user } from "../middlewares/authentication.js";
import {
  createTodo,
  deleteAll,
  deleteDone,
  deleteTodo,
  readTodos,
  updateTodo,
} from "../controllers/todo_controller.js";
import { validate_create_inputs } from "../middlewares/input_validator.js";

const router = Router();

router
  .route("/create")
  .post(authenticate_user, validate_create_inputs, createTodo);
router.route("/read_all").get(authenticate_user, readTodos);
router
  .route("/update")
  .patch(authenticate_user, validate_create_inputs, updateTodo);
router.route("/delete/:id").delete(authenticate_user, deleteTodo);
router.route("/delete_all").delete(authenticate_user, deleteAll);
router.route("/delete_done").delete(authenticate_user, deleteDone);

export default router;
