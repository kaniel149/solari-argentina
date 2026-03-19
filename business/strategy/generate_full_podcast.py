#!/usr/bin/env python3
"""
Generate full Argentina Solar podcast using ElevenLabs
Split into chunks to avoid character limits
"""

import os
import requests
from pathlib import Path
import subprocess

# ElevenLabs config
ELEVENLABS_API_KEY = os.getenv("ELEVENLABS_API_KEY", "sk_e34b71da68a92816fbefc09a6c21bb90ee86d1e2c3e99c51")
VOICE_ID = "nGHEi2LLCNB42mOBggON"  # Kaniel Hebrew HQ
MODEL = "eleven_turbo_v2_5"

# Read the script
script_path = Path(__file__).parent / "podcast-script-argentina-solar.md"
with open(script_path, "r", encoding="utf-8") as f:
    content = f.read()

# Extract just the script (after "## סקריפט")
script_start = content.find("## סקריפט")
script_text = content[script_start:].replace("## סקריפט", "").strip()

# Remove markdown headers (### becomes pause)
script_text = script_text.replace("###", "\n\n")

print(f"📝 Script length: {len(script_text)} chars, ~{len(script_text.split())} words")

# Split into chapters (natural breaks)
chapters = [
    {
        "name": "intro",
        "text": script_text[: script_text.find("### פרק 1")].strip()
    },
    {
        "name": "chapter1_resource",
        "text": script_text[
            script_text.find("פרק 1: למה ארגנטינה"):
            script_text.find("פרק 2: הרגולציה")
        ].strip()
    },
    {
        "name": "chapter2_regulation",
        "text": script_text[
            script_text.find("פרק 2: הרגולציה"):
            script_text.find("פרק 3: שוק החשמל")
        ].strip()
    },
    {
        "name": "chapter3_tariffs",
        "text": script_text[
            script_text.find("פרק 3: שוק החשמל"):
            script_text.find("פרק 4: מצב השוק")
        ].strip()
    },
    {
        "name": "chapter4_market",
        "text": script_text[
            script_text.find("פרק 4: מצב השוק"):
            script_text.find("פרק 5: עלויות ציוד")
        ].strip()
    },
    {
        "name": "chapter5_equipment",
        "text": script_text[
            script_text.find("פרק 5: עלויות ציוד"):
            script_text.find("פרק 6: מימון")
        ].strip()
    },
    {
        "name": "chapter6_financing",
        "text": script_text[
            script_text.find("פרק 6: מימון"):
            script_text.find("פרק 7: אתגרים")
        ].strip()
    },
    {
        "name": "chapter7_challenges",
        "text": script_text[
            script_text.find("פרק 7: אתגרים"):
            script_text.find("פרק 8: ההזדמנות")
        ].strip()
    },
    {
        "name": "chapter8_opportunity",
        "text": script_text[
            script_text.find("פרק 8: ההזדמנות"):
            script_text.find("### סיכום")
        ].strip()
    },
    {
        "name": "conclusion",
        "text": script_text[script_text.find("### סיכום"):].strip()
    }
]

output_dir = Path(__file__).parent / "audio_chunks"
output_dir.mkdir(exist_ok=True)

print(f"\n🎙️ Generating {len(chapters)} audio chunks...\n")

audio_files = []

for i, chapter in enumerate(chapters, 1):
    print(f"[{i}/{len(chapters)}] {chapter['name']} ({len(chapter['text'])} chars)... ", end="", flush=True)

    # Call ElevenLabs TTS
    response = requests.post(
        f"https://api.elevenlabs.io/v1/text-to-speech/{VOICE_ID}",
        headers={
            "xi-api-key": ELEVENLABS_API_KEY,
            "Content-Type": "application/json"
        },
        json={
            "text": chapter['text'],
            "model_id": MODEL,
            "voice_settings": {
                "stability": 0.5,
                "similarity_boost": 0.75,
                "style": 0.0,
                "use_speaker_boost": True
            }
        }
    )

    if response.status_code == 200:
        chunk_file = output_dir / f"{i:02d}_{chapter['name']}.mp3"
        with open(chunk_file, "wb") as f:
            f.write(response.content)
        audio_files.append(str(chunk_file))
        print(f"✅ {chunk_file.stat().st_size / 1024:.1f} KB")
    else:
        print(f"❌ Error {response.status_code}: {response.text}")
        exit(1)

# Concatenate all chunks using ffmpeg
print(f"\n🔗 Concatenating {len(audio_files)} chunks...")

concat_file = output_dir / "concat_list.txt"
with open(concat_file, "w") as f:
    for audio_file in audio_files:
        f.write(f"file '{audio_file}'\n")

final_output = Path(__file__).parent / "podcast-argentina-solar-FULL.mp3"

result = subprocess.run(
    [
        "ffmpeg",
        "-f", "concat",
        "-safe", "0",
        "-i", str(concat_file),
        "-c", "copy",
        "-y",
        str(final_output)
    ],
    capture_output=True,
    text=True
)

if result.returncode == 0:
    print(f"✅ Full podcast saved: {final_output}")
    print(f"📊 Size: {final_output.stat().st_size / (1024*1024):.2f} MB")

    # Get duration
    duration_result = subprocess.run(
        ["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "default=noprint_wrappers=1:nokey=1", str(final_output)],
        capture_output=True,
        text=True
    )
    if duration_result.returncode == 0:
        duration_sec = float(duration_result.stdout.strip())
        mins = int(duration_sec // 60)
        secs = int(duration_sec % 60)
        print(f"⏱️  Duration: {mins}:{secs:02d}")
else:
    print(f"❌ ffmpeg error: {result.stderr}")
    exit(1)

print("\n🎉 Done!")
