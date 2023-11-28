import { MailtrapMailProvider } from '../../providers/implementations/MailtraoMailProvider';
import { SQLitePrismaTeamsRepository } from '../../repositories/implementations/SQLitePrismaTeamsRepository';
import { CheckIfTeamSumittedInfoController } from './CheckIfTeamSubmittedInfoContoller';
import { CheckIfTeamSumittedInfoUseCase } from './CheckIfTeamSumittedInfoUseCase';

const sqlitePrismaTeamsRepository = new SQLitePrismaTeamsRepository
const mailtrapMailProvider = new MailtrapMailProvider

const checkIfTeamSumittedInfoUseCase = new CheckIfTeamSumittedInfoUseCase(
  sqlitePrismaTeamsRepository,
  mailtrapMailProvider, 
)

const checkIfTeamSumittedInfoController = new CheckIfTeamSumittedInfoController(
  checkIfTeamSumittedInfoUseCase
)

export { checkIfTeamSumittedInfoController, checkIfTeamSumittedInfoUseCase };

