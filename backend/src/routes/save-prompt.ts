import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { savePromptUseCase } from '../useCases/SavePrompt';
import { SavePromptController } from '../useCases/SavePrompt/SavePromptController';

export const savePrompt = async (fastify: FastifyInstance) => {
  const savePromptController = new SavePromptController(savePromptUseCase);
  
  fastify.post('/prompts/save', async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      // Use o objeto body para acessar os dados da requisição
      const { prompt } = request.body as { prompt: string };

      // Chame o controlador
      await savePromptController.handle(request, reply);

      // Responda com uma mensagem de sucesso
      reply.status(201).send({ message: 'Prompt successfully saved.' });
    } catch (err) {
      // Lide com erros e retorne uma resposta apropriada
      reply.status(500).send({
        message: err.message || 'Unexpected error.',
      });
    }
  });
};
