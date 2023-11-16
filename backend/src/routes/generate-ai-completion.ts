import { OpenAIStream, streamToResponse } from "ai";
import { FastifyInstance } from "fastify";
import { z } from "zod";
import { openai } from "../lib/openai";

export async function generateAiCompletionRoute(app: FastifyInstance) {
  app.post('/ai/complete', async (req, reply) => {

    const bodySchema = z.object({
      prompt: z.string(),
      temperature: z.number().min(0).max(1).default(0.5),
    })

    const { prompt, temperature } = bodySchema.parse(req.body)

    const promptMessage = prompt

    const response = await openai.chat.completions.create({
      model: 'ft:gpt-3.5-turbo-0613:personal:woodie2-ai:8LRApWOh',
      temperature,
      messages: [
        {role: 'user', content: promptMessage}
      ],
      stream: true,
    })

    const stream = OpenAIStream(response)

    streamToResponse(stream, reply.raw, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS'
      },
    })

  })
}