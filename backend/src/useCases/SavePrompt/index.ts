import { PrismaPromptsRepository } from "../../repositories/implementations/PrismaPromptsRepository";
import { SavePromptController } from "./SavePromptController";
import { SavePromptUseCase } from "./SavePromptUseCase";

const prismaPromptsRepository = new PrismaPromptsRepository

const savePromptUseCase = new SavePromptUseCase(
    prismaPromptsRepository,
)

const savePromptController = new SavePromptController(
    savePromptUseCase
)

export { savePromptController, savePromptUseCase };

