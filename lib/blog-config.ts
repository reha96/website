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
    tags: ["Machine Learning", "Math", "Python", "NumPy", "SQL", "Data Engineering"],
    topic: "Machine Learning",
  },
  "math": {
    repo: "dlh-machine_learning",
    path: "math",
    tags: ["Math", "Linear Algebra", "NumPy", "Python", "Matrices", "Foundations"],
    topic: "Math",
  },
  "math-linear-algebra": {
    repo: "dlh-machine_learning",
    path: "math/linear_algebra",
    tags: ["Linear Algebra", "Matrices", "NumPy", "Python", "Vectors", "Operations"],
    topic: "Math",
  },
  "math-advanced-linear-algebra": {
    repo: "dlh-machine_learning",
    path: "math/advanced_linear_algebra",
    tags: ["Advanced Linear Algebra", "Eigenvalues", "Determinants", "Matrices", "NumPy", "Python"],
    topic: "Math",
  },
  "pipeline": {
    repo: "dlh-machine_learning",
    path: "pipeline",
    tags: ["Data Engineering", "SQL", "Databases", "Pipeline", "CRUD", "MySQL"],
    topic: "Data Engineering",
  },
  "pipeline-databases": {
    repo: "dlh-machine_learning",
    path: "pipeline/databases",
    tags: ["SQL", "MongoDB", "Databases", "CRUD", "MySQL", "PyMongo"],
    topic: "Data Engineering",
  },

  // ── dlh-higher_level_programming ──────────────────────────

  "python-hello-world": {
    repo: "dlh-higher_level_programming",
    path: "python-hello_world",
    tags: ["Python", "Basics", "Strings", "Programming", "Formatting", "Introduction"],
    topic: "Python",
  },
  "python-data-structures": {
    repo: "dlh-higher_level_programming",
    path: "python-data_structures",
    tags: ["Python", "Data Structures", "Lists", "Tuples", "Programming", "Algorithms"],
    topic: "Python",
  },
  "python-if-else-loops-functions": {
    repo: "dlh-higher_level_programming",
    path: "python-if_else_loops_functions",
    tags: ["Python", "Control Flow", "Loops", "Functions", "Conditionals", "Programming"],
    topic: "Python",
  },
  "python-import-modules": {
    repo: "dlh-higher_level_programming",
    path: "python-import_modules",
    tags: ["Python", "Modules", "Imports", "Programming", "Code Organization", "sys"],
    topic: "Python",
  },
  "python-classes": {
    repo: "dlh-higher_level_programming",
    path: "python-classes",
    tags: ["Python", "OOP", "Classes", "Objects", "Programming", "Encapsulation"],
    topic: "Python",
  },
  "python-more-classes": {
    repo: "dlh-higher_level_programming",
    path: "python-more_classes",
    tags: ["Python", "OOP", "Classes", "Inheritance", "Dunder Methods", "Programming"],
    topic: "Python",
  },
  "python-exceptions": {
    repo: "dlh-higher_level_programming",
    path: "python-exceptions",
    tags: ["Python", "Exception Handling", "Error Management", "try/except", "finally", "Programming"],
    topic: "Python",
  },
  "python-input-output": {
    repo: "dlh-higher_level_programming",
    path: "python-input_output",
    tags: ["Python", "I/O", "JSON", "File Handling", "Serialization", "Programming"],
    topic: "Python",
  },
  "python-more-data-structures": {
    repo: "dlh-higher_level_programming",
    path: "python-more_data_structures",
    tags: ["Python", "Sets", "Dictionaries", "Data Structures", "Functional Programming", "lambda"],
    topic: "Python",
  },
  "python-serialization": {
    repo: "dlh-higher_level_programming",
    path: "python-serialization",
    tags: ["Python", "Serialization", "JSON", "Pickle", "XML", "CSV"],
    topic: "Python",
  },

  // ── DLH-AI-Academy ────────────────────────────────────────

  "beatrec-music-recommender": {
    repo: "DLH-AI-Academy",
    path: "Course 3 - BY/app_v2",
    tags: ["AI", "Music", "Recommendation", "Machine Learning", "Embeddings", "Flask"],
    topic: "AI & ML",
  },
};
