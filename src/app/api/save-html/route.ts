import { writeFile } from 'fs';
import { promisify } from 'util';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

const writeFileAsync = promisify(writeFile);

export async function POST(request: Request) {
  const res = await request.json();
  const { htmlDocument } = res;
  const fileName = uuidv4() + '.html';
  const filePath = path.join(process.cwd(), 'data', fileName);

  try {
    await writeFileAsync(filePath, htmlDocument);
    return Response.json({ message: 'Document saved successfully' });
  } catch (error) {
    return Response.json({ error: 'Failed to save the document' });
  }
}
