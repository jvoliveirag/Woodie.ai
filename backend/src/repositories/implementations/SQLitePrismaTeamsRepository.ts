import { Team } from "../../entities/Team";
import { prisma } from "../../lib/prisma";
import { ITeamsRepository } from "../ITeamsRepository";

export class SQLitePrismaTeamsRepository implements ITeamsRepository {

  async findByEmail(email: string): Promise<Team | null> {
    const team = await prisma.team.findUnique({
      where: {
        email,
      },
    })
    return team ? team : null
  }

  async save(team: Team): Promise<Team> {
    const createdTeam = await prisma.team.create({
      data: {
        name: team.name,
        email: team.email,
        providedInfo: team.providedInfo,
        teamInfo: team.teamInfo
      },
    });
    return createdTeam;
  }

  async update(email: string, data: Partial<Team>): Promise<Team> {
    const updatedTeam = await prisma.team.update({
      where: {
        email: email
      },
      data: {
        name: data.name,
        email: data.email,
        providedInfo: data.providedInfo,
      }
    });
    return updatedTeam
  }

  async delete(email: string): Promise<void> {
    await prisma.team.delete({
      where: {
        email: email
      }
    })
    console.log('Team succesfully deleted')
  }

  async getAll(): Promise<Team[]> {
    try {

      const teamsList = await prisma.team.findMany()

      const modifiedTeamsList = Array.from(teamsList).map((team) => {
        const { createdAt, ...rest } = team;
        return rest;
      });

      return modifiedTeamsList

    } catch(err) {
      console.log('Erro: ', err);
      return err
    }
  }
}