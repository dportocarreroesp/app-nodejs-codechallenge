import { PrismaClient } from '@prisma/client';

// initialize Prisma Client
const prisma = new PrismaClient();

async function main() {
  const transactionTypes = ['TRANSFER', 'PAYMENT', 'DEPOSIT', 'REFUND'];

  for (const name of transactionTypes) {
    const trxType = await prisma.transactionType.findFirst({
      where: {
        name,
      },
    });

    if (!trxType) {
      await prisma.transactionType.create({
        data: {
          name,
        },
      });
    }
  }

  console.info('Seeding done!');
}

// execute the main function
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // close Prisma Client at the end
    await prisma.$disconnect();
    process.exit(0);
  });
