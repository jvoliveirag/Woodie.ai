import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  await prisma.prompt.deleteMany()

  await prisma.prompt.create({
    data: {
      title: 'Navegação do robô',
      template: `Como posso fazer para melhorar a navegação do meu robô no tapete da FLL?`.trim()
    }
  })

  await prisma.prompt.create({
    data: {
      title: 'Tipos de roda',
      template: `Como posso escolher o melhor tipo de roda para meu robô?`.trim()
    }
  })

  await prisma.prompt.create({
    data: {
      title: 'Estrutura',
      template: `Como desenvolver a melhor estrutura para o meu robô`.trim()
    }
  })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })