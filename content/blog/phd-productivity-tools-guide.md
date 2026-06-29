---
title: "PhD Productivity Tools Guide"
date: "2025-09-30"
slug: "phd-productivity-tools-guide"
tags: ["phd", "research", "latex", "zotero", "github", "overleaf", "ai", "productivity"]
topic: "Academic Tools"
author: "Reha Tuncer"
---

# PhD Productivity Tools Guide

A comprehensive guide for PhD students to set up an efficient research workflow using modern tools for reference management, version control, writing, and AI-assisted research.

## Table of Contents

0. [Installing Zotero Add-on Market](#0-installing-zotero-add-on-market-do-this-first)
1. [Zotero + Cloud Storage (OneDrive/Dropbox/Google Drive)](#1-zotero--cloud-storage-onedrivedropboxgoogle-drive)
2. [VS Code + LaTeX Workshop (Offline LaTeX Editing)](#2-vs-code--latex-workshop-offline-latex-editing)
3. [GitHub Desktop (Version Control for LaTeX Projects)](#3-github-desktop-version-control-for-latex-projects)
4. [Overleaf + GitHub (Cloud Collaboration & Backup)](#4-overleaf--github-cloud-collaboration--backup)
5. [Overleaf + Zotero Integration](#5-overleaf--zotero-integration-auto-sync-bibliography)
6. [AI Tools + Zotero (Smart Literature Review)](#6-ai-tools--zotero-smart-literature-review-with-claudechatgpt)
7. LaTeX Templates *(Coming Soon)*
8. University Grammarly Premium *(Coming Soon)*
9. edX Resources *(Coming Soon)*

---

## 0. Installing Zotero Add-on Market (Do This First!)

**Why:** The Add-on Market plugin creates an in-app plugin store within Zotero, making it much easier to browse, install, update, and manage all other Zotero plugins (including ZotMoov) without manually downloading files from GitHub.

### Setup Steps

1. **Download the Add-on Market plugin:**
   - Visit the GitHub releases page: [github.com/syt2/zotero-addons/releases](https://github.com/syt2/zotero-addons/releases)
   - Download the latest file (e.g., `zotero-addons-X.X.X.xpi`)

2. **Install in Zotero:**
   - Open Zotero 7+
   - Go to Tools → Add-ons (or Tools → Plugins depending on your version)
   - Click the gear icon in the top-right corner
   - Select "Install Add-on From File..."
   - Navigate to your Downloads folder and select the file you just downloaded
   - Click Open

3. **Restart Zotero** to activate the plugin

4. **Access the Add-on Market:**
   - After restart, you'll see a new plugin icon in the Zotero toolbar, OR
   - Go to Tools → Add-on Market

5. **Browse and install other plugins:**
   - The Add-on Market window will show a list of available Zotero 7 plugins
   - You can search, sort, and filter plugins
   - Click Install directly from the market for any plugin you need (like ZotMoov)
   - Switch between data sources using the dropdown menu (default is "zotero-chinese")

### Resources

- Official GitHub repository: [github.com/syt2/zotero-addons](https://github.com/syt2/zotero-addons)
- Add-on Market browses plugins from the `zotero-chinese/zotero-plugins` repository

> **Note:** Once you have the Add-on Market installed, you can skip manual downloads for future plugins and install everything directly through the market interface!

---

## 1. Zotero + Cloud Storage (OneDrive/Dropbox/Google Drive)

**Why:** Sync your Zotero metadata for free while storing large PDF files in your existing cloud storage (OneDrive, Dropbox, or Google Drive), avoiding Zotero's storage fees.

**How it works:** Zotero syncs your citation metadata (tiny files) to Zotero servers for free, while PDFs are stored as linked files in your cloud storage folder. For Zotero 7+, use the **ZotMoov** plugin (replacement for ZotFile).

### Setup Steps

1. Install Zotero 7+ and create a free Zotero account at [zotero.org](https://www.zotero.org/)

2. Install ZotMoov plugin from the Add-on Market (see Section 0) or download from GitHub releases

3. **Configure Zotero Settings:**
   - Go to Settings → Sync tab
   - Enable "Sync automatically"
   - Keep "Sync full-text content" enabled (doesn't count toward storage quota)
   - Under "File Syncing" section: **Uncheck all file syncing options** (this prevents PDFs from uploading to Zotero storage)

4. **Configure ZotMoov:**
   - Go to Settings → ZotMoov
   - Set "Directory to Move Files To" to your cloud folder (e.g., `OneDrive\Zotero` or `Google Drive\My Drive\Zotero`)
   - Set "Source Folder for Attaching New Files" (e.g., your Downloads folder)
   - Enable "Automatically Move/Copy Files When Added"

5. **Set Base Directory (Advanced):**
   - Go to Settings → Advanced → Files and Folders
   - Set "Linked Attachment Base Directory" to your cloud storage Zotero folder

### Resources

- ResearchGate: [The Best Reference Manager Setup (Zotero 7 + ZotMoov + Cloud Storage)](https://www.researchgate.net/publication/325828616)
- Blog: [Setting up Zotero with OneDrive/Dropbox/Google Drive](https://peterfalkingham.com/2025/04/15/setting-up-zotero-with-onedrive-dropbox-google-drive-etc/) by Prof. Peter Falkingham
- Boston College Library: [ZotMoov setup guide](https://libguides.bc.edu/tml_zotero/cloud_storage)

> **Note:** If you have an existing large library, you can batch-move PDFs to cloud storage by selecting items → right-click → ZotMoov → Rename & Move.

---

## 2. VS Code + LaTeX Workshop (Offline LaTeX Editing)

**Why:** Work on LaTeX documents offline with a setup that mimics Overleaf's interface. VS Code provides a split-screen view: your code on one side, live PDF preview on the other—completely free and without internet dependency.

### What You Need

1. **VS Code** — Text editor/IDE
2. **LaTeX Workshop Extension** — Compiles and previews `.tex` files inside VS Code
3. **MiKTeX** (or TeX Live) — Local TeX distribution to compile documents
4. **LTeX Extension** — Offline grammar and spell checker
5. **Perl** (for MiKTeX users) — Required for `latexmk` to work properly

### Setup Steps

#### A. Install MiKTeX (Local TeX Distribution)

1. Download MiKTeX from: [miktex.org/download](https://miktex.org/download)
2. During installation:
   - Choose "Install missing packages on-the-fly: Yes"
   - Note: MiKTeX doesn't include Perl by default, which is required for `latexmk`
3. Install Perl:
   - Download Strawberry Perl from: [strawberryperl.com](https://strawberryperl.com/)
   - Install either the full or portable version and add to PATH if needed
4. Install `latexmk` (if not already included):
   - Open MiKTeX Console
   - Go to Packages tab
   - Search for "latexmk" and install it

#### B. Install VS Code and Extensions

1. Download and install VS Code from: [code.visualstudio.com](https://code.visualstudio.com/)
2. **Install LaTeX Workshop:**
   - Open VS Code
   - Go to Extensions (`Ctrl+Shift+X` or `Cmd+Shift+X` on Mac)
   - Search for "LaTeX Workshop" by James Yu
   - Click Install
   - By default, documents auto-compile on save, creating an automated workflow
3. **Install LTeX:**
   - In Extensions marketplace, search "LTeX - LanguageTool" or "LTeX+"
   - Install the maintained version by "LTeX+" (not the archived one by Julian Valentin)
   - LTeX provides offline grammar and spell checking—it detects not just spelling errors but grammar and style issues
   - Comes with everything included, no need to install Java or LanguageTool separately

#### C. Using the Setup

1. Download your Overleaf project (as `.zip`) and extract it to a local folder
2. Open the folder in VS Code: File → Open Folder
3. Open your main `.tex` file
4. View the preview:
   - Save your file (`Ctrl+S` / `Cmd+S`) — this triggers auto-compilation
   - Click the preview icon in the top-right corner (looks like a split screen)
   - Choose to preview in a VS Code tab or external application
5. Arrange your workspace:
   - Split the editor to have code on one side, PDF preview on the other
   - Now you have an Overleaf-like interface, completely offline!

### Resources

- [LaTeX Workshop Installation Guide](https://github.com/James-Yu/LaTex-Workshop/wiki/Install)
- [MiKTeX with LaTeX Workshop on Windows](https://nicoguaro.github.io/posts/latex_vscode_wind/)
- [Complete beginner's guide to LaTeX in VS Code on Windows](https://blog.jakelee.co.uk/getting-latex-working-in-vscode-on-windows/)
- [LTeX official documentation](https://valentjn.github.io/ltex/)

---

## 3. GitHub Desktop (Version Control for LaTeX Projects)

**Why:** Track every change you make to your LaTeX documents, maintain a complete history of your work, collaborate seamlessly, and sync between multiple devices. Think of it as unlimited "undo" with timestamps and descriptions.

**How It Works:**

- GitHub Desktop monitors a folder on your computer
- Every time you make changes (edit text, add figures, etc.), it detects them
- You "commit" these changes with a description (like a save point in a video game)
- You "push" commits to GitHub's cloud, creating a backup and enabling collaboration
- Version control takes snapshots of your changes regularly, allowing you to revert to any previous state

### Setup Steps

#### A. Install and Configure

1. Download GitHub Desktop from: [desktop.github.com](https://desktop.github.com/)
2. Install and sign in with your GitHub account (create one at [github.com](https://github.com/) if needed)
3. Create a project structure — each folder = one paper/project

#### B. Set Up a Repository

**Method 1: New Project**
- In GitHub Desktop: File → New Repository
- Name: `Project_Name_X`
- Local Path: Choose your GitHub folder
- Choose "Private" repository (for confidential work) or "Public" (for collaboration)
- Click "Create Repository"

**Method 2: Existing Project** (e.g., Downloaded Overleaf Project)
- Place your project folder inside the GitHub directory
- In GitHub Desktop: File → Add Local Repository
- Select your project folder
- If not yet a repository, click "Create Repository"

#### C. Daily Workflow: Commit-Push Cycle

1. **Work on your project in VS Code** — Edit `.tex` files, compile, add figures, etc.
2. **GitHub Desktop detects changes automatically** — Changes are color-coded: green (+) for additions, red (-) for deletions, yellow for modifications
3. **Review your changes** in the Changes tab
4. **Commit your changes:**
   - Write a commit message (required): Short summary of what you did
   - Good: "Added methodology section" or "Fixed figure 3 caption"
   - Bad: "changes" or "update"
   - Add description (optional but recommended for major changes)
   - Think: what would you say to explain these changes to a colleague?
   - Click "Commit to main"
5. **Push to GitHub:**
   - Click "Push origin" button (top right)
   - Your changes are now backed up online!

**Example Daily Workflow:**
- Morning: Download Overleaf project, make initial commit ("Initial project upload")
- After editing: Compile in VS Code, rewrite paragraph → Commit: "Rewrote introduction paragraph 2"
- Before lunch: Push changes to GitHub
- Afternoon: Add new figure → Commit: "Added Figure 4 - methodology flowchart"
- End of day: Push changes

**Collaboration Features:**
- Private repos: For confidential research
- Public repos: For open collaboration—others can suggest changes
- Branches: Work on different versions simultaneously (advanced feature)
- GitHub allows syncing with Overleaf V2 via GitHub integration

### Resources

- [Introduction to Version Control Using GitHub Desktop](https://programminghistorian.org/en/lessons/retired/getting-started-with-github-desktop)
- [Official GitHub Docs: Committing and reviewing changes](https://docs.github.com/en/desktop/making-changes-in-a-branch/committing-and-reviewing-changes-to-your-project-in-github-desktop)
- [Version Control with Git: Tracking Changes tutorial](https://caltechlibrary.github.io/git-desktop/04-changes/)

**Pro Tips:**
- Make commits frequently—don't wait until end of day
- Write commit messages that will make sense to you in the future and to collaborators
- Use descriptive names for commits (helps when you need to find when you changed something)
- Push regularly to ensure cloud backup

---

## 4. Overleaf + GitHub (Cloud Collaboration & Backup)

**Why:** Combine Overleaf's real-time collaborative editing with GitHub's version control and backup. Perfect for working with collaborators who prefer different workflows—some can work in Overleaf's browser interface while others use local editors, all while maintaining a complete project history.

**Prerequisites:**
- GitHub Synchronization is a premium Overleaf feature (available with Overleaf subscription, institutional access, or Overleaf Commons)
- A GitHub account (free at [github.com](https://github.com/))

### A. Setting Up GitHub Sync

1. **Link Your GitHub Account to Overleaf:**
   - Log into Overleaf
   - Go to Account (top-right) → Account Settings
   - Scroll down to "Project Synchronization" section
   - Click "Link" under "GitHub Sync"
   - Follow the prompts to authorize Overleaf to access your GitHub account
   - Once linked, you'll see "Account is linked" with an option to unlink

2. **Create a New Project from GitHub (Method 1):**
   - If you have an existing GitHub repository with LaTeX files
   - In Overleaf: Click "New Project" → "Import from GitHub"
   - Select the repository you want to import
   - Overleaf creates a new project linked to that repository

3. **Create a GitHub Repository from Overleaf (Method 2):**
   - If you have an existing Overleaf project
   - Open your Overleaf project
   - Click the Menu button (top-left)
   - Under "Sync," click "GitHub"
   - Click "Create a new repository"
   - Name your repository and set it to Private or Public
   - Overleaf will create the repository and link it

**Important Limitations:**
- It is not possible to synchronize an existing Overleaf project with an existing GitHub repository
- GitHub Synchronization only works with github.com, not with GitHub Enterprise installations

### B. Using the Sync Feature

**Daily Workflow:**
1. Make changes in Overleaf as usual (edit, compile, add figures)
2. Sync with GitHub:
   - Click the Menu button (top-left)
   - Under "Sync," click "GitHub"
   - You'll see options to:
     - **Pull from GitHub** — Get latest changes from GitHub
     - **Push to GitHub** — Send your Overleaf changes to GitHub
3. Write a commit message describing your changes
4. Click "Push" or "Pull" as needed

**Collaboration Workflow:**
- Multiple contributors can work on the project simultaneously in Overleaf
- Local developers can clone the GitHub repository and work offline
- Regular syncing keeps everyone's work aligned
- All commits show as coming from the linked Overleaf user in GitHub history

**Pro Tips:**
- Pull before you start working to get latest changes
- Push regularly to back up your work
- Be careful when editing both locally and in Overleaf simultaneously—this may cause merge conflicts
- Use descriptive commit messages

### Resources

- [Official Overleaf GitHub Synchronization Documentation](https://www.overleaf.com/learn/how-to/GitHub_Synchronization)
- [Creating connections using Git Integration and GitHub Synchronization](https://www.overleaf.com/blog/creating-connections-using-overleafs-git-integration-and-github)
- [Tutorial: How to synchronize Overleaf with GitHub repository](https://norlab.ulaval.ca/research/latex-github-overleaf/)

---

## 5. Overleaf + Zotero Integration (Auto-Sync Bibliography)

**Why:** Automatically keep your bibliography up-to-date by linking your Zotero library directly to Overleaf. No more manual exports—add references in Zotero, refresh in Overleaf, and you're done!

**Prerequisites:**
- Zotero integration is a premium Overleaf feature
- A Zotero account with your reference library

### Setup Steps

1. **Link Zotero to Your Overleaf Account:**
   - In Overleaf: Go to Account → Account Settings
   - Scroll to "Reference Managers" section
   - Click "Link" under "Zotero Integration"
   - You'll be prompted to log into Zotero if not already logged in
   - Click "Accept Defaults" to authorize the connection
   - You'll see "Account is linked" confirmation

2. **Import References into Your Project:**

   **Method 1: Auto-Synced `.bib` File (Recommended)**
   - Open your Overleaf project
   - Click "New File" (top-left)
   - Select "From Zotero"
   - Name your file (e.g., `references.bib`)
   - Choose format: BibLaTeX (recommended) or BibTeX
   - Select which Zotero library to import: "My Library" or a specific Group Library
   - Click "Create"
   - This creates a read-only `.bib` file that syncs with Zotero

   **Method 2: Manual Upload**
   - Export from Zotero: File → Export Library → BibTeX/BibLaTeX
   - In Overleaf: Click upload icon → Upload from computer
   - Select your `.bib` file

3. **Add Bibliography Package to Your Document:**

```latex
% In your preamble:
\usepackage{biblatex}
\addbibresource{references.bib}  % Your .bib filename

% At the end of document:
\printbibliography
```

4. **Cite References:**

```latex
\cite{citation-key}        % Basic citation
\parencite{citation-key}   % Parenthetical (author-year styles)
```

When you start typing `\cite{`, Overleaf suggests available citation keys.

5. **Updating Your Bibliography:**
   - Add new references to your Zotero library
   - In Overleaf: Click on the `.bib` file and click the "Refresh" button at the bottom
   - Your bibliography is now updated!

**Important Notes:**
- Overleaf imports entire libraries as a flat list—you cannot select specific folders within a Zotero library
- To import only specific collections, you must create separate Zotero Group Libraries for different projects
- The `.bib` file created via integration is read-only—edit references in Zotero, not Overleaf

**Alternative for Non-Premium Users:**
- Export `.bib` data from Zotero and manually upload to Overleaf
- Use Better BibTeX plugin to auto-export to Dropbox, then link Dropbox file to Overleaf

### Resources

- [Official Guide: How to link Zotero to your Overleaf account](https://www.overleaf.com/learn/how-to/How_to_link_Zotero_to_your_Overleaf_account)
- [Tutorial: Using Zotero for reference management in Overleaf (KTH)](https://www.kth.se/en/biblioteket/skriva-referera/anvanda-zotero-for-referenshantering-i-overleaf-1.1329077)
- [Overview of Overleaf Integrations including Zotero (Rice University)](https://libguides.rice.edu/overleaf/integrations)

---

## 6. AI Tools + Zotero (Smart Literature Review with Claude/ChatGPT)

**Why:** Transform your literature review workflow by connecting your Zotero library directly to AI assistants like Claude or ChatGPT. Ask questions about papers in your library, get summaries, analyze citations, and even extract annotations—all without manually searching through PDFs or inventing references.

**What You Get:**
- AI searches your Zotero library first before web search
- Automatic citation formatting (BibTeX, APA, etc.)
- Paper abstracts and full metadata
- Annotation extraction from PDFs
- Semantic search based on concepts, not just keywords

**Prerequisites:**
- Zotero 7+ for local API and full-text access
- Claude Desktop app (Claude Pro recommended) OR ChatGPT with developer mode
- Node.js installed on your system
- Python 3.10+ (for Zotero MCP)

### Setup Steps

#### A. Install Claude Desktop & Subscribe

1. Download Claude Desktop from: [claude.ai/download](https://claude.ai/download)
2. Install and create an account
3. Subscribe to Claude Pro (Optional but recommended, ~$20/month)
   - Provides higher usage limits and priority access
   - Free tier works but has limitations

#### B. Install Node.js (Required for MCPs)

1. Download Node.js from: [nodejs.org](https://nodejs.org/)
2. Download the LTS (Long Term Support) version
3. Install and verify: Open terminal/command prompt and type `node --version`

#### C. Enable MCP in Claude Desktop

1. **Access Developer Settings:**
   - Open Claude Desktop → Settings (gear icon)
   - Navigate to the Developer tab
   - Note: MCP in Claude Desktop is currently a beta feature

2. **Locate Configuration File:**
   - macOS: `~/Library/Application Support/Claude/claude_desktop_config.json`
   - Windows: `%APPDATA%\Claude\claude_desktop_config.json`
   - You can access this by clicking "Edit Config" in Developer settings

#### D. Install Zotero MCP Server

Zotero MCP connects your Zotero research library with Claude and other AI assistants via the Model Context Protocol.

**Method 1: Using pip (Recommended):**

```bash
# Install Zotero MCP
pip install zotero-mcp

# Auto-configure for Claude Desktop
zotero-mcp setup
```

**Method 2: Using uv:**

```bash
uv pip install "git+https://github.com/54yyyu/zotero-mcp.git"
zotero-mcp setup
```

**Method 3: Via Smithery (One-click):**

```bash
npx @smithery/cli install @smithery/zotero-mcp
```

#### E. Configure Zotero MCP

1. **Enable Zotero Local API:**
   - Open Zotero 7
   - Go to Edit → Preferences → Advanced → API
   - Check "Enable local API"

2. **Manual Configuration** (if auto-setup didn't work): Edit your `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "zotero": {
      "command": "zotero-mcp",
      "env": {
        "ZOTERO_LOCAL": "true"
      }
    }
  }
}
```

3. **Build the Search Database:**

```bash
# Basic database (metadata only, faster)
zotero-mcp update-db

# Full-text database (recommended for better search)
zotero-mcp update-db --fulltext

# Check database status
zotero-mcp db-status
```

4. Restart Claude Desktop to load the MCP server

#### F. Verify Installation

1. **Check for MCP Icons:**
   - Open Claude Desktop and look for a hammer icon (🔨) in the bottom right of the input box
   - Click it to see available tools—you should see Zotero search, metadata, and annotation tools

2. **Test the Connection:**
   - Type: "Search my Zotero library for papers about [your research topic]"
   - Claude should use the Zotero tool to search your library
   - A popup will appear asking for permission to use the tool—click "Allow"

#### G. Set Up Custom Instructions (Project-Wide)

In Claude Desktop:

1. **Create a Project:**
   - Click "Projects" in the sidebar
   - Click "Create Project"
   - Name it (e.g., "Literature Review")

2. **Add Custom Instructions:** Click "Project Knowledge" or "Custom Instructions" and add:

> "Always check my Zotero library first when searching for references. Use the Zotero search tool before web search. For any references found, provide BibTeX citation format, abstract, and key findings. If not found in Zotero, note that and search the web. Never invent or hallucinate references."

What this does:
- Prioritizes your Zotero library for reference searches
- Falls back to web search only if not found locally
- Prevents hallucinated references
- Ensures proper BibTeX formatting
- Includes abstracts for quick review

### Features & Capabilities

**Search & Discovery:**
- Vector-based semantic search across your entire library
- Find papers by title, author, content, or concepts
- Browse collections, tags, and recent additions
- Similarity scores and contextual matching

**Content Access:**
- Retrieve detailed metadata for any item
- Access full-text content when available
- Extract PDF annotations directly
- Access attachments, notes, and child items

**Annotations:**
- Access Zotero's native annotations
- Extract directly from PDFs (even if not yet indexed)
- Image annotation support
- For optimal results, install Better BibTeX plugin

### Troubleshooting

**"Zotero tools not showing in Claude"**
- Ensure Zotero is running and local API is enabled in Preferences → Advanced → API
- Restart Claude Desktop after configuration changes
- Check `zotero-mcp db-status` to verify database is built

**"Search returns no results"**
- Run `zotero-mcp update-db --fulltext` to rebuild database
- Verify Zotero is running and accessible

**"Database update takes too long"**
- Use parameter for testing: `zotero-mcp update-db --limit 100`
- Default update is fast (metadata-only); full-text indexing takes longer

**"Permission errors when using tools"**
- Always click "Allow" when Claude asks to use Zotero tools
- Check that your Zotero API permissions are correct

**Advanced:** Zotero MCP also works with ChatGPT in Developer Mode, Cherry Studio, Chorus, and Cursor. For ChatGPT setup, refer to the Zotero MCP documentation for specific configuration steps.

### Resources

- [Zotero MCP GitHub Repository](https://github.com/54yyyu/zotero-mcp)
- [Zotero MCP Documentation](https://stevenyuyy.us/zotero-mcp)
- [Official MCP Quickstart Guide](https://modelcontextprotocol.info/docs/quickstart/user/)
- [How to Use Model Context Protocol with Claude](https://www.codecademy.com/article/how-to-use-model-context-protocol-mcp-with-claude-step-by-step-guide-with-examples)

**Pro Tips:**
- Update your database regularly: `zotero-mcp update-db`
- Use semantic search for concept-based queries, not just keywords
- Keep Zotero running when using Claude for best performance
- Add papers to Zotero as you research—Claude will find them immediately after database update

---

## 7. LaTeX Templates

**Coming Soon** — Templates for slides and thesis are being prepared.

---


## 9. Online Resources

**Coming Soon** — EdX, DLH and so on.

---

## About This Guide

This guide was created to help PhD students set up an efficient, modern research workflow. It consolidates best practices for reference management, version control, collaborative writing, and AI-assisted research.

*Last Updated: September 30, 2025*

Contributions: Feel free to suggest improvements or additional tools that have enhanced your research workflow.

## Acknowledgments

Special thanks to the open-source communities behind Zotero, LaTeX Workshop, GitHub, and the Model Context Protocol for making these powerful tools freely available to researchers worldwide.
