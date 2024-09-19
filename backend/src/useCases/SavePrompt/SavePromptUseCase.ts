import { IPromptsRepository } from "../../repositories/IPromptsRepository";

export class SavePromptUseCase {
  constructor(
    private promptsRepository: IPromptsRepository,
  ) {}
  
  async execute(prompt: string) {

    await this.promptsRepository.savePrompt(prompt)

  }
}