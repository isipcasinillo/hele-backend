
import express from 'express'
import cors from 'cors'
import http from 'node:http'
import { ApolloServer } from '@apollo/server'
import { expressMiddleware } from '@as-integrations/express5'
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer'
import { typeDefs , resolvers } from './graphql/index.js'
import { createContext } from './context.ts'


const app = express()
const httpServer = http.createServer(app)

const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
})

await server.start()

app.use(
  '/graphql',
  cors(),
  express.json(),
   expressMiddleware(server, {
    context: createContext,
  }),
)

const PORT = 4000

httpServer.listen(PORT, () => {
  console.log(`Server ready at http://localhost:${PORT}/graphql`)
})
