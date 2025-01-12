import { Router, Request, Response } from "express";
import { todoService } from "./todo.service";
import { getTodosValidator } from "./validators/getTodosValidator";
import { getTodoByIdValidator } from "./validators/getTodoByIdValidator";
import { createTodoValidator } from "./validators/createTodoValidator";
import { updateTodoValidator } from "./validators/updateTodoValidator";
import { deleteTodoValidator } from "./validators/deleteTodoValidator";

const router: Router = Router();

// Get todos
router.get("/", async (req: Request, res: Response) => {
  const query = await getTodosValidator(req);
  if (!query) {
    return res.status(400).json({ message: "bad request" });
  }

  const todos = todoService.getAllTodos(query.sortBy);
  res.json(todos);
});

// Get todo by id
router.get("/:id", async (req: Request, res: Response) => {
  const params = await getTodoByIdValidator(req);
  if (!params) {
    return res.status(400).json({ message: "bad request" });
  }
  const todo = todoService.getTodoById(params.id);
  if (!todo) {
    return res.status(404).json({ message: "todo not found" });
  }

  res.json(todo);
});

// Create todo
router.post("/", async (req: Request, res: Response) => {
  const createTodoDTO = await createTodoValidator(req);
  if (!createTodoDTO) {
    return res.status(400).json({ message: "bad request" });
  }

  const newTodo = todoService.createTodo(
    createTodoDTO.text,
    createTodoDTO.priority,
    createTodoDTO.date
  );
  res.status(201).json(newTodo);
});

// Update todo
router.put("/:id", async (req: Request, res: Response) => {
  const data = await updateTodoValidator(req);
  if (!data) {
    return res.status(400).json({ message: "bad request" });
  }

  const updatedTodo = todoService.updateTodo(data.params.id, data.body);

  if (!updatedTodo) {
    return res.status(404).json({ message: "todo not found" });
  }

  res.json(updatedTodo);
});

// Delete todo
router.delete("/:id", async (req: Request, res: Response) => {
  const data = await deleteTodoValidator(req);
  if (!data) {
    return res.status(400).json({ message: "bad request" });
  }
  const deleted = todoService.deleteTodo(data.id);

  if (!deleted) {
    return res.status(404).json({ message: "Todo not found" });
  }

  res.status(204).send();
});

export default router;
