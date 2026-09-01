import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock } from "lucide-react";
import { SITE_AUTHOR } from "@/lib/author";
import { ARTICLES } from "@/lib/articles";

const SITE_URL = "https://www.guitartunepro.com";

export function generateMetadata(): Metadata {
  if (!SITE_AUTHOR) return {};
  return {
    title: `${SITE_AUTHOR.name} — Author`,
    description: `${SITE_AUTHOR.name}, ${SITE_AUTHOR.role}. ${SITE_AUTHOR.bio}`,
    alternates: { canonical: SITE_AUTHOR.url },
    openGraph: {
      title: `${SITE_AUTHOR.name} — GuitarTunePro`,
      description: SITE_AUTHOR.bio,
      type: "profile",
    },
  };
}

export default function AuthorPage() {
  if (!SITE_AUTHOR || SITE_AUTHOR.slug !== "manusha-dananjaya") notFound();
  const author = SITE_AUTHOR;

  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${SITE_URL}${author.url}#person`,
    name: author.name,
    url: `${SITE_URL}${author.url}`,
    jobTitle: author.role,
    description: author.bio,
    knowsAbout: author.knowsAbout,
    ...(author.sameAs && author.sameAs.length > 0 && { sameAs: author.sameAs }),
    worksFor: {
      "@type": "Organization",
      name: "GuitarTunePro",
      url: SITE_URL,
    },
  };

  const profileJsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    dateModified: "2026-09-02",
    mainEntity: { "@id": `${SITE_URL}${author.url}#person` },
    about: { "@id": `${SITE_URL}${author.url}#person` },
    url: `${SITE_URL}${author.url}`,
  };

  return (
    <div className="min-h-screen bg-canvas text-ink pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(profileJsonLd) }}
      />

      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-brass/0 dark:bg-brass/10 blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-brass/0 dark:bg-brass/10 blur-[120px]" />
      </div>

      <main className="relative z-10 max-w-3xl mx-auto px-5 pt-10 sm:pt-16">
        <Link
          href="/articles"
          className="inline-flex items-center text-sm text-brass hover:text-brass-hover transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Articles
        </Link>

        <header className="mb-10">
          <p className="text-2xs font-semibold uppercase tracking-[0.18em] text-ink-subtle mb-3">
            Author
          </p>
          <h1 className="text-3xl sm:text-4xl font-bold text-ink mb-2">
            {author.name}
          </h1>
          <p className="text-brass">{author.role}</p>
        </header>

        <section className="space-y-4 leading-relaxed text-ink-muted">
          {author.longBio.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </section>

        <section className="mt-10">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-ink-subtle mb-3">
            Writes about
          </h2>
          <div className="flex flex-wrap gap-2">
            {author.knowsAbout.map((topic) => (
              <span
                key={topic}
                className="rounded-full border border-line bg-surface/40 px-3 py-1.5 text-sm text-ink"
              >
                {topic}
              </span>
            ))}
          </div>
        </section>

        <section className="mt-10 rounded-xl border border-line bg-surface/40 p-6">
          <p className="leading-relaxed text-ink-muted">
            More on how the tuner is built and tested is on the{" "}
            <Link
              href="/about"
              className="text-brass hover:text-brass-hover transition-colors"
            >
              about page
            </Link>
            , and the measured pitch-detection accuracy is published on the{" "}
            <Link
              href="/accuracy"
              className="text-brass hover:text-brass-hover transition-colors"
            >
              accuracy page
            </Link>
            .
          </p>
        </section>

        <section className="mt-12" aria-labelledby="articles-heading">
          <h2
            id="articles-heading"
            className="text-2xl font-bold text-ink mb-6"
          >
            Articles by {author.name}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {ARTICLES.map((article) => (
              <Link
                key={article.slug}
                href={`/articles/${article.slug}`}
                className="group block rounded-xl border border-line bg-surface/40 p-5 hover:border-brass/40 hover:bg-surface-raised/50 transition-all"
              >
                <p className="font-semibold text-ink group-hover:text-brass transition-colors mb-1.5 leading-snug">
                  {article.title}
                </p>
                <p className="text-xs text-ink-subtle leading-relaxed mb-3">
                  {article.description}
                </p>
                <span className="flex items-center gap-1.5 text-xs text-ink-subtle">
                  <Clock className="w-3 h-3" /> {article.readingTime} min read
                </span>
              </Link>
            ))}
          </div>
        </section>

        <div className="mt-14 rounded-2xl border border-brass/30 bg-brass/5 p-6 sm:p-8 text-center">
          <p className="text-ink mb-5">Try the tuner behind the writing.</p>
          <Link
            href="/"
            className="inline-block bg-brass hover:bg-brass-hover text-brass-contrast font-bold px-6 py-3 rounded-full text-sm transition-colors"
          >
            Open the Free Guitar Tuner →
          </Link>
        </div>
      </main>
    </div>
  );
}
