import { Button, Input, Select } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { useState } from "react";
import { TodoPriority } from "../types/Todo";
import UseTodoApi from "../api/UseTodoApi";

type Props = {
  onSave: () => void;
};

export default function CreateTodoForm({ onSave }: Props) {
  const [form, setForm] = useState<{
    text: string;
    priority: TodoPriority;
    date: Date | null;
  }>({ text: "", priority: TodoPriority.LOW, date: null });

  const TodoApi = UseTodoApi();

  const handleCreate = async () => {
    if (form.date && form.text && form.priority) {
      TodoApi.createTodo(form.text, form.priority, form.date).then(() => {
        onSave();
      });
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
      }}
    >
      <Input.Wrapper label="Text" required>
        <Input
          placeholder="Text"
          value={form.text}
          onChange={(e) => {
            setForm((prev) => {
              return { ...prev, text: e.target.value };
            });
          }}
        />
      </Input.Wrapper>
      <Select
        required
        label="Priority"
        placeholder="Pick priority"
        data={[TodoPriority.HIGH, TodoPriority.MEDIUM, TodoPriority.LOW]}
        value={form.priority}
        onChange={(value) => {
          const castedValue = value as TodoPriority;
          setForm((prev) => {
            return { ...prev, priority: castedValue };
          });
        }}
      />
      <DateInput
        required
        value={form.date}
        onChange={(date) => {
          setForm((prev) => {
            return { ...prev, date: date };
          });
        }}
        label="Date"
        placeholder="Date"
      />
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          disabled={!form.date || !form.priority || !form.text}
          onClick={handleCreate}
        >
          Confirm
        </Button>
      </div>
    </div>
  );
}
