import Link from "next/link";
import { ArrowLeft, Clock, Calendar, ChevronRight } from "lucide-react";
import { SITE_AUTHOR } from "@/lib/author";

export interface FAQItem {
  question: string;
  answer: string;
}

export interface RelatedArticle {
  title: string;
  slug: string;
  description: string;
}

export interface ArticleLayoutProps {
  title: string;
  description: string;
  datePublished: string;
  dateModified?: string;
  readingTimeMinutes: number;
  heroImage?: {
    src: string;
    alt: string;
    credit?: string;
    /** Photos crop well; UI screenshots do not. Defaults to "cover". */
    fit?: "cover" | "contain";
  };
  faqs?: FAQItem[];
  relatedArticles?: RelatedArticle[];
  children: React.ReactNode;
  slug: string;
  /** Override the canonical URL path used in JSON-LD and the breadcrumb.
   *  Defaults to /articles/{slug}. Pass for non-article routes like /drop-d-tuner. */
  canonicalPath?: string;
}

export default function ArticleLayout({
  title,
  description,
  datePublished,
  dateModified,
  readingTimeMinutes,
  heroImage,
  faqs,
  relatedArticles,
  children,
  slug,
  canonicalPath,
}: ArticleLayoutProps) {
  const siteUrl = "https://www.guitartunepro.com";
  const resolvedPath = canonicalPath ?? `/articles/${slug}`;
  const isArticle = resolvedPath.startsWith("/articles/");

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    datePublished,
    dateModified: dateModified ?? datePublished,
    // A named Person is the stronger E-E-A-T signal, but only ships once a
    // real one is configured — see lib/author.ts.
    author: SITE_AUTHOR
      ? {
          "@type": "Person",
          "@id": `${siteUrl}${SITE_AUTHOR.url}#person`,
          name: SITE_AUTHOR.name,
          description: SITE_AUTHOR.bio,
          url: `${siteUrl}${SITE_AUTHOR.url}`,
          knowsAbout: SITE_AUTHOR.knowsAbout,
        }
      : {
          "@type": "Organization",
          name: "GuitarTunePro",
          url: siteUrl,
        },
    publisher: {
      "@type": "Organization",
      name: "GuitarTunePro",
      url: siteUrl,
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/Logo.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${siteUrl}${resolvedPath}`,
    },
    ...(heroImage && {
      image: {
        "@type": "ImageObject",
        url: heroImage.src,
        description: heroImage.alt,
      },
    }),
  };

  const faqJsonLd =
    faqs && faqs.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: faq.answer,
            },
          })),
        }
      : null;

  return (
    <div className="min-h-screen bg-canvas text-ink pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}

      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-brass/0 dark:bg-brass/10 blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-brass/0 dark:bg-brass/10 blur-[120px]" />
      </div>

      <main className="relative z-10 max-w-3xl mx-auto px-5 pt-10 sm:pt-16">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-ink-subtle mb-6">
          <Link href="/" className="hover:text-brass transition-colors">Home</Link>
          {isArticle && (
            <>
              <ChevronRight className="w-3 h-3" />
              <Link href="/articles" className="hover:text-brass transition-colors">Articles</Link>
            </>
          )}
          <ChevronRight className="w-3 h-3" />
          <span className="text-ink-muted truncate max-w-[180px]">{title}</span>
        </nav>

        <Link
          href={isArticle ? "/articles" : "/"}
          className="inline-flex items-center text-sm text-brass hover:text-brass-hover transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" /> {isArticle ? "Back to Articles" : "Back to Tuner"}
        </Link>

        {/* Article Header */}
        <header className="mb-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-ink leading-tight mb-4">
            {title}
          </h1>
          <p className="text-ink-muted text-lg leading-relaxed mb-5">{description}</p>
          <div className="flex flex-wrap items-center gap-4 text-xs text-ink-subtle">
            {SITE_AUTHOR && (
              <span className="text-ink-muted">
                By{" "}
                {SITE_AUTHOR.url ? (
                  <Link
                    href={SITE_AUTHOR.url}
                    className="text-brass hover:text-brass-hover transition-colors"
                  >
                    {SITE_AUTHOR.name}
                  </Link>
                ) : (
                  SITE_AUTHOR.name
                )}
              </span>
            )}
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              {new Date(datePublished).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              {readingTimeMinutes} min read
            </span>
            {dateModified && dateModified !== datePublished && (
              <span className="text-ink-subtle">
                Last updated{" "}
                {new Date(dateModified).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            )}
          </div>
        </header>

        {/* Hero Image */}
        {heroImage && (
          <figure className="mb-10 rounded-2xl overflow-hidden border border-line">
            <img
              src={heroImage.src}
              alt={heroImage.alt}
              className={`w-full h-56 sm:h-72 ${
                heroImage.fit === "contain"
                  ? "object-contain bg-surface-sunken/60 p-3"
                  : "object-cover"
              }`}
              loading="eager"
            />
            {heroImage.credit && (
              <figcaption className="text-xs text-ink-subtle text-center py-2 bg-surface/50">
                {heroImage.credit}
              </figcaption>
            )}
          </figure>
        )}

        {/* Article Body */}
        <div
          className={[
            "prose prose-invert prose-cyan max-w-none",
            // Headings
            "prose-headings:font-bold prose-headings:text-ink",
            "prose-h2:text-2xl prose-h2:mt-0 prose-h2:mb-4",
            "prose-h3:text-lg prose-h3:mt-0 prose-h3:mb-3",
            // Paragraphs
            "prose-p:leading-[1.85] prose-p:text-ink prose-p:mb-6 prose-p:mt-0",
            // Lists
            "prose-li:text-ink prose-li:leading-relaxed prose-li:mb-1",
            "prose-ul:my-5 prose-ol:my-5 prose-ul:space-y-1",
            // Strong / links
            "prose-strong:text-ink prose-strong:font-semibold",
            "prose-a:text-brass prose-a:no-underline hover:prose-a:text-brass-hover",
            // Section separators via arbitrary variants
            "[&>h2]:mt-14 [&>h2]:pt-8 [&>h2]:border-t [&>h2]:border-line",
            "[&>h3]:mt-9 [&>h3]:mb-3",
            // Figure / blockquote spacing
            "prose-figure:my-8",
          ].join(" ")}
        >
          {children}
        </div>

        {/* CTA Banner */}
        <div className="mt-14 rounded-2xl border border-brass/30 bg-brass/5 p-6 sm:p-8 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-brass mb-4">
            Ready to tune?
          </p>
          <Link
            href="/"
            className="inline-block bg-brass hover:bg-brass-hover text-brass-contrast font-bold px-6 py-3 rounded-full text-sm transition-colors"
          >
            Use Our Free Chromatic Guitar Tuner →
          </Link>
        </div>

        {/* Author box — the visible half of the E-E-A-T signal */}
        {SITE_AUTHOR && (
          <section className="mt-14 rounded-2xl border border-line bg-surface/40 p-6">
            <p className="text-2xs font-semibold uppercase tracking-[0.18em] text-ink-subtle mb-3">
              About the author
            </p>
            <p className="font-bold text-ink">{SITE_AUTHOR.name}</p>
            <p className="text-xs text-brass mb-2">{SITE_AUTHOR.role}</p>
            <p className="text-sm leading-relaxed text-ink-muted">
              {SITE_AUTHOR.bio}
            </p>
          </section>
        )}

        {/* FAQ Section */}
        {faqs && faqs.length > 0 && (
          <section className="mt-14" aria-labelledby="faq-heading">
            <h2 id="faq-heading" className="text-2xl font-bold text-ink mb-6">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <details
                  key={i}
                  className="group rounded-xl border border-line bg-surface/40 p-5"
                >
                  <summary className="flex cursor-pointer items-center justify-between gap-4 font-semibold text-ink list-none">
                    <span>{faq.question}</span>
                    <ChevronRight className="w-4 h-4 shrink-0 text-brass transition-transform group-open:rotate-90" />
                  </summary>
                  <p className="mt-4 text-sm leading-relaxed text-ink-muted">{faq.answer}</p>
                </details>
              ))}
            </div>
          </section>
        )}

        {/* Related Articles */}
        {relatedArticles && relatedArticles.length > 0 && (
          <section className="mt-14" aria-labelledby="related-heading">
            <h2 id="related-heading" className="text-2xl font-bold text-ink mb-6">
              Related Articles
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {relatedArticles.map((article) => (
                <Link
                  key={article.slug}
                  href={`/articles/${article.slug}`}
                  className="group block rounded-xl border border-line bg-surface/40 p-5 hover:border-brass/40 hover:bg-surface-raised/50 transition-all"
                >
                  <p className="font-semibold text-ink group-hover:text-brass transition-colors mb-1.5 leading-snug">
                    {article.title}
                  </p>
                  <p className="text-xs text-ink-subtle leading-relaxed">{article.description}</p>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
