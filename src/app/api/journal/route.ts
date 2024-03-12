import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  const res = await request.json();
  const { content } = res;
  try {
    const newEntry = await prisma.journal.create({
      data: {
        content,
      },
    });
    return Response.json(newEntry);
  } catch (error) {
    return Response.json({ error: 'Error creating journal entry' });
  }
}
