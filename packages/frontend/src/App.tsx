import React, { useState } from "react";
import { Toaster } from "react-hot-toast";
import { SyncLoader } from "react-spinners";
import { Layout } from "./components/Layout/Layout";
import { TodoItem } from "./components/Todoitem";
import Button from "./components/Elements/Button/Button";
import InputField from "./components/Elements/inputField/InputField";
import { useTodos } from "./hooks/useTodos";
import { useDarkModeContext } from "./contexts/DarkModeContext";

function App() {
  const { isDarkMode } = useDarkModeContext();
  const [title, setTitle] = useState<string>("");
  const {
    todoData,
    todoDataLoading,
    makeTodo,
    makeTodoMutLoading,
    removeTodo,
    updateTodoCompleteStatus,
    updateTodoTitle,
  } = useTodos();

  const handleTitleChange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => setTitle(event.target.value);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (
    event
  ) => {
    event.preventDefault();
    await makeTodo(title);
    setTitle("");
  };

  return (
    <div className={isDarkMode ? "dark" : "light"}>
      <Toaster
        position="top-right"
        toastOptions={{ className: "dark:bg-zinc-700 dark:text-zinc-100" }}
      />
      <Layout>
        <div className="max-w-xl mx-auto p-7">
          <div className="bg-white p-6 rounded shadow dark:bg-zinc-700">
            <form className="flex flex-col" onSubmit={handleSubmit}>
              <InputField
                containerClassName="flex flex-col mb-6"
                labelClassName="text-slate-500 pb-1"
                labelName="New Todo"
                placeholder="buy some food..."
                onChange={handleTitleChange}
                value={title}
              />
              <Button
                size="sm"
                variant="primary"
                isLoading={makeTodoMutLoading}
              >
                Add Todo
              </Button>
            </form>
          </div>
          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
          {/* {!todoDataLoading ? (
            <div className="flex justify-center mt-9">
              <SyncLoader color="#2563eb" />
            </div>
          ) : (
            todoData?.getTodos?.todos?.map((item) => (
              <TodoItem
                key={item?.id}
                todoItem={item!}
                removeTodo={removeTodo}
                updateTodoCompleteStatus={updateTodoCompleteStatus}
                updateTodoTitle={updateTodoTitle}
              />
            ))
          )} */}
          {todoData?.getTodos?.todos?.map((item) => (
            <TodoItem
              key={item?.id}
              todoItem={item!}
              removeTodo={removeTodo}
              updateTodoCompleteStatus={updateTodoCompleteStatus}
              updateTodoTitle={updateTodoTitle}
            />
          ))}
        </div>
      </Layout>
    </div>
  );
}

export default App;
