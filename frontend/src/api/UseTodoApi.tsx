import axios from "axios";
import { Todo, TodoPriority } from "../types/Todo";

export default function UseTodoApi() {
  const client = axios.create({ baseURL: "http://localhost:8000/api/todos" });

  const getTodos = async (sortBy?: "priority" | "date") => {
    const res = await client.get("/", { params: { sortBy: sortBy } });
    let data = res.data;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data = data.map((todo: any) => ({ ...todo, date: new Date(todo.date) }));

    return data as Todo[];
  };

  const getTodoById = async (id: number) => {
    const res = await client.get(`/${id}`);
    const data = res.data;
    data.date = new Date(data.date);

    return data as Todo;
  };

  const createTodo = async (
    text: string,
    priority: TodoPriority,
    date: Date
  ) => {
    const res = await client.post("/", {
      text,
      priority,
      date: date.toJSON(),
    });
    return res.data;
  };

  const updateTodo = async (
    id: number,
    todo: {
      text?: string;
      priority?: TodoPriority;
      date?: Date;
      isChecked?: boolean;
    }
  ) => {
    await client.put(`/${id}`, todo);
  };

  const deleteTodo = async (id: number) => {
    await client.delete(`/${id}`);
  };

  return { getTodos, getTodoById, createTodo, updateTodo, deleteTodo };
}
