import { IMailProvider } from '../../providers/IMailProvider';
import { ITeamsRepository } from '../../repositories/ITeamsRepository';
import { CheckIfTeamSumittedInfoUseCase } from './CheckIfTeamSumittedInfoUseCase';

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

describe('CheckIfTeamSumittedInfoUseCase', () => {
  let checkIfTeamSumittedInfoUseCase: CheckIfTeamSumittedInfoUseCase;

  beforeEach(() => {
    jest.clearAllMocks();

    checkIfTeamSumittedInfoUseCase = new CheckIfTeamSumittedInfoUseCase(
      mockTeamsRepository,
      mockMailProvider,
    );
  });

  it('should return false if team info is not submitted and send a success email', async () => {
    // Arrange
    const email = 'woodie.ai@example.com';

    // Mock the repository to return team info without submitted info
    mockTeamsRepository.findByEmail.mockResolvedValueOnce({
      id: '1',
      name: 'Woodie.ai Team',
      email,
      providedInfo: false,
      teamInfo: 'Teste',
    });

    // Act
    const result = await checkIfTeamSumittedInfoUseCase.execute(email);

    // Assert
    expect(result).toBe(false);
    expect(mockMailProvider.sendMail).toHaveBeenCalledWith({
      to: {
        name: 'Woodie.ai Team',
        email,
      },
      from: {
        email: 'woodie.ai@pratica.com',
        name: 'Woodie.ai',
      },
      subject: 'Informações enviadas com sucesso.',
      body: '<p>Acesso à plataforma liberado!</p>',
    });
  });

  it('should return true if team info is submitted', async () => {
    // Arrange
    const email = 'woodie.ai@example.com';

    // Mock the repository to return team info with submitted info
    mockTeamsRepository.findByEmail.mockResolvedValueOnce({
      id: '1',
      name: 'Woodie.ai Team',
      email,
      providedInfo: true,
      teamInfo: 'Teste',
    });

    // Act
    const result = await checkIfTeamSumittedInfoUseCase.execute(email);

    // Assert
    expect(result).toBe(true);
    expect(mockMailProvider.sendMail).not.toHaveBeenCalled();
  });

  it('should throw an error if team is not found', async () => {
    // Arrange
    const email = 'woodie.ai@example.com';

    // Mock the repository to return null (indicating that the team doesn't exist)
    mockTeamsRepository.findByEmail.mockResolvedValueOnce(null);

    // Act and Assert
    await expect(checkIfTeamSumittedInfoUseCase.execute(email)).rejects.toThrow(
      'Team not found',
    );
    expect(mockMailProvider.sendMail).not.toHaveBeenCalled();
  });
});
