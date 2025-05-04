
import { PrismaClient } from '@prisma/client'
import * as bcrypt from 'bcrypt'

const prisma = new PrismaClient()

async function main() {
  const senhaHasheada = await bcrypt.hash('senha123', 10)

  await prisma.usuario.upsert({
    where: { email: 'admin@fluxo360.com' },
    update: {},
    create: {
      nome: 'Administrador',
      email: 'admin@fluxo360.com',
      senhaHasheada
    },
  })

  console.log('Usuário admin criado com sucesso!')
}

main()
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect())
