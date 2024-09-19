// src/routes/get-team-info.ts
import { FastifyInstance } from 'fastify';
import { prisma } from '../lib/prisma';

export async function getTeamInfoRoute(app: FastifyInstance) {
  app.get('/team/info/:email', async (request, reply) => {
    try {
      // Obtenha o email dos parâmetros da URL
      const { email } = request.params as { email: string };

      // Recupere as informações do time com base no email
      const teamInfo = await prisma.team.findUnique({
        where: { email },
      });

      if (!teamInfo) {
        // Caso o time não seja encontrado, retorne um erro 404
        reply.status(404).send({ message: 'Team not found.' });
        return;
      }

      // Envie as informações como resposta
      reply.status(200).send(teamInfo.teamInfo);
    } catch (error) {
      // Lide com erros e envie uma resposta de erro
      reply.status(500).send({
        message: error.message || 'Unexpected error occurred.',
      });
    }
  });
}
