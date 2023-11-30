// SubmitTeamInfoUseCase.test.ts
import { TeamDTO } from '../../dtos/TeamDTO';
import { IMailProvider } from '../../providers/IMailProvider';
import { ITeamsRepository } from '../../repositories/ITeamsRepository';
import { SubmitTeamInfoUseCase } from './SubmitTeamInfoUseCase';

const mockTeamsRepository: jest.Mocked<ITeamsRepository> = {
  findByEmail: jest.fn(),
  save: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
  getAll: jest.fn(),
};

const mockMailProvider: jest.Mocked<IMailProvider> = {
  sendMail: jest.fn(),
};

describe('SubmitTeamInfoUseCase', () => {
  let submitTeamInfoUseCase: SubmitTeamInfoUseCase;

  beforeEach(() => {
    // Reset mock calls before each test
    jest.clearAllMocks();
    submitTeamInfoUseCase = new SubmitTeamInfoUseCase(
      mockTeamsRepository,
      mockMailProvider,
    );
  });

  it('should submit team info and send a success email', async () => {
    // Arrange
    const teamInfoRequest: TeamDTO = {
      name: 'Woodie.ai Team',
      email: 'woodie.ai@example.com',
      providedInfo: true,
      teamInfo: '',
    };

    // Mock the repository to return null (indicating that team info doesn't exist)
    mockTeamsRepository.findByEmail.mockResolvedValueOnce(null);

    // Act
    await submitTeamInfoUseCase.execute(teamInfoRequest);

    // Assert
    const receivedObject = mockTeamsRepository.save.mock.calls[0][0];
    const expectedObject = {
      name: teamInfoRequest.name,
      email: teamInfoRequest.email,
      providedInfo: true,
      // other expected properties...
    };

    // Remove the "id" property from the received object
    const { id, teamInfo, ...filteredReceivedObject } = receivedObject;

    expect(filteredReceivedObject).toEqual(expect.objectContaining(expectedObject));
    expect(mockMailProvider.sendMail).toHaveBeenCalledWith({
      to: {
        name: teamInfoRequest.name,
        email: teamInfoRequest.email,
      },
      from: {
        email: 'woodie.ai@pratica.com',
        name: 'Woodie.ai',
      },
      subject: 'Informações enviadas com sucesso.',
      body: '<p>Acesso à plataforma liberado!</p>',
    });
  });

  it('should throw an error if team info is already submitted', async () => {
    // Arrange
    const teamInfoRequest: TeamDTO = {
      name: 'Woodie.ai Team',
      email: 'woodie.ai@example.com',
      providedInfo: true,
      teamInfo: '',
    };

    // Mock the repository to return team info (indicating that info is already submitted)
    mockTeamsRepository.findByEmail.mockResolvedValueOnce({
      id: '1',
      name: 'Woodie.ai Team',
      email: 'woodie.ai@example.com',
      providedInfo: true, // Change this to true to simulate existing info
      teamInfo: 'teste',
    });

    // Act and Assert
    await expect(
      submitTeamInfoUseCase.execute(teamInfoRequest),
    ).rejects.toThrow('As informações já foram submetidas.');
  });
});
