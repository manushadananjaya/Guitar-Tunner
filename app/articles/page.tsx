import Link from "next/link";
import { Metadata } from "next";
import { ArrowLeft, Clock, ChevronRight } from "lucide-react";
import {
  ARTICLES,
  ARTICLE_CATEGORIES,
  articlesInCategory,
} from "@/lib/articles";

export const metadata: Metadata = {
  title: "Guitar Tuning Guides & Articles",
  description:
    "Guides to tuning your guitar properly — beginner basics, standard and alternate tunings, intonation, strings, and staying in tune.",
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

const colorMap: Record<string, { badge: string; accent: string; dot: string }> =
  {
    cyan: {
      badge: "bg-brass/10 text-brass border-brass/20",
      accent: "group-hover:text-brass",
      dot: "bg-brass",
    },
    violet: {
      badge: "bg-violet-500/10 text-violet-400 border-violet-500/20",
      accent: "group-hover:text-violet-400",
      dot: "bg-violet-500",
    },
    emerald: {
      badge: "bg-in-tune/10 text-in-tune border-in-tune/20",
      accent: "group-hover:text-in-tune",
      dot: "bg-in-tune",
    },
  };

export default function ArticlesIndex() {
  const collectionJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Guitar Tuning Guides & Articles | GuitarTunePro",
    description: "Learn how to tune your guitar perfectly. Our comprehensive guides cover beginner tuning, standard tuning, alternate tunings, intonation, string selection, and keeping your guitar in tune.",
    url: "https://www.guitartunepro.com/articles"
  };

  return (
    <div className="min-h-screen bg-canvas text-ink flex flex-col items-center relative overflow-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJsonLd) }}
      />
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-brass/0 dark:bg-brass/10 blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-brass/0 dark:bg-brass/10 blur-[120px]" />
      </div>

      <div className="z-10 w-full max-w-5xl px-5 pt-10 sm:pt-16 pb-20">
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center text-sm text-brass hover:text-brass-hover transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Tuner
          </Link>
        </div>

        {/* Hero */}
        <header className="mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-brass uppercase tracking-widest mb-4 border border-brass/30 bg-brass/5 px-3 py-1.5 rounded-full">
            Guitar Knowledge Base
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 leading-tight">
            Guitar Tuning <span className="text-brass">Guides</span>
          </h1>
          <p className="text-ink-muted text-lg max-w-2xl leading-relaxed">
            Comprehensive, expert-written guides on every aspect of guitar
            tuning — from your first string to advanced setup and intonation.
            All free, no signup required.
          </p>
        </header>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-4 mb-14">
          {[
            { label: "Free Guides", value: `${ARTICLES.length}` },
            { label: "Topics Covered", value: `${ARTICLE_CATEGORIES.length}` },
            { label: "Avg. Read Time", value: "9 min" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl border border-line bg-surface/30 p-4 text-center"
            >
              <div className="text-2xl font-bold text-ink">{stat.value}</div>
              <div className="text-xs text-ink-subtle mt-1">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Categories */}
        {ARTICLE_CATEGORIES.map((category) => {
          const c = colorMap[category.color];
          const items = articlesInCategory(category.label);
          return (
            <section key={category.label} className="mb-14">
              <div className="flex items-center gap-3 mb-6">
                <span className={`w-2 h-2 rounded-full ${c.dot}`} />
                <h2 className="text-xl font-bold text-ink">
                  {category.label}
                </h2>
                <span
                  className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${c.badge}`}
                >
                  {items.length} guides
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {items.map((article) => (
                  <Link
                    href={`/articles/${article.slug}`}
                    key={article.slug}
                    className="group block rounded-2xl border border-line bg-surface/40 overflow-hidden hover:border-line-strong hover:bg-surface-raised/50 transition-all duration-300"
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
                        className={`font-semibold text-ink ${c.accent} transition-colors mb-2 leading-snug`}
                      >
                        {article.title}
                      </h3>
                      <p className="text-xs text-ink-subtle leading-relaxed mb-3">
                        {article.description}
                      </p>
                      <div className="flex items-center justify-between text-xs text-ink-subtle">
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
        <div className="rounded-2xl border border-brass/30 bg-brass/5 p-8 text-center">
          <h2 className="text-xl font-bold text-ink mb-2">
            Ready to put it into practice?
          </h2>
          <p className="text-ink-muted mb-5 text-sm">
            Use GuitarTunePro's free online chromatic tuner to apply everything
            you've learned.
          </p>
          <Link
            href="/"
            className="inline-block bg-brass hover:bg-brass-hover text-brass-contrast font-bold px-8 py-3 rounded-full text-sm transition-colors"
          >
            Open Free Guitar Tuner →
          </Link>
        </div>
      </div>
    </div>
  );
}
