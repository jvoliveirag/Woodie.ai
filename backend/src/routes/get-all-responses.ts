import { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";

export async function getAllResponsesRoute(app: FastifyInstance) {
  app.get('/responses', async () => {
    const responses = await prisma.response.findMany()
  
    return responses
  })
}