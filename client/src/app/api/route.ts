import { createReadStream, createWriteStream, readFileSync, writeFileSync } from "fs";
import OpenAI from "openai";
import path from "path";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export async function POST(req: Request, res: Response) {
  // const videoBytes = req.body;

  console.log("req.body", req);

  const bytes = readFileSync(path.join(process.cwd(), "public", "mos2.mp4"));

  const transcriptRes = await fetch('http://localhost:5000/api', {
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