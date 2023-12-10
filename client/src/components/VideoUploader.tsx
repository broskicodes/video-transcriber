/**
 * This code was generated by v0 by Vercel.
 * @see https://v0.dev/t/CfiFwCc6Q2z
 */
import { CardTitle, CardDescription, CardHeader, CardContent, Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useCallback, useRef, useState } from 'react'


export function VideoUploader() {
  const videoFileRef = useRef<HTMLInputElement | null>(null);
  const [transcriptText, setTranscriptText] = useState<string>('');

  const handleClick = useCallback(async () => {
    if (videoFileRef.current?.files && videoFileRef.current?.files.length < 1) {
      setTranscriptText('No video file selected');
      return;
    }

    setTranscriptText('Loading...');
    // @ts-ignore
    const vidFile: File = videoFileRef.current?.files[0];
    const formData = new FormData();
    formData.append('video', vidFile);

    const res = await fetch('https://api.vt.broski.lol/api', {
      method: 'POST',
      body: formData
    })

    if (!res.ok) {
      setTranscriptText("Transcription failed");
      return;
    }

    const transcript = await res.text();
    setTranscriptText(transcript);
  }, []);


  return (
    <>
      <div className="flex flex-col gap-6 md:gap-12 md:max-w-2xl mx-auto p-4 md:p-6">
        <h1 className="text-2xl font-bold text-center">Get a full transcript for and video file (less than 512MB)</h1>
        <Card className="bg-[#ffffff] dark:bg-[#1f2937]">
          <CardHeader className="p-4">
            <CardTitle className="text-lg font-semibold">Upload Your Video</CardTitle>
            <CardDescription className="text-sm text-gray-500 dark:text-gray-400">
              Select a video file from your device then press &apos;Upload Video&apos;.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-4">
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="video-upload">Video</Label>
              <Input accept="video/*" className="bg-[#ffffff] dark:bg-[#1f2937]" id="video-upload" type="file" ref={videoFileRef} />
            </div>
            <Button onClick={handleClick} className="w-full mt-4 outline outline-1 hover:bg-gray-600">
              Upload Video
            </Button>
          </CardContent>
        </Card>
        <Card className="bg-[#ffffff] dark:bg-[#1f2937]">
          <CardHeader className="p-4">
            <CardTitle className="text-lg font-semibold">Video Transcript</CardTitle>
            <CardDescription className="text-sm text-gray-500 dark:text-gray-400">
              The transcript of your uploaded video will appear here.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-4">
            <div className="grid w-full gap-1.5">
              <Label htmlFor="transcript">Transcript</Label>
              <Textarea className="bg-[#ffffff] dark:bg-[#1f2937]" id="transcript" rows={16} readOnly value={transcriptText} />
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
