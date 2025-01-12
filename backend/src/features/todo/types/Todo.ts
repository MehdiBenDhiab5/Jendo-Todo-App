export enum TodoPriority {
  HIGH = "HIGH",
  MEDIUM = "MEDIUM",
  LOW = "LOW",
}

export type Todo = {
  id: number;
  text: string;
  priority: TodoPriority;
  date: Date;
  isChecked: boolean;
};
