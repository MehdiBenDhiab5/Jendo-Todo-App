import { ActionIcon, Badge, Card, Checkbox, Modal, rem } from "@mantine/core";
import {
  IconCalendar,
  IconFlag,
  IconPencil,
  IconTrash,
} from "@tabler/icons-react";
import type { Todo } from "../types/Todo";
import { TodoPriority } from "../types/Todo";
import UseTodoApi from "../api/UseTodoApi";
import { useDisclosure } from "@mantine/hooks";
import UpdateTodoForm from "./UpdateTodoForm";

type Props = {
  todo: Todo;
  refetch: () => Promise<unknown>;
};
export default function Todo({ todo, refetch }: Props) {
  const TodoApi = UseTodoApi();
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <Card withBorder>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            maxWidth: "100%",
          }}
        >
          <Checkbox
            onChange={() => {
              TodoApi.updateTodo(todo.id, { isChecked: !todo.isChecked }).then(
                () => {
                  refetch();
                }
              );
            }}
            label={todo.text}
            checked={todo.isChecked}
            size="md"
            styles={
              todo.isChecked
                ? {
                    label: {
                      textDecoration: "line-through",
                    },
                  }
                : undefined
            }
          />
          <div
            style={{
              display: "flex",

              gap: ".5rem",
            }}
          >
            <Badge
              variant="light"
              color={
                todo.priority === TodoPriority.HIGH
                  ? "red"
                  : todo.priority === TodoPriority.MEDIUM
                  ? "orange"
                  : "blue"
              }
              leftSection={
                <IconFlag style={{ width: rem(14), height: rem(14) }} />
              }
            >
              {todo.priority}
            </Badge>
            <Badge
              variant="default"
              leftSection={
                <IconCalendar style={{ width: rem(14), height: rem(14) }} />
              }
            >
              {todo.date.toLocaleDateString()}
            </Badge>
          </div>
        </div>
        <div style={{ display: "flex", gap: ".5rem" }}>
          <ActionIcon variant="default" size="lg" onClick={open}>
            <IconPencil style={{ width: "70%", height: "70%" }} stroke={1.5} />
          </ActionIcon>
          <ActionIcon
            variant="default"
            size="lg"
            onClick={() => {
              TodoApi.deleteTodo(todo.id).then(() => {
                refetch();
              });
            }}
          >
            <IconTrash
              color="red"
              style={{ width: "70%", height: "70%" }}
              stroke={1.5}
            />
          </ActionIcon>
        </div>
      </div>
      <Modal opened={opened} onClose={close} title="Update Todo">
        <UpdateTodoForm
          id={todo.id}
          onSave={() => {
            refetch();
            close();
          }}
        />
      </Modal>
    </Card>
  );
}
