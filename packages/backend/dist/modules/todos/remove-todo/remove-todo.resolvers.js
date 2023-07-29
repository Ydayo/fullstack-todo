import { GraphQLError } from "graphql";
export const resolvers = {
    Mutation: {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        removeTodo: async (_, { removeTodoInput }, { prismaClient }, info) => {
            const existingTodo = await prismaClient.todo.findUnique({
                where: {
                    id: removeTodoInput.todoId,
                },
            });
            if (!existingTodo) {
                throw new GraphQLError("Not found");
            }
            await prismaClient.todo.delete({
                where: {
                    id: existingTodo.id,
                },
            });
            return {
                todo: {
                    ...existingTodo,
                    updatedAt: existingTodo.updatedAt.toISOString(),
                    createdAt: existingTodo.createdAt.toISOString(),
                },
            };
        },
    },
};
