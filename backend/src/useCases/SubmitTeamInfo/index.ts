import { MailtrapMailProvider } from './../../providers/implementations/MailtraoMailProvider';
import { SQLitePrismaTeamsRepository } from './../../repositories/implementations/SQLitePrismaTeamsRepository';
import { SubmitTeamInfoController } from './SubmitTeamInfoController';
import { SubmitTeamInfoUseCase } from './SubmitTeamInfoUseCase';

const sqlitePrismaTeamsRepository = new SQLitePrismaTeamsRepository
const mailtrapMailProvider = new MailtrapMailProvider

const submitTeamInfoUseCase = new SubmitTeamInfoUseCase(
  sqlitePrismaTeamsRepository,
  mailtrapMailProvider, 
)

const submitTeamInfoController = new SubmitTeamInfoController(
  submitTeamInfoUseCase
)

export { submitTeamInfoController, submitTeamInfoUseCase };

