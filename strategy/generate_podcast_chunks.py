#!/usr/bin/env python3
"""
Generate Argentina Solar Podcast in chunks using ElevenLabs
Avoids truncation by splitting into natural chapter breaks
"""

import os
from pathlib import Path
from elevenlabs.client import ElevenLabs
from elevenlabs import save, VoiceSettings

# Config
API_KEY = os.getenv("ELEVENLABS_API_KEY", "sk_e34b71da68a92816fbefc09a6c21bb90ee86d1e2c3e99c51")
VOICE_ID = "nGHEi2LLCNB42mOBggON"  # Kaniel Hebrew HQ
MODEL = "eleven_multilingual_v2"  # Most reliable for Hebrew

client = ElevenLabs(api_key=API_KEY)

# Read script
script_path = Path(__file__).parent / "podcast-script-argentina-solar.md"
with open(script_path, "r", encoding="utf-8") as f:
    full_text = f.read()

# Extract script content (after "## סקריפט")
script_start = full_text.find("## סקריפט")
if script_start == -1:
    print("❌ Could not find '## סקריפט' marker")
    exit(1)

script_text = full_text[script_start + len("## סקריפט"):].strip()

# Manual chapter splits (based on actual content)
chapters = [
    {
        "name": "00_intro",
        "start": "שלום וברוכים הבאים",
        "end": "### פרק 1:"
    },
    {
        "name": "01_resource",
        "start": "### פרק 1: למה ארגנטינה",
        "end": "### פרק 2: הרגולציה"
    },
    {
        "name": "02_regulation",
        "start": "### פרק 2: הרגולציה",
        "end": "### פרק 3: שוק החשמל"
    },
    {
        "name": "03_tariffs",
        "start": "### פרק 3: שוק החשמל",
        "end": "### פרק 4: מצב השוק"
    },
    {
        "name": "04_market",
        "start": "### פרק 4: מצב השוק",
        "end": "### פרק 5: עלויות ציוד"
    },
    {
        "name": "05_equipment",
        "start": "### פרק 5: עלויות ציוד",
        "end": "### פרק 6: מימון"
    },
    {
        "name": "06_financing",
        "start": "### פרק 6: מימון",
        "end": "### פרק 7: אתגרים"
    },
    {
        "name": "07_challenges",
        "start": "### פרק 7: אתגרים",
        "end": "### פרק 8: ההזדמנות"
    },
    {
        "name": "08_opportunity",
        "start": "### פרק 8: ההזדמנות",
        "end": "### סיכום"
    },
    {
        "name": "09_conclusion",
        "start": "### סיכום",
        "end": None  # Until end
    }
]

# Extract text for each chapter
chapter_texts = []
for chapter in chapters:
    start_idx = script_text.find(chapter["start"])
    if start_idx == -1:
        print(f"⚠️  Warning: Could not find start marker for {chapter['name']}")
        continue

    if chapter["end"]:
        end_idx = script_text.find(chapter["end"], start_idx + 1)
        if end_idx == -1:
            text = script_text[start_idx:]
        else:
            text = script_text[start_idx:end_idx]
    else:
        text = script_text[start_idx:]

    # Clean markdown headers
    text = text.replace("###", "").strip()

    chapter_texts.append({
        "name": chapter["name"],
        "text": text,
        "chars": len(text),
        "words": len(text.split())
    })

print(f"📝 Script split into {len(chapter_texts)} chapters\n")

# Create output directory
output_dir = Path(__file__).parent / "audio_chunks"
output_dir.mkdir(exist_ok=True)

# Generate audio for each chapter
audio_files = []
total_size = 0

for i, chapter in enumerate(chapter_texts, 1):
    print(f"[{i}/{len(chapter_texts)}] {chapter['name']}")
    print(f"    {chapter['chars']} chars, {chapter['words']} words... ", end="", flush=True)

    try:
        # Generate TTS
        audio = client.text_to_speech.convert(
            text=chapter['text'],
            voice_id=VOICE_ID,
            model_id=MODEL,
            voice_settings=VoiceSettings(
                stability=0.6,
                similarity_boost=0.85,
                style=0.2,
                use_speaker_boost=True
            )
        )

        # Save
        output_file = output_dir / f"{chapter['name']}.mp3"
        save(audio, str(output_file))

        file_size = output_file.stat().st_size
        total_size += file_size
        audio_files.append(str(output_file))

        print(f"✅ {file_size / 1024:.1f} KB")

    except Exception as e:
        print(f"❌ Error: {e}")
        exit(1)

print(f"\n✅ Generated {len(audio_files)} audio chunks")
print(f"📊 Total size: {total_size / (1024*1024):.2f} MB")
print(f"\n📂 Files saved to: {output_dir}")

# Create concat list for ffmpeg
concat_file = output_dir / "concat_list.txt"
with open(concat_file, "w") as f:
    for audio_file in audio_files:
        f.write(f"file '{audio_file}'\n")

print(f"\n💡 To merge all chunks into one file:")
print(f"   cd {output_dir}")
print(f"   ffmpeg -f concat -safe 0 -i concat_list.txt -c copy ../podcast-argentina-solar-FULL.mp3")
