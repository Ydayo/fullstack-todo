import React from "react";
import { useTodosQuery } from "./__generated__/graphql";
import { Layout } from "./components/Layout/Layout";
import { TodoItem } from "./components/Todoitem";
import Button from "./components/Elements/Button/Button";
import InputField from "./components/Elements/inputField/InputField";

function App() {
  const { data, loading, error } = useTodosQuery();
  return (
    <>
      <Layout>
        <div className="max-w-xl mx-auto p-7">
          <div className="bg-white p-6 rounded shadow">
            <form className="flex flex-col">
              <InputField
                containerClassName="flex flex-col mb-6"
                labelClassName="text-slate-500 pb-1"
                labelName="New Todo"
                placeholder="buy some food..."
              />
              <Button size="sm">Add Todo</Button>
            </form>
          </div>
          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
          {data?.getTodos?.todos?.map((item) => (
            <TodoItem key={item?.id} todoItem={item!} />
          ))}
        </div>
      </Layout>
    </>
  );
}

export default App;
