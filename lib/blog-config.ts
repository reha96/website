export interface BlogPostMeta {
  repo: string;
  path: string; // empty string = root README
  tags: string[];
  topic: string;
}

/**
 * Static config mapping each README path to its metadata.
 * - repo: GitHub repository name (e.g., "dlh-machine_learning")
 * - path: directory path within repo ("" = root README)
 * - tags: 5-6 descriptive keywords
 * - topic: broader category for grouping
 *
 * To remove a post, comment out its entry. To add one, add a new entry.
 */
export const BLOG_POSTS_CONFIG: Record<string, BlogPostMeta> = {
  // ── dlh-machine_learning ──────────────────────────────────

  "dlh-machine-learning": {
    repo: "dlh-machine_learning",
    path: "",
    tags: ["machine-learning", "math", "python", "numpy", "sql", "data-engineering"],
    topic: "Machine Learning",
  },
  "math": {
    repo: "dlh-machine_learning",
    path: "math",
    tags: ["math", "linear-algebra", "numpy", "python", "matrices", "foundations"],
    topic: "Math",
  },
  "math-linear-algebra": {
    repo: "dlh-machine_learning",
    path: "math/linear_algebra",
    tags: ["linear-algebra", "matrices", "numpy", "python", "vectors", "operations"],
    topic: "Math",
  },
  "math-advanced-linear-algebra": {
    repo: "dlh-machine_learning",
    path: "math/advanced_linear_algebra",
    tags: ["advanced-linear-algebra", "eigenvalues", "determinants", "matrices", "numpy", "python"],
    topic: "Math",
  },
  "math-probability": {
    repo: "dlh-machine_learning",
    path: "math/probability",
    tags: ["probability", "statistics", "distributions", "binomial", "normal", "python"],
    topic: "Math",
  },
  "math-bayesian-prob": {
    repo: "dlh-machine_learning",
    path: "math/bayesian_prob",
    tags: ["bayesian", "probability", "statistics", "posterior", "likelihood", "numpy"],
    topic: "Math",
  },
  "math-calculus": {
    repo: "dlh-machine_learning",
    path: "math/calculus",
    tags: ["calculus", "derivatives", "integrals", "math", "python", "polynomials"],
    topic: "Math",
  },
  "math-plotting": {
    repo: "dlh-machine_learning",
    path: "math/plotting",
    tags: ["plotting", "matplotlib", "visualization", "python", "pca", "charts"],
    topic: "Math",
  },
  "math-multivariate-prob": {
    repo: "dlh-machine_learning",
    path: "math/multivariate_prob",
    tags: ["multivariate-statistics", "probability", "normal-distribution", "covariance", "numpy", "math"],
    topic: "Math",
  },
  "pipeline": {
    repo: "dlh-machine_learning",
    path: "pipeline",
    tags: ["data-engineering", "sql", "databases", "pipeline", "crud", "mysql"],
    topic: "Data Engineering",
  },
  "pipeline-databases": {
    repo: "dlh-machine_learning",
    path: "pipeline/databases",
    tags: ["sql", "mongodb", "databases", "crud", "mysql", "pymongo"],
    topic: "Data Engineering",
  },
  "pipeline-pandas": {
    repo: "dlh-machine_learning",
    path: "pipeline/pandas",
    tags: ["pandas", "dataframes", "data-manipulation", "python", "numpy", "data-engineering"],
    topic: "Data Engineering",
  },

  // ── dlh-higher_level_programming ──────────────────────────

  "dlh-higher-level-programming": {
    repo: "dlh-higher_level_programming",
    path: "",
    tags: ["python", "programming", "oop", "data-structures", "algorithms", "curriculum"],
    topic: "Python",
  },
  "python-hello-world": {
    repo: "dlh-higher_level_programming",
    path: "python-hello_world",
    tags: ["python", "basics", "strings", "programming", "formatting", "introduction"],
    topic: "Python",
  },
  "python-data-structures": {
    repo: "dlh-higher_level_programming",
    path: "python-data_structures",
    tags: ["python", "data-structures", "lists", "tuples", "programming", "algorithms"],
    topic: "Python",
  },
  "python-if-else-loops-functions": {
    repo: "dlh-higher_level_programming",
    path: "python-if_else_loops_functions",
    tags: ["python", "control-flow", "loops", "functions", "conditionals", "programming"],
    topic: "Python",
  },
  "python-import-modules": {
    repo: "dlh-higher_level_programming",
    path: "python-import_modules",
    tags: ["python", "modules", "imports", "programming", "code-organization", "sys"],
    topic: "Python",
  },
  "python-classes": {
    repo: "dlh-higher_level_programming",
    path: "python-classes",
    tags: ["python", "oop", "classes", "objects", "programming", "encapsulation"],
    topic: "Python",
  },
  "python-more-classes": {
    repo: "dlh-higher_level_programming",
    path: "python-more_classes",
    tags: ["python", "oop", "classes", "inheritance", "dunder-methods", "programming"],
    topic: "Python",
  },
  "python-exceptions": {
    repo: "dlh-higher_level_programming",
    path: "python-exceptions",
    tags: ["python", "exception-handling", "error-management", "try-except", "finally", "programming"],
    topic: "Python",
  },
  "python-input-output": {
    repo: "dlh-higher_level_programming",
    path: "python-input_output",
    tags: ["python", "io", "json", "file-handling", "serialization", "programming"],
    topic: "Python",
  },
  "python-more-data-structures": {
    repo: "dlh-higher_level_programming",
    path: "python-more_data_structures",
    tags: ["python", "sets", "dictionaries", "data-structures", "functional-programming", "lambda"],
    topic: "Python",
  },
  "python-serialization": {
    repo: "dlh-higher_level_programming",
    path: "python-serialization",
    tags: ["python", "serialization", "json", "pickle", "xml", "csv"],
    topic: "Python",
  },

  // ── dlh-shell ─────────────────────────────────────────────

  "dlh-shell": {
    repo: "dlh-shell",
    path: "",
    tags: ["shell", "linux", "permissions", "bash", "command-line", "system"],
    topic: "Shell",
  },
  "dlh-shell-permissions": {
    repo: "dlh-shell",
    path: "permissions",
    tags: ["shell", "linux", "permissions", "chmod", "chown", "bash"],
    topic: "Shell",
  },

  // ── DLH-AI-Academy ────────────────────────────────────────

  "beatrec-music-recommender": {
    repo: "DLH-AI-Academy",
    path: "Course 3 - BY/app_v2",
    tags: ["ai", "music", "recommendation", "machine-learning", "embeddings", "flask"],
    topic: "AI & ML",
  },

  // ── dlh-modern_ai ──────────────────────────────────────────

  "data-preparation-visualization": {
    repo: "dlh-modern_ai",
    path: "data_analysis/data_preparation_visualization",
    tags: ["data-preparation", "visualization", "pandas", "matplotlib", "seaborn", "feature-engineering"],
    topic: "Data Analysis",
  },
  "tree-based-models": {
    repo: "dlh-modern_ai",
    path: "machine_learning/tree_models",
    tags: ["decision-trees", "random-forest", "xgboost", "lightgbm", "scikit-learn", "machine-learning"],
    topic: "Machine Learning",
  },
};
