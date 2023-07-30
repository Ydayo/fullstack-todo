import { GraphQLError } from "graphql";
import { Resolvers } from "../../../__generated__/graphql.js";
import { MyContext } from "../../../types/graphql.js";

export const resolvers: Resolvers<MyContext> = {
  Mutation: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    updateTodo: async (_, { updateTodoInput }, { prismaClient }, info) => {
      const existingTodo = await prismaClient.todo.findUnique({
        where: {
          id: updateTodoInput.todoId,
        },
      });

      if (!existingTodo) {
        throw new GraphQLError("Not found");
      }

      if (typeof updateTodoInput.title === "string") {
        existingTodo.title = updateTodoInput.title;
      }

      if (typeof updateTodoInput.isCompleted === "boolean") {
        existingTodo.isCompleted = updateTodoInput.isCompleted;
      }

      await prismaClient.todo.update({
        where: {
          id: existingTodo.id,
        },
        data: {
          title: existingTodo.title,
          isCompleted: existingTodo.isCompleted,
        },
      });

      return {
        todo: {
          ...existingTodo,
          updatedAt: existingTodo.updatedAt,
          createdAt: existingTodo.createdAt,
        },
      };
    },
  },
};
