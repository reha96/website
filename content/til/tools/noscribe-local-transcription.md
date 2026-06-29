---
title: "noScribe — a privacy-first, local alternative to Google transcription"
date: "2026-06-17"
tags: ["transcription", "ai", "open-source", "privacy", "speech-to-text"]
---

# noScribe — a privacy-first, local alternative to Google transcription

I've built the habit of recording important meetings for future reference. My current
pipeline: [Google Pixel's automatic transcription](https://support.google.com/pixelphone/answer/9141551)
in the Recorder app (from English, French, Dutch, and Turkish input) → [NotebookLM](https://notebooklm.google.com/)
→ to-do's, slides, and meeting notes. It works perfectly across languages and
integrates seamlessly across Google services.

I have two problems with it. First, I don't like being dependent on a single company
for such a crucial workflow. Second, there is no need to broadcast sensitive meeting
contents to Google — in a contractual setting, this type of data leak is neither
acceptable nor GDPR-compliant.

Looking for an open-source local alternative, I stumbled upon [noScribe](https://noscribe.de/),
a fantastic tool developed by a Swiss sociologist/computer scientist for transcribing
interviews. It accepts multi-language input with customization options, runs entirely
locally (using [OpenAI Whisper](https://github.com/openai/whisper) and
[Pyannote](https://github.com/pyannote/pyannote-audio)), and from what I've seen so
far, works on par with Google's online service in terms of transcription and
translation quality. The interface is clunky and the software sometimes crashes during
transcription, but the switch is easy and a no-brainer for privacy. Kudos to the
developers.

What I will cover in a future TIL: [Open Notebook](https://www.open-notebook.ai/), the
open-source and local replacement for NotebookLM.
