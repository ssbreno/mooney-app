import type { NextApiRequest, NextApiResponse } from 'next';
import { writeFile } from 'fs';
import { promisify } from 'util';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

const writeFileAsync = promisify(writeFile);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'POST') {
    const { htmlDocument } = req.body;
    const fileName = uuidv4() + '.html';
    const filePath = path.join(process.cwd(), 'data', fileName);

    try {
      await writeFileAsync(filePath, htmlDocument);
      res.status(200).json({ message: 'Document saved successfully' });
    } catch (error) {
      console.error('Error saving the document:', error);
      res.status(500).json({ error: 'Failed to save the document' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
