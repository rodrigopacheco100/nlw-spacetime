import { FastifyInstance } from 'fastify'
import { prisma } from '../lib/prisma'
import { z } from 'zod'

export async function memoriesRoutes(app: FastifyInstance) {
  app.get('/memories', async () => {
    const memories = await prisma.memory.findMany({
      orderBy: {
        createdAt: 'asc',
      },
    })

    return {
      memories: memories.map((memory) => {
        return {
          id: memory.id,
          coverUrl: memory.coverUrl,
          excerpt: memory.content.substring(0, 115).concat('...'),
        }
      }),
    }
  })

  app.get('/memories/:id', async (request, reply) => {
    const paramsSchema = z.object({
      id: z.string().uuid(),
    })

    const { id } = paramsSchema.parse(request.params)

    const memory = await prisma.memory.findUniqueOrThrow({
      where: { id },
    })

    return { memory }
  })

  app.post('/memories', async (request, reply) => {
    const bodySchema = z.object({
      content: z.string(),
      coverUrl: z.string(),
      isPublic: z.coerce.boolean().default(false),
    })

    const { content, isPublic, coverUrl } = bodySchema.parse(request.body)

    const memory = await prisma.memory.create({
      data: {
        content,
        coverUrl,
        isPublic,
        userId: '6e1af513-3498-4744-b704-8d1a6013f7ac',
      },
    })

    return { memory }
  })

  app.put('/memories/:id', async (request, reply) => {
    const paramsSchema = z.object({
      id: z.string().uuid(),
    })

    const { id } = paramsSchema.parse(request.params)

    const bodySchema = z.object({
      content: z.string(),
      coverUrl: z.string(),
      isPublic: z.coerce.boolean(),
    })

    const { content, isPublic, coverUrl } = bodySchema.parse(request.body)

    const memory = await prisma.memory.update({
      where: { id },
      data: {
        content,
        isPublic,
        coverUrl,
      },
    })

    return { memory }
  })

  app.delete('/memories/:id', async (request, reply) => {
    const paramsSchema = z.object({
      id: z.string().uuid(),
    })

    const { id } = paramsSchema.parse(request.params)

    await prisma.memory.delete({
      where: { id },
    })
  })
}
