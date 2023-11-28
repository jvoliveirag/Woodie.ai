import { IMailProvider } from "../../providers/IMailProvider";
import { ITeamsRepository } from "../../repositories/ITeamsRepository";
import { TeamDTO } from './../../dtos/TeamDTO';
import { Team } from './../../entities/Team';

export class SubmitTeamInfoUseCase {
  constructor(
    private teamsRepository: ITeamsRepository,
    private mailProvider: IMailProvider
  ) {}
  
  async execute(data: TeamDTO) {
    const teamInfoAlreadyExists = await this.teamsRepository.findByEmail(data.email)

    if(teamInfoAlreadyExists?.providedInfo) {
      throw new Error("As informações já foram submetidas.")
    }

    const team = new Team(data)

    await this.teamsRepository.save(team)

    //independent of the protocol to send the email
    await this.mailProvider.sendMail({
      to: {
        name: team.name,
        email: team.email
      },
      from: {
        email: 'woodie.ai@pratica.com',
        name: 'Woodie.ai'
      },
      subject: 'Informações enviadas com sucesso.',
      body: '<p>Acesso à plataforma liberado!</p>'
    })
  }
}