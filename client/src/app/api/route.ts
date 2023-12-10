import { createReadStream, createWriteStream, readFileSync, writeFileSync } from "fs";
import path from "path";

export async function POST(req: Request, res: Response) {
  // const videoBytes = req.body;

  console.log("req.body", req);

  const bytes = readFileSync(path.join(process.cwd(), "public", "mos2.mp4"));

  const transcriptRes = await fetch('https://vt-api.delightfulcoast-28ab86c4.eastus.azurecontainerapps.io/api', {
    method: 'POST',
    headers: {
      'Content-Type': 'video/mp4',
    },
    body: bytes
  });

  if (transcriptRes.ok) {
    const transcript = await transcriptRes.text();
    console.log("transcript", transcript);
    return new Response(transcript);
  }

  return new Response("fail");
}