import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { submitTeamInfoUseCase } from '../useCases/SubmitTeamInfo';
import { SubmitTeamInfoController } from './../useCases/SubmitTeamInfo/SubmitTeamInfoController';

export const submitTeamInfo = async (fastify: FastifyInstance) => {
  const submitTeamInfoController = new SubmitTeamInfoController(submitTeamInfoUseCase);
  
  fastify.post('/team/submit/info', async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      // Use o objeto body para acessar os dados da requisição
      const { name, email, providedInfo } = request.body as { name: string; email: string; providedInfo: boolean };

      // Chame o controlador
      await submitTeamInfoController.handle(request, reply);

      // Responda com uma mensagem de sucesso
      reply.status(201).send({ message: 'Team information successfully submitted.' });
    } catch (err) {
      // Lide com erros e retorne uma resposta apropriada
      reply.status(500).send({
        message: err.message || 'Unexpected error.',
      });
    }
  });
};
