import http from "http";
import { ApolloServer } from "@apollo/server";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { expressMiddleware } from "@apollo/server/express4";
import express from "express";
import { buildSchema } from "./utils/buildSchema.js";
async function main() {
    const PORT = process.env.POST || 5555;
    const app = express();
    const httpServer = http.createServer(app);
    const server = new ApolloServer({
        schema: await buildSchema(),
        plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    });
    await server.start();
    app.use(express.json());
    app.use("/graphql", expressMiddleware(server, {
        // eslint-disable-next-line @typescript-eslint/require-await
        context: async ({ req, res }) => ({ req, res }),
    }));
    await new Promise((resolve) => {
        httpServer.listen({ port: PORT }, resolve);
    });
    console.log(`server is up and running at http://localhost:${PORT}`);
}
main().catch((err) => {
    console.error(err);
    process.exit(1);
});
