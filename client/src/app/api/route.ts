export const runtime = 'edge';

export async function POST(req: Request, res: Response) {
  try {
    const data = await req.formData();

    const transcriptRes = await fetch('https://api.vt.broski.lol/api', {
      method: 'POST',
      body: data,
    });

    if (transcriptRes.ok) {
      const transcript = await transcriptRes.text();
      // console.log("transcript", transcript);
      return new Response(transcript);
    } else {
      console.error("transcriptRes", await transcriptRes.text());
    }

    return new Response("Transcription failed", { status: transcriptRes.status });
  } catch (err) {
    console.error(err);
    return new Response("Transcription failed", { status: 500 });
  }
}