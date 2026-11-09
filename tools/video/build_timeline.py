"""Build the narrated class video's timeline and voice tracks.

Input
  tools/video/<lesson>_script.py   SCENES = [(part, scene_id, title, text), ...]
                                   text marks visual beats with {b:name}
  <clips_dir>/<scene_id>.mp3       one narration clip per scene (optional)

Output (docs/media/<lesson>/)
  timeline.json                    scenes, beat times and subtitle cues per part
  part1.mp3, part2.mp3, ...        the clips joined with short pauses

Without clips the durations are estimated from the text, so the visuals can be
built and previewed before the voice exists.

    python tools/video/build_timeline.py s2 --clips path/to/clips
"""
import argparse
import importlib.util
import json
import re
import subprocess
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
CHARS_PER_SEC = 16.5   # estimate used only when a clip is missing
LEAD = 0.5             # silence before the first scene of a part
GAP = 0.45             # pause between scenes
TAIL = 1.2             # silence after the last scene
BEAT = re.compile(r"\{b:([A-Za-z0-9]+)\}")


def load_script(lesson):
    path = ROOT / "tools" / "video" / f"{lesson}_script.py"
    spec = importlib.util.spec_from_file_location("script", path)
    mod = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(mod)
    return mod


def strip_beats(text):
    """Clean narration and the character offset of every beat in it."""
    beats, out, last = {}, "", 0
    for m in BEAT.finditer(text):
        out += text[last:m.start()]
        beats[m.group(1)] = len(out)
        last = m.end()
    out += text[last:]
    return out, beats


def cues(clean, dur):
    """Subtitle lines (≤ ~95 chars) timed by their character offset."""
    sents = re.split(r"(?<=[.!?:;])\s+", clean.strip())
    lines = []
    for s in sents:
        while len(s) > 95:
            cut = s.rfind(", ", 30, 90)
            if cut < 0:
                cut = s.rfind(" ", 30, 90)
            lines.append(s[: cut + 1].strip())
            s = s[cut + 1:].strip()
        if s:
            lines.append(s)
    out, offset = [], 0
    total = max(1, len(clean))
    for line in lines:
        i = clean.find(line, offset)
        i = offset if i < 0 else i
        out.append([round(dur * i / total, 2), line])
        offset = i + len(line)
    return out


def duration(path):
    r = subprocess.run(
        ["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", str(path)],
        capture_output=True, text=True, check=True,
    )
    return float(r.stdout.strip())


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("lesson")
    ap.add_argument("--clips", type=Path, help="folder with <scene_id>.mp3 clips")
    args = ap.parse_args()

    mod = load_script(args.lesson)
    out_dir = ROOT / "docs" / "media" / args.lesson
    out_dir.mkdir(parents=True, exist_ok=True)

    parts = []
    for p in mod.PARTS:
        parts.append({**p, "scenes": [], "duration": 0.0})
    by_id = {p["id"]: p for p in parts}

    for part_id, sid, title, text in mod.SCENES:
        part = by_id[part_id]
        clean, beat_chars = strip_beats(text)
        clip = args.clips / f"{sid}.mp3" if args.clips else None
        has_clip = bool(clip and clip.exists())
        dur = duration(clip) if has_clip else len(clean) / CHARS_PER_SEC
        start = (part["duration"] + GAP) if part["scenes"] else LEAD
        # A scene is shown from its start until the next one starts, so the
        # pause after a clip belongs to that scene.
        if part["scenes"]:
            part["scenes"][-1]["dur"] = round(start - part["scenes"][-1]["start"], 3)
        scene = {
            "id": sid,
            "title": title,
            "start": round(start, 3),
            "dur": round(dur, 3),
            "speech": round(dur, 3),
            "beats": {k: round(dur * c / max(1, len(clean)), 2) for k, c in beat_chars.items()},
            "cues": cues(clean, dur),
            "clip": str(clip) if has_clip else None,
        }
        part["scenes"].append(scene)
        part["duration"] = start + dur

    for i, part in enumerate(parts, 1):
        last = part["scenes"][-1]
        part["duration"] = round(part["duration"] + TAIL, 3)
        last["dur"] = round(part["duration"] - last["start"], 3)
        part["audio"] = f"part{i}.mp3"
        clips = [s["clip"] for s in part["scenes"]]
        if all(clips):
            build_audio(part, out_dir / part["audio"])
        else:
            part["audio"] = None
        for s in part["scenes"]:
            s.pop("clip")
            s.pop("speech")

    timeline = {
        "kicker": mod.KICKER,
        "title": mod.TITLE,
        "lede": mod.LEDE,
        "parts": parts,
    }
    (out_dir / "timeline.json").write_text(json.dumps(timeline, ensure_ascii=False, indent=1))
    for p in parts:
        print(p["id"], round(p["duration"], 1), "s", "audio" if p["audio"] else "(estimated, no audio)")


def build_audio(part, dest):
    """Place every clip at its scene start on a silent bed, as mono 96 kbps MP3."""
    inputs, filters = [], []
    for i, s in enumerate(part["scenes"]):
        inputs += ["-i", s["clip"]]
        ms = int(round(s["start"] * 1000))
        filters.append(f"[{i}:a]aformat=sample_rates=44100:channel_layouts=mono,adelay={ms}[a{i}]")
    n = len(part["scenes"])
    mix = "".join(f"[a{i}]" for i in range(n)) + f"amix=inputs={n}:normalize=0,apad=whole_dur={part['duration']}[out]"
    cmd = ["ffmpeg", "-v", "error", "-y", *inputs, "-filter_complex", ";".join(filters + [mix]),
           "-map", "[out]", "-t", str(part["duration"]), "-ac", "1", "-b:a", "96k", str(dest)]
    subprocess.run(cmd, check=True)


if __name__ == "__main__":
    main()
