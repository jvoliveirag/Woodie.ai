import { Prompt } from "../../entities/Prompt";
import { prisma } from "../../lib/prisma";
import { IPromptsRepository } from "../IPromptsRepository";

export class PrismaPromptsRepository implements IPromptsRepository {

  async savePrompt(prompt: string): Promise<Prompt> {
    const title = (prompt.substring(0, 25) + "...");

    const createdPrompt = await prisma.prompt.create({
      data: {
        title: title,
        template: prompt,
      },
    });
    return createdPrompt
  }

  async delete(promptId: string): Promise<void> {
    await prisma.prompt.delete({
      where: {
        id: promptId
      }
    })
    console.log('Prompt succesfully deleted')
  }

}