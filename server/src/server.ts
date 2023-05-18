import fastify from 'fastify'
import { memoriesRoutes } from './routes/memories'
import fastifyCors from '@fastify/cors'

const app = fastify()
app.register(fastifyCors, {
  origin: true,
})

app.register(memoriesRoutes)

app
  .listen({
    host: '0.0.0.0',
    port: 3333,
  })
  .then((uri) => {
    console.log('🚀 HTTP server running on', uri)
  })
