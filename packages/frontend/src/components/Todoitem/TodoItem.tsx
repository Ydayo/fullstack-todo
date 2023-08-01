import { Todo } from "../../__generated__/graphql";
import DropdownMenu from "../DropdownMenu/DropdownMenu";
import { AiOutlineEdit } from "react-icons/ai";
import { BiTrash } from "react-icons/bi";

type TodoItemProps = {
  todoItem: Todo;
};

export const TodoItem: React.FC<TodoItemProps> = ({ todoItem }) => {
  return (
    <>
      <article
        className={`flex justify-between bg-white items-center shadow-sm rounded border-l-8 my-4 px-4 h-20 ${
          todoItem?.isCompleted ? "border-emerald-500" : "border-blue-600"
        }`}
        key={todoItem?.id}
      >
        <div className="flex items-center">
          <input
            type={"checkbox"}
            checked={todoItem?.isCompleted}
            className="w-4 h-4"
          />
          <div className="flex flex-col ml-4">
            <p
              className={`${
                todoItem?.isCompleted
                  ? "text-emerald-500 line-through"
                  : "text-slate-600"
              }`}
            >
              {todoItem?.title}
            </p>

            <small className=" text-gray-400">
              {todoItem?.createdAt.toISOString().split("T")[0]}
            </small>
          </div>
        </div>

        <DropdownMenu
          menuItems={[
            <button
              key={1}
              className="flex justify-between w-full items-center text-gray-800"
            >
              <span>Edit</span>
              <AiOutlineEdit />
            </button>,
            <button
              key={2}
              className="flex justify-between w-full items-center text-red-400"
            >
              <span>Remove</span>
              <BiTrash />
            </button>,
          ]}
        />
      </article>
    </>
  );
};