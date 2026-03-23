import Link from "next/link";
import { Metadata } from "next";
import { ArrowLeft, Clock, ChevronRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Guitar Tuning Guides & Articles | GuitarTunePro",
  description:
    "Learn how to tune your guitar perfectly. Our comprehensive guides cover beginner tuning, standard tuning, alternate tunings, intonation, string selection, and keeping your guitar in tune — for every skill level.",
  alternates: { canonical: "/articles" },
  openGraph: {
    title: "Guitar Tuning Guides & Articles",
    description:
      "Comprehensive guitar tuning guides for beginners and advanced players.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=1200&q=80",
        alt: "Guitar headstock tuning guide",
      },
    ],
  },
};

const categories = [
  {
    label: "Getting Started",
    color: "cyan",
    articles: [
      {
        title: "How to Tune a Guitar for Beginners",
        slug: "how-to-tune-a-guitar-for-beginners",
        description:
          "Step-by-step guide to tuning for the first time — from string names to reading cents on a tuner.",
        readingTime: 8,
        image:
          "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=600&q=70",
      },
      {
        title: "Standard Tuning Explained",
        slug: "standard-tuning-explained",
        description:
          "The notes, intervals, and history behind E-A-D-G-B-E — the universal guitar tuning.",
        readingTime: 8,
        image:
          "https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=600&q=70",
      },
      {
        title: "How to Use a Chromatic Tuner",
        slug: "how-to-use-a-chromatic-tuner",
        description:
          "Master the needle, cents, and note display on any chromatic guitar tuner.",
        readingTime: 8,
        image:
          "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=70",
      },
      {
        title: "How to Tune a Guitar by Ear",
        slug: "how-to-tune-a-guitar-by-ear",
        description:
          "The 5th fret method, harmonics, and octave matching — develop your musical ear.",
        readingTime: 9,
        image:
          "https://images.unsplash.com/photo-1605020420620-20c943cc4669?w=600&q=70",
      },
    ],
  },
  {
    label: "Alternate Tunings",
    color: "violet",
    articles: [
      {
        title: "Alternate Guitar Tunings You Should Try",
        slug: "alternate-guitar-tunings",
        description:
          "Drop D, Open G, Open D, DADGAD, half-step down, and more — explained and explored.",
        readingTime: 11,
        image:
          "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=600&q=70",
      },
      {
        title: "Drop D Tuning Guide for Rock and Metal",
        slug: "drop-d-tuning-guide",
        description:
          "How to tune to Drop D, one-finger power chords, and famous songs in Drop D.",
        readingTime: 9,
        image:
          "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&q=70",
      },
      {
        title: "Acoustic vs Electric Guitar Tuning",
        slug: "acoustic-vs-electric-guitar-tuning",
        description:
          "How string gauges, bridges, and materials create different tuning challenges on each guitar type.",
        readingTime: 8,
        image:
          "https://images.unsplash.com/photo-1501612780327-45045538702b?w=600&q=70",
      },
      {
        title: "Does a Capo Affect Guitar Tuning?",
        slug: "does-a-capo-affect-guitar-tuning",
        description:
          "Why capos cause pitch changes and the right way to compensate for them.",
        readingTime: 7,
        image:
          "https://images.unsplash.com/photo-1557935728-e6d1eaabe558?w=600&q=70",
      },
    ],
  },
  {
    label: "Maintenance & Setup",
    color: "emerald",
    articles: [
      {
        title: "Why Your Guitar Goes Out of Tune",
        slug: "why-your-guitar-goes-out-of-tune",
        description:
          "9 causes of tuning instability — worn nuts, bad stringing, temperature changes — and how to fix each.",
        readingTime: 9,
        image:
          "https://images.unsplash.com/photo-1525201548942-d8732f6617a0?w=600&q=70",
      },
      {
        title: "Best Guitar Strings for Tuning Stability",
        slug: "best-guitar-strings-for-tuning-stability",
        description:
          "Coated vs uncoated, nickel vs steel, light vs heavy — a complete guide to string selection.",
        readingTime: 10,
        image:
          "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=600&q=70",
      },
      {
        title: "How Temperature and Humidity Affect Guitar Tuning",
        slug: "how-temperature-and-humidity-affect-guitar-tuning",
        description:
          "How wood movement, seasonal humidity, and extreme temperatures affect your guitar's pitch.",
        readingTime: 9,
        image:
          "https://images.unsplash.com/photo-1564186763535-ebb21ef5277f?w=900&q=80",
      },
      {
        title: "How to Intonate Your Guitar",
        slug: "how-to-intonate-your-guitar",
        description:
          "Step-by-step saddle adjustment guide to set perfect intonation across the fretboard.",
        readingTime: 10,
        image:
          "https://images.unsplash.com/photo-1516924962500-2b4b3b99ea02?w=600&q=70",
      },
    ],
  },
];

const colorMap: Record<string, { badge: string; accent: string; dot: string }> =
  {
    cyan: {
      badge: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
      accent: "group-hover:text-cyan-400",
      dot: "bg-cyan-500",
    },
    violet: {
      badge: "bg-violet-500/10 text-violet-400 border-violet-500/20",
      accent: "group-hover:text-violet-400",
      dot: "bg-violet-500",
    },
    emerald: {
      badge: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
      accent: "group-hover:text-emerald-400",
      dot: "bg-emerald-500",
    },
  };

export default function ArticlesIndex() {
  return (
    <div className="min-h-screen bg-[#050510] text-white flex flex-col items-center relative overflow-hidden">
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-blue-900/10 blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-cyan-900/10 blur-[120px]" />
      </div>

      <div className="z-10 w-full max-w-5xl px-5 pt-10 sm:pt-16 pb-20">
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center text-sm text-cyan-400 hover:text-cyan-300 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Tuner
          </Link>
        </div>

        {/* Hero */}
        <header className="mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-cyan-400 uppercase tracking-widest mb-4 border border-cyan-500/30 bg-cyan-500/5 px-3 py-1.5 rounded-full">
            Guitar Knowledge Base
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 leading-tight">
            Guitar Tuning <span className="text-cyan-500">Guides</span>
          </h1>
          <p className="text-zinc-400 text-lg max-w-2xl leading-relaxed">
            Comprehensive, expert-written guides on every aspect of guitar
            tuning — from your first string to advanced setup and intonation.
            All free, no signup required.
          </p>
        </header>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-4 mb-14">
          {[
            { label: "Free Guides", value: "12+" },
            { label: "Topics Covered", value: "3" },
            { label: "Avg. Read Time", value: "9 min" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-4 text-center"
            >
              <div className="text-2xl font-bold text-white">{stat.value}</div>
              <div className="text-xs text-zinc-500 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Categories */}
        {categories.map((category) => {
          const c = colorMap[category.color];
          return (
            <section key={category.label} className="mb-14">
              <div className="flex items-center gap-3 mb-6">
                <span className={`w-2 h-2 rounded-full ${c.dot}`} />
                <h2 className="text-xl font-bold text-white">
                  {category.label}
                </h2>
                <span
                  className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${c.badge}`}
                >
                  {category.articles.length} guides
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {category.articles.map((article) => (
                  <Link
                    href={`/articles/${article.slug}`}
                    key={article.slug}
                    className="group block rounded-2xl border border-zinc-800 bg-zinc-900/40 overflow-hidden hover:border-zinc-600 hover:bg-zinc-800/50 transition-all duration-300"
                  >
                    <div className="h-36 overflow-hidden">
                      <img
                        src={article.image}
                        alt={article.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                    </div>
                    <div className="p-5">
                      <h3
                        className={`font-semibold text-zinc-100 ${c.accent} transition-colors mb-2 leading-snug`}
                      >
                        {article.title}
                      </h3>
                      <p className="text-xs text-zinc-500 leading-relaxed mb-3">
                        {article.description}
                      </p>
                      <div className="flex items-center justify-between text-xs text-zinc-600">
                        <span className="flex items-center gap-1.5">
                          <Clock className="w-3 h-3" /> {article.readingTime}{" "}
                          min read
                        </span>
                        <span
                          className={`flex items-center gap-1 ${c.accent} transition-colors font-medium opacity-0 group-hover:opacity-100`}
                        >
                          Read guide <ChevronRight className="w-3 h-3" />
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          );
        })}

        {/* CTA */}
        <div className="rounded-2xl border border-cyan-500/30 bg-cyan-500/5 p-8 text-center">
          <h2 className="text-xl font-bold text-white mb-2">
            Ready to put it into practice?
          </h2>
          <p className="text-zinc-400 mb-5 text-sm">
            Use GuitarTunePro's free online chromatic tuner to apply everything
            you've learned.
          </p>
          <Link
            href="/"
            className="inline-block bg-cyan-500 hover:bg-cyan-400 text-zinc-950 font-bold px-8 py-3 rounded-full text-sm transition-colors"
          >
            Open Free Guitar Tuner →
          </Link>
        </div>
      </div>
    </div>
  );
}
