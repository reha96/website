---
title: "How to version Python packages with uv"
date: "2026-06-15"
tags: ["python", "uv", "packaging", "pip"]
---

# How to version Python packages with uv

`uv` makes Python package management incredibly fast. Here's a quick pattern for
managing dependencies:

```bash
# Initialize a new project
uv init my-project
cd my-project

# Add dependencies
uv add requests pandas

# Add dev dependencies
uv add --dev pytest ruff

# Run scripts
uv run python my_script.py

# Run tests
uv run pytest
```

The key insight: `uv` replaces `pip`, `venv`, `pip-tools`, and `pyenv` in a single
tool. No more juggling multiple package managers.
