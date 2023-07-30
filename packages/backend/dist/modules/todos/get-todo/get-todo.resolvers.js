import { GraphQLError } from "graphql";
export const resolvers = {
    Query: {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        getTodo: async (_, { getTodoInput }, { prismaClient }, info) => {
            const existingTodo = await prismaClient.todo.findUnique({
                where: {
                    id: getTodoInput.todoId,
                },
            });
            if (!existingTodo) {
                throw new GraphQLError("Not found");
            }
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
