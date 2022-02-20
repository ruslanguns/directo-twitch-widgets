import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const created = await prisma.chat.create({
    data: { message: 'Mi otro mensaje' },
  });

  console.log('Chat creado!', created);

  const chats = await prisma.chat.findMany();

  console.log('Chats guardados', chats);

  await prisma.chat.deleteMany();
}

main().finally(() => {
  prisma.$disconnect();
});
