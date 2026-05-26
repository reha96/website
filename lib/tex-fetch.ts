/**
 * Fetches .tex files from GitHub repos and extracts abstract text.
 * Used to dynamically populate paper abstracts on the homepage at build time.
 */

const GITHUB_RAW = "https://raw.githubusercontent.com/reha96";

export interface PaperAbstract {
  id: string;
  text: string;
  title: string;
  authors: string;
  repo: string;
  texPath: string;
}

const PAPER_CONFIGS = [
  {
    id: "paper1",
    repo: "autoplay-clean",
    texPath: "writing/main.tex",
    title: "Does autoplay drive excessive screen time? Evidence from an online experiment",
    authors: "Tuncer R",
  },
  {
    id: "paper2",
    repo: "skills-clean",
    texPath: "writing/current/manuscript.tex",
    title: "Peer skill identification and social class: Evidence from a referral experiment",
    authors: "Díaz J, Munoz M, Reuben E, Tuncer R",
  },
  {
    id: "paper3",
    repo: "icfes-referrals-clean",
    texPath: "writing/manuscript.tex",
    title: "When proximity isn't enough: Network segregation and class bias in referrals",
    authors: "Munoz M, Reuben E, Tuncer R",
  },
];

/**
 * Fetch a raw .tex file from GitHub.
 */
async function fetchTexFile(repo: string, path: string): Promise<string | null> {
  const url = `${GITHUB_RAW}/${repo}/main/${path}`;
  try {
    const res = await fetch(url, { next: { revalidate: false } });
    if (!res.ok) return null;
    return await res.text();
  } catch {
    return null;
  }
}

/**
 * Extract the abstract text from a LaTeX file.
 * Looks for \section*{Abstract} or \begin{abstract}...\end{abstract}.
 * Returns the plain text between the abstract header and the next \section or \maketitle.
 */
function extractAbstract(tex: string): string {
  // Try \section*{Abstract} pattern first
  const sectionMatch = tex.match(/\\section\*\{Abstract\}\s*\n(.*?)(?=\\(?:section|medskip|bigskip|maketitle|newpage|textbf\{JEL))/s);
  if (sectionMatch && sectionMatch[1]) {
    return cleanTexText(sectionMatch[1]);
  }

  // Try \begin{abstract}...\end{abstract}
  const envMatch = tex.match(/\\begin\{abstract\}(.*?)\\end\{abstract\}/s);
  if (envMatch && envMatch[1]) {
    return cleanTexText(envMatch[1]);
  }

  return "";
}

/**
 * Strip LaTeX commands and formatting from abstract text.
 */
function cleanTexText(text: string): string {
  return text
    .replace(/\\textit\{([^}]+)\}/g, "$1")       // \textit{...} → ...
    .replace(/\\textbf\{([^}]+)\}/g, "$1")        // \textbf{...} → ...
    .replace(/\\emph\{([^}]+)\}/g, "$1")          // \emph{...} → ...
    .replace(/\\href\{[^}]+\}\{([^}]+)\}/g, "$1") // \href{url}{text} → text
    .replace(/\\url\{([^}]+)\}/g, "$1")           // \url{...} → ...
    .replace(/\\cite\{[^}]+\}/g, "")              // remove \cite{...}
    .replace(/\\citep\{[^}]+\}/g, "")             // remove \citep{...}
    .replace(/\\citet\{[^}]+\}/g, "")             // remove \citet{...}
    .replace(/\\footnote\{[^}]*\}/g, "")          // remove \footnote{...}
    .replace(/\\texttt\{([^}]+)\}/g, "$1")        // \texttt{...} → ...
    .replace(/%.*$/gm, "")                        // remove comments
    .replace(/\\`\{([^}]+)\}/g, "'$1'")           // LaTeX quotes
    .replace(/\\['']\{([^}]+)\}/g, "'$1'")
    .replace(/``/g, '"')
    .replace(/''/g, '"')
    .replace(/\\[a-zA-Z]+(\{[^}]*\})*/g, "")      // remove remaining LaTeX commands
    .replace(/\s+/g, " ")                         // collapse whitespace
    .replace(/~\\(?:cite|ref)\{[^}]+\}/g, "")     // remove ~\cite{...} etc.
    .trim();
}

/**
 * Fetch all paper abstracts at build time.
 */
export async function fetchAllAbstracts(): Promise<Record<string, PaperAbstract>> {
  const results = await Promise.all(
    PAPER_CONFIGS.map(async (config) => {
      const tex = await fetchTexFile(config.repo, config.texPath);
      const text = tex ? extractAbstract(tex) : "";

      return {
        ...config,
        text: text || "Abstract not available.",
      } as PaperAbstract;
    })
  );

  return Object.fromEntries(results.map((r) => [r.id, r]));
}
