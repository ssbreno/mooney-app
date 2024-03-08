import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'POST') {
    const { content, createdAt } = req.body;
    try {
      const newEntry = await prisma.journal.create({
        data: {
          content,
          createdAt: new Date(createdAt),
        },
      });
      res.status(200).json(newEntry);
    } catch (error) {
      console.error('Request error', error);
      res.status(500).json({ error: 'Error creating journal entry' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
