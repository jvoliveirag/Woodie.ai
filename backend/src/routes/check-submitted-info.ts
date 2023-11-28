import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { checkIfTeamSumittedInfoController } from '../useCases/CheckIfTeamSubmittedInfo';

export const checkIfTeamSubmittedInfo = async (fastify: FastifyInstance) => {

  fastify.get('/team/check/info/:email', async (request: FastifyRequest, reply: FastifyReply) => {
    return checkIfTeamSumittedInfoController.handle(request, reply)
  })
}