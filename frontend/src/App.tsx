import {
  IconCalendar,
  IconFlag,
  IconPlus,
  IconSortDescending,
} from "@tabler/icons-react";
import { Button, Divider, Menu, Modal, rem, Text, Title } from "@mantine/core";
import Todo from "./components/Todo";
import { Todo as TodoType } from "./types/Todo";
import UseTodoApi from "./api/UseTodoApi";
import { useEffect, useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import CreateTodoForm from "./components/CreateTodoForm";

function App() {
  const [opened, { open, close }] = useDisclosure(false);

  const TodoApi = UseTodoApi();

  const [todos, setTodos] = useState<TodoType[]>([]);
  const [sortBy, setSortBy] = useState<"priority" | "date">("date");

  const fetchTodos = async () => {
    TodoApi.getTodos(sortBy)
      .then((data) => {
        setTodos(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchTodos();
  }, [sortBy]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        gap: ".5rem",
        width: "100%",
        paddingTop: "2rem",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: ".5rem",
          width: "800px",
          maxWidth: "100%",
          padding: ".5rem",
        }}
      >
        <Title order={2}>Todos</Title>
        <Divider />
        <div
          style={{
            display: "flex",
            gap: ".5rem",
          }}
        >
          <Button
            onClick={open}
            variant="filled"
            leftSection={
              <IconPlus style={{ width: rem(14), height: rem(14) }} />
            }
          >
            Create Todo
          </Button>
          <Menu shadow="md" width={200}>
            <Menu.Target>
              <Button
                variant="default"
                leftSection={
                  <IconSortDescending
                    style={{ width: rem(14), height: rem(14) }}
                  />
                }
              >
                {sortBy === "date" && "Sorting by: Latest Date"}
                {sortBy === "priority" && "Sorting by: Highest Priority"}
              </Button>
            </Menu.Target>

            <Menu.Dropdown>
              <Menu.Item
                onClick={() => {
                  setSortBy("date");
                }}
                leftSection={
                  <IconCalendar style={{ width: rem(14), height: rem(14) }} />
                }
                color={sortBy === "date" ? "blue" : undefined}
              >
                Latest Date
              </Menu.Item>
              <Menu.Item
                onClick={() => {
                  setSortBy("priority");
                }}
                leftSection={
                  <IconFlag style={{ width: rem(14), height: rem(14) }} />
                }
                color={sortBy === "priority" ? "blue" : undefined}
              >
                Highest Priority
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </div>
        {todos.length === 0 && (
          <div style={{ marginTop: "1rem" }}>
            <Text> No todos created</Text>
          </div>
        )}
        {todos.map((elem, i) => (
          <Todo key={i} todo={elem} refetch={fetchTodos} />
        ))}
      </div>

      <Modal opened={opened} onClose={close} title="Create Todo">
        <CreateTodoForm
          onSave={() => {
            fetchTodos();
            close();
          }}
        />
      </Modal>
    </div>
  );
}

export default App;
