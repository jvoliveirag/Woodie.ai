import { FastifyReply, FastifyRequest } from 'fastify';
import { SavePromptUseCase } from './SavePromptUseCase';

export class SavePromptController {

  constructor(private savePromptUseCase: SavePromptUseCase) {}

  async handle(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    const prompt  = request.body as string ; // Desestrutura a string 'prompt'

    try {
      if (!prompt) {
        reply.status(400).send({ error: 'A prompt is required' });
        return;
      }

      await this.savePromptUseCase.execute(prompt); // Passa a string diretamente

      reply.status(201).send({ message: 'Prompt successfully saved.' });
    } catch (err) {
      reply.status(500).send({
        message: err.message || 'Unexpected error.',
      });
    }
  }
}
