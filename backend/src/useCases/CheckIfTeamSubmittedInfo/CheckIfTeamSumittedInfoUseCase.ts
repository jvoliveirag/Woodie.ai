import { IMailProvider } from "../../providers/IMailProvider";
import { ITeamsRepository } from "../../repositories/ITeamsRepository";

export class CheckIfTeamSumittedInfoUseCase {
  constructor(
    private teamsRepository: ITeamsRepository, 
    private mailProvider: IMailProvider
  ) {}

  async execute(email: string): Promise<boolean> {
    const teamInfo = await this.teamsRepository.findByEmail(email);

    if(!teamInfo){
      throw new Error("Team not found")
    }

    if(!teamInfo.providedInfo){
      await this.mailProvider.sendMail({
        to: {
          name: teamInfo.name,
          email: teamInfo.email
        },
        from: {
          email: 'woodie.ai@pratica.com',
          name: 'Woodie.ai'
        },
        subject: 'Informações enviadas com sucesso.',
        body: '<p>Acesso à plataforma liberado!</p>'
      })
    }
    // Verifica se o time existe e se já submeteu as informações
    return !!teamInfo && teamInfo.providedInfo;
  }
}
