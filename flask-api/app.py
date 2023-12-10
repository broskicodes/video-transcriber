from flask import Flask, jsonify, send_file, request
from io import BytesIO
from moviepy.editor import VideoFileClip
import tempfile
import openai
import os
from dotenv import load_dotenv
from flask_cors import CORS

load_dotenv()
client = openai.OpenAI()


app = Flask(__name__)
CORS(app)

@app.route('/api', methods=['POST'])
def create_mp3():
  # TODO: validate that request content type is a video
  
  video_file = request.files['video']

  try:
    with tempfile.NamedTemporaryFile(delete=False, suffix=".mp4") as temp_video_file:
      video_file.save(temp_video_file.name)


    clip = VideoFileClip(temp_video_file.name)
    audio = clip.audio

    with tempfile.NamedTemporaryFile(delete=False, suffix=".mp3") as temp_audio_file:
      None
      
    # Save the audio to the temporary file
    audio.write_audiofile(temp_audio_file.name, codec="libmp3lame")

    # Read the saved audio file into a BytesIO buffer
    with open(temp_audio_file.name, 'rb') as audio_file:
      print(os.path.getsize(temp_audio_file.name))      
      transcript = client.audio.transcriptions.create(
        model="whisper-1", 
        file=audio_file, 
        response_format="text"
      )
    
    print(transcript)
    
    os.remove(temp_video_file.name)
    os.remove(temp_audio_file.name)

    return transcript
    
  except Exception as e:
      print(e)
      return {"error": str(e)}, 500

    
if __name__ == '__main__':
    app.run(debug=False, host='0.0.0.0')
    # app.run()
    
    