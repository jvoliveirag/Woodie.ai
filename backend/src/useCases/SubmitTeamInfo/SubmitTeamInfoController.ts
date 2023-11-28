import { FastifyReply, FastifyRequest } from 'fastify';
import { SubmitTeamInfoUseCase } from './SubmitTeamInfoUseCase';

export class SubmitTeamInfoController {

 constructor(private submitTeamInfoUseCase: SubmitTeamInfoUseCase) {}

 async handle(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    const { name, email, providedInfo, teamInfo } = request.body as { name: string; email: string; providedInfo: boolean; teamInfo: string };

    try {
      if (!name || !email || !providedInfo || !teamInfo) {
        reply.status(400).send({ error: 'All fields required' });
        return;
      }

      await this.submitTeamInfoUseCase.execute({
        name,
        email,
        providedInfo,
        teamInfo
      });

      reply.status(201).send({ message: 'Team information successfully submitted.' });
    } catch (err) {
      reply.status(500).send({
        message: err.message || 'Unexpected error.',
      });
    }
 }
}