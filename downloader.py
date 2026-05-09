#!/usr/bin/env python3
"""
BoyfriendTV video downloader — wraps yt-dlp with quality selection and
organised output to ~/Downloads/BOYFRIENDTV/.
"""

import argparse
import sys
from pathlib import Path

try:
    import yt_dlp
except ImportError:
    sys.exit("yt-dlp is not installed. Run: pip install yt-dlp")

OUTPUT_DIR = Path.home() / "Downloads" / "BOYFRIENDTV"


def list_formats(url: str) -> None:
    opts = {"quiet": True, "no_warnings": True, "listformats": True}
    with yt_dlp.YoutubeDL(opts) as ydl:
        ydl.download([url])


def download(url: str, quality: str, output_dir: Path) -> None:
    output_dir.mkdir(parents=True, exist_ok=True)

    # quality is a height like "1080", "720", "480", or "best"/"worst"
    if quality.isdigit():
        format_selector = f"bestvideo[height<={quality}]+bestaudio/best[height<={quality}]/best"
    else:
        format_selector = quality  # "best", "worst", or a yt-dlp format string

    opts = {
        "format": format_selector,
        "outtmpl": str(output_dir / "%(title)s.%(ext)s"),
        "merge_output_format": "mp4",
        "noplaylist": True,
        "progress": True,
    }

    with yt_dlp.YoutubeDL(opts) as ydl:
        info = ydl.extract_info(url, download=False)
        title = info.get("title", "video")
        print(f"Title   : {title}")
        print(f"Quality : {quality}")
        print(f"Output  : {output_dir}")
        print()
        ydl.download([url])


def build_parser() -> argparse.ArgumentParser:
    p = argparse.ArgumentParser(
        prog="downloader",
        description="Download BoyfriendTV videos as MP4.",
    )
    p.add_argument("url", help="BoyfriendTV video URL")
    p.add_argument(
        "-q", "--quality",
        default="best",
        metavar="HEIGHT|PRESET",
        help="Max height in pixels (e.g. 1080, 720, 480) or yt-dlp preset "
             "(best / worst). Default: best",
    )
    p.add_argument(
        "-o", "--output",
        default=str(OUTPUT_DIR),
        metavar="DIR",
        help=f"Output directory. Default: {OUTPUT_DIR}",
    )
    p.add_argument(
        "-l", "--list-formats",
        action="store_true",
        help="List all available formats and exit",
    )
    return p


def main() -> None:
    args = build_parser().parse_args()
    output_dir = Path(args.output)

    if args.list_formats:
        list_formats(args.url)
        return

    try:
        download(args.url, args.quality, output_dir)
    except yt_dlp.utils.DownloadError as exc:
        sys.exit(f"Download failed: {exc}")


if __name__ == "__main__":
    main()
