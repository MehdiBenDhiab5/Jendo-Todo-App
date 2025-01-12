import { Todo, TodoPriority } from "./types/Todo";
import { SORTBY } from "./validators/getTodosValidator";
import { UpdateTodoDTO } from "./validators/updateTodoValidator";

class TodoService {
  private todos: Todo[] = [];
  private currentId = 1;

  private priorityOrder = {
    [TodoPriority.HIGH]: 3,
    [TodoPriority.MEDIUM]: 2,
    [TodoPriority.LOW]: 1,
  };

  getAllTodos(sortBy?: SORTBY): Todo[] {
    let sortedTodos = [...this.todos];

    if (sortBy === "date") {
      sortedTodos.sort((a, b) => b.date.getTime() - a.date.getTime());
    } else if (sortBy === "priority") {
      sortedTodos.sort(
        (a, b) =>
          this.priorityOrder[b.priority] - this.priorityOrder[a.priority]
      );
    }

    return sortedTodos;
  }

  getTodoById(id: number): Todo | undefined {
    return this.todos.find((todo) => todo.id === id);
  }

  createTodo(text: string, priority: TodoPriority, date: Date): Todo {
    const newTodo: Todo = {
      id: this.currentId++,
      text,
      priority,
      date,
      isChecked: false,
    };
    this.todos.push(newTodo);
    return newTodo;
  }

  updateTodo(id: number, updates: UpdateTodoDTO): Todo | undefined {
    const todoIndex = this.todos.findIndex((todo) => todo.id === id);
    if (todoIndex === -1) return undefined;

    this.todos[todoIndex] = {
      ...this.todos[todoIndex],
      ...updates,
    };

    return this.todos[todoIndex];
  }

  deleteTodo(id: number): boolean {
    const initialLength = this.todos.length;
    this.todos = this.todos.filter((todo) => todo.id !== id);
    return this.todos.length !== initialLength;
  }
}

export const todoService = new TodoService();
