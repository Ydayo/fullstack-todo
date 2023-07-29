export const resolvers = {
    Query: {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        getTodos: async (_, args, { prismaClient }, info) => {
            const todos = await prismaClient.todo.findMany();
            return {
                todos: todos.map((todoItem) => ({
                    ...todoItem,
                    updatedAt: todoItem.updatedAt.toISOString(),
                    createdAt: todoItem.createdAt.toISOString(),
                })),
            };
        },
    },
};
