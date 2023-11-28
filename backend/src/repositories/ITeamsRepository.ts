import { Team } from "../entities/Team";

export interface ITeamsRepository {
  findByEmail(email: string): Promise<Team | null>
  save(team: Team): Promise<Team>
  update(email: string, data: Partial<Team>): Promise<Team>
  delete(email: string): Promise<void>
  getAll(): Promise<Team[]>
}