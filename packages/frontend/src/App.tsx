import React from "react";
import { useTodosQuery } from "./__generated__/graphql";

function App() {
  const { data, loading, error } = useTodosQuery();
  return (
    <>
      <div className="App">
        <div>
          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
          {data?.getTodos?.todos?.map((item) => (
            <p key={item?.id}>{item?.title}</p>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
