import Image from "next/image";
import Link from "next/link";

const SKILLS = [
  "Behavioral Economics",
  "Web Development",
  "Reinforcement Learning",
  "NGO Work",
];

const RESEARCH_INTERESTS = [
  {
    title: "Screen Time & Design",
    description:
      "Studying how autoplay and infinite scroll affect user behavior and attention.",
  },
  {
    title: "E-commerce UX",
    description:
      "How scarcity cues and time pressure shape decision-making and trust.",
  },
  {
    title: "Social Networks",
    description:
      "Understanding class bias and segregation in referral systems.",
  },
] as const;

export default function LandingPage() {
  return (
    <main className="min-h-screen">
      <div className="max-w-4xl mx-auto px-6 py-12 md:py-20">
        {/* ── Hero Section ── */}
        <div className="flex flex-col md:flex-row items-start gap-8 md:gap-12 mb-20">
          {/* Photo */}
          <div className="w-full md:w-2/5 shrink-0">
            <Image
              src="/new_pp.png"
              alt="Reha Tuncer"
              width={400}
              height={400}
              className="w-full max-w-sm rounded-2xl shadow-lg"
              priority
            />
          </div>

          {/* Bio */}
          <div className="flex-1">
            <h1 className="font-serif text-3xl md:text-4xl font-semibold leading-tight text-gray-800 dark:text-[var(--color-text)] mb-4">
              I&apos;m an economist
              <br />
              who got hooked
              <br />
              on why we can&apos;t log off.
            </h1>
            <p className="text-gray-600 dark:text-[var(--color-text-secondary)] leading-relaxed mb-6">
              For my PhD, I taught myself web development to study user behavior
              through online experiments. Today, I&apos;m training reinforcement
              learning drones on weekends and quietly transforming NGO websites
              during the week.
            </p>
            <p className="text-gray-600 dark:text-[var(--color-text-secondary)] leading-relaxed">
              I am always chasing what makes humans click, and stay, while
              creating meaningful digital experiences.
            </p>
          </div>
        </div>

        {/* ── Skills ── */}
        <div className="flex flex-wrap gap-3 mb-16">
          {SKILLS.map((skill) => (
            <span
              key={skill}
              className="px-4 py-2 text-sm font-medium rounded-xl transition-colors duration-300"
              style={{
                backgroundColor: "var(--color-accent)",
                color: "#fff",
              }}
            >
              {skill}
            </span>
          ))}
        </div>

        {/* ── What I'm Curious About ── */}
        <section className="mb-16">
          <h2 className="font-serif text-2xl font-semibold text-gray-800 dark:text-[var(--color-text)] mb-6">
            What I&apos;m curious about
          </h2>
          <p className="text-gray-600 dark:text-[var(--color-text-secondary)] mb-8 max-w-2xl">
            My research sits at the intersection of behavioral economics and
            digital technology, exploring how design choices influence human
            behavior online.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {RESEARCH_INTERESTS.map((item) => (
              <div
                key={item.title}
                className="p-5 rounded-2xl border-l-4 shadow-sm transition-colors duration-300 hover:bg-gray-50 dark:hover:bg-charcoal-800"
                style={{
                  borderLeftColor: "var(--color-accent)",
                  backgroundColor: "var(--color-bg-secondary)",
                }}
              >
                <h3 className="font-serif text-lg font-medium text-gray-800 dark:text-[var(--color-text)] mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-[var(--color-text-secondary)] leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ── CTAs ── */}
        <div className="flex flex-wrap gap-4">
          <Link
            href="/academic"
            className="inline-flex items-center px-6 py-3 font-medium rounded-xl transition-colors duration-300"
            style={{
              backgroundColor: "var(--color-accent)",
              color: "#fff",
            }}
          >
            View Research
            <svg
              className="ml-2 h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </Link>
          <a
            href="https://hci.uni.lu/reha-tuncer/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-6 py-3 font-medium rounded-xl transition-colors duration-300"
            style={{
              backgroundColor: "var(--color-bg-secondary)",
              color: "var(--color-text)",
              border: "1px solid var(--color-border)",
            }}
          >
            <svg
              className="mr-2 h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
            Contact
          </a>
        </div>

        {/* ── University Affiliation ── */}
        <p className="mt-8 text-sm text-gray-500 dark:text-[var(--color-text-muted)]">
          PhD &middot; University of Luxembourg
        </p>
      </div>
    </main>
  );
}
