import { useState } from "react";
import { Todo } from "../../__generated__/graphql";
import DropdownMenu from "../DropdownMenu/DropdownMenu";
import { AiOutlineEdit } from "react-icons/ai";
import { BiTrash } from "react-icons/bi";

type TodoItemProps = {
  todoItem: Todo;
  removeTodo: (id: string) => void | Promise<void>;
  updateTodoCompleteStatus: (id: string, isCompleted: boolean) => void;
  updateTodoTitle: (id: string, title: string) => void | Promise<void>;
};

export const TodoItem: React.FC<TodoItemProps> = ({
  todoItem,
  removeTodo,
  updateTodoCompleteStatus,
  updateTodoTitle,
}) => {
  const [isTitleEditting, setIsTitleEditting] = useState<boolean>(false);
  const [todoTitleInput, setTodoTitleInput] = useState<string>(todoItem.title);
  const handleRemoveClick: React.MouseEventHandler<HTMLButtonElement> = (
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    event
  ) => {
    removeTodo(todoItem.id);
  };

  const handleCompleteTodoCheckboxChange: React.ChangeEventHandler<
    HTMLInputElement
  > = (event) => {
    updateTodoCompleteStatus(todoItem.id, event.target.checked);
  };

  const handleTodoTitleInput: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    setTodoTitleInput(event.target.value);
  };

  const handleEditTitleClick: React.MouseEventHandler<HTMLButtonElement> = (
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    event
  ) => {
    setIsTitleEditting(!isTitleEditting);
  };

  const handleTodoTitleInputBlur: React.FocusEventHandler<
    HTMLInputElement
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  > = async (event) => {
    try {
      await updateTodoTitle(todoItem.id, todoTitleInput);
      setIsTitleEditting(false);
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  };

  return (
    <>
      <article
        className={`flex justify-between bg-white items-center shadow-sm rounded border-l-8 my-4 px-4 h-20 ${
          todoItem?.isCompleted ? "border-emerald-500" : "border-blue-600"
        } dark:bg-zinc-700`}
        key={todoItem?.id}
      >
        <div className="flex items-center">
          <input
            type={"checkbox"}
            checked={todoItem?.isCompleted}
            className="w-4 h-4"
            onChange={handleCompleteTodoCheckboxChange}
          />
          <div className="flex flex-col ml-4">
            {isTitleEditting ? (
              <input
                className="focus:outline-none text-slate-600 dark:bg-zinc-700 dark:text-zinc-100"
                type={"text"}
                value={todoTitleInput}
                onChange={handleTodoTitleInput}
                autoFocus
                // focusした後に外したら起こるイベント
                onBlur={handleTodoTitleInputBlur}
              />
            ) : (
              <p
                className={`${
                  todoItem?.isCompleted
                    ? "text-emerald-500 line-through"
                    : "text-slate-600"
                } dark:text-zinc-100`}
              >
                {todoItem?.title}
              </p>
            )}

            <small className=" text-gray-400">
              {todoItem?.createdAt.toISOString().split("T")[0]}
            </small>
          </div>
        </div>

        <DropdownMenu
          menuItems={[
            <button
              onClick={handleEditTitleClick}
              key={1}
              className="flex justify-between w-full items-center text-gray-800 dark:text-zinc-100"
            >
              <span>Edit</span>
              <AiOutlineEdit />
            </button>,
            <button
              onClick={handleRemoveClick}
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
