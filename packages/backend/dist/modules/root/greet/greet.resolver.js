const resolvers = {
    Query: {
        // eslint-disable-next-line @typescript-eslint/require-await, @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
        greet: async (_, args, context, info) => {
            return "hello";
        },
    },
};
export default resolvers;
