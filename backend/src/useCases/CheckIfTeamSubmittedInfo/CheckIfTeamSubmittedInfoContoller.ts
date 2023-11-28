import { FastifyReply, FastifyRequest } from 'fastify';
import { CheckIfTeamSumittedInfoUseCase } from './CheckIfTeamSumittedInfoUseCase';

export class CheckIfTeamSumittedInfoController {
  constructor(private checkIfTeamSumittedInfoUseCase: CheckIfTeamSumittedInfoUseCase) {}

  async handle(request: FastifyRequest, reply: FastifyReply): Promise<Response> {
    try {
      const { email } = request.params as { email: string };

      if (!email) {
        reply.status(400).send({ error: 'Email is required' });
        return;
      }

      const hasSubmittedInfo = await this.checkIfTeamSumittedInfoUseCase.execute(email);

      reply.status(200).send({ hasSubmittedInfo });
    } catch (err) {
      reply.status(500).send({
        message: err.message || 'Unexpected error.',
      });
    }
  }
}
