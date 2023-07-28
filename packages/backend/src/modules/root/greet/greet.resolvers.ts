import { MyContext } from "../../../types/graphql.js";

export const resolvers = {
  Query: {
    // eslint-disable-next-line @typescript-eslint/require-await, @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
    greet: async (_: any, args: any, context: MyContext, info: any) => {
      return "hello";
    },
  },
};
