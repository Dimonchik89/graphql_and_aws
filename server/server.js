const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const graphqlUploadExpress = require("graphql-upload/graphqlUploadExpress.js");
const { importSchema } = require("graphql-import");
const { ApolloServerPluginLandingPageLocalDefault } = require("apollo-server-core");
const resolvers = require("./api/resolvers");

const typeDefs = importSchema("./api/schema.graphql")
const PORT = process.env.PORT || 4000;

const startServer = async () => {
    const server = new ApolloServer({
        typeDefs,
        resolvers,
    })
    await server.start()
    const app = express()

    app.use(graphqlUploadExpress())
    server.applyMiddleware({ app })

    await new Promise((r) => app.listen({ port: 4000 }, r));

    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
}
startServer()