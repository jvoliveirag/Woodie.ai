import { Prompt } from "../entities/Prompt";

export interface IPromptsRepository {
  savePrompt(prompt: string): Promise<Prompt>
  delete(promptId: string): Promise<void>
}