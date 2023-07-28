import fs from "fs";
import path from "path";
import { glob } from "glob";
import { mergeResolvers, mergeTypeDefs } from "@graphql-tools/merge";
import { makeExecutableSchema } from "@graphql-tools/schema";

export const buildSchema = async () => {
  const __dirname = path.dirname(new URL(import.meta.url).pathname);
  const pathToModules = path.join(__dirname, "..", "modules");

  const pathToResolvers = path.join(pathToModules, "**", "*.resolvers.?s");
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-explicit-any
  const resolversPromises = glob
    .sync(pathToResolvers)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .map((resolversFile: any) => import(resolversFile));
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-return
  const resolvers = (await Promise.all(resolversPromises)).map(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-return
    (fileItems: { resolvers: any }) => fileItems.resolvers
  );

  const pathToTypeDefs = path.join(pathToModules, "**", "*.graphql");
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
  const typeDefs = glob
    .sync(pathToTypeDefs)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .map((typeDefsFile: any) =>
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      fs.readFileSync(typeDefsFile, { encoding: "utf8" })
    );

  return makeExecutableSchema({
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    resolvers: mergeResolvers([...resolvers]),
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    typeDefs: mergeTypeDefs([...typeDefs]),
  });
};
