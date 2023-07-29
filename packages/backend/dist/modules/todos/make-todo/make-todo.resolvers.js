export const resolvers = {
    Mutation: {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/require-await
        makeTodo: async (_, { makeTodoInput }, { prismaClient }, info) => {
            const newTodo = await prismaClient.todo.create({
                data: {
                    title: makeTodoInput.title,
                },
            });
            return {
                todo: {
                    ...newTodo,
                    updatedAt: newTodo.updatedAt.toISOString(),
                    createdAt: newTodo.createdAt.toISOString(),
                },
            };
        },
    },
};
