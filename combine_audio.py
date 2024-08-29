import logging
from fastapi import FastAPI, HTTPException, Request
from pydub import AudioSegment
import os
from typing import List
from pydantic import BaseModel

app = FastAPI()

# Configure logging to write to a file
log_file_path = '/var/log/fastapi_app.log'
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler(log_file_path),
        logging.StreamHandler()  # Optional: still log to the console
    ]
)

# Path where audio clips are stored
AUDIO_CLIPS_PATH = '/var/www/html/audio_clips'

class CombineAudioRequest(BaseModel):
    filenames: List[str]

def combine_audio(filenames: List[str], output_path: str) -> bool:
    combined = AudioSegment.empty()
    for filename in filenames:
        file_path = os.path.join(AUDIO_CLIPS_PATH, filename)
        if os.path.exists(file_path):
            try:
                audio = AudioSegment.from_file(file_path)
                combined += audio
            except Exception as e:
                logging.error(f"Error loading file {file_path}: {e}")
                return False
        else:
            logging.error(f"File {file_path} does not exist")
            return False
    try:
        combined.export(output_path, format="mp3")
    except Exception as e:
        logging.error(f"Error exporting combined audio: {e}")
        return False
    return True

@app.post("/api/combine-audio")
async def combine_audio_endpoint(request: Request):
    try:
        data = await request.json()
        filenames = data.get('filenames', [])

        if not filenames:
            logging.error("No filenames provided in the request.")
            raise HTTPException(status_code=400, detail="No filenames provided")

        # Ensure the directory exists
        os.makedirs(AUDIO_CLIPS_PATH, exist_ok=True)

        # Define the correct output path within /var/www/html/audio_clips
        output_file = os.path.join(AUDIO_CLIPS_PATH, 'combined_audio.mp3')

        logging.info(f"Attempting to combine files: {filenames}")

        # Combine audio files
        success = combine_audio(filenames, output_file)

        if success:
            logging.info(f"Successfully combined files: {filenames} into {output_file}")
            return {"url": f"/combined_audio.mp3"}
        else:
            logging.error("Failed to combine audio files inside the API.")
            raise HTTPException(status_code=500, detail="Failed to combine audio files")

    except HTTPException as http_exc:
        logging.error(f"HTTP Exception: {http_exc.detail}")
        raise http_exc
    except Exception as e:
        logging.error(f"Unexpected error during request handling: {e}")
        raise HTTPException(status_code=500, detail="Internal Server Error")
