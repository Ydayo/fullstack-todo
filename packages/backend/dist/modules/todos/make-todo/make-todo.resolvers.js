import crypto from "crypto";
export const resolvers = {
    Mutation: {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/require-await
        makeTodo: async (_, { makeTodoInput }, context, info) => {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            const todoItem = {
                id: crypto.randomUUID(),
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
                title: makeTodoInput.title,
                updatedAt: new Date().toISOString(),
                createdAt: new Date().toISOString(),
            };
            return {
                todo: todoItem,
            };
        },
    },
};
