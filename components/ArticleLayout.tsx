import Link from "next/link";
import { ArrowLeft, Clock, Calendar, ChevronRight } from "lucide-react";

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
  };
  faqs?: FAQItem[];
  relatedArticles?: RelatedArticle[];
  children: React.ReactNode;
  slug: string;
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
}: ArticleLayoutProps) {
  const siteUrl = "https://www.guitartunepro.com";

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    datePublished,
    dateModified: dateModified ?? datePublished,
    author: {
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
      "@id": `${siteUrl}/articles/${slug}`,
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
    <div className="min-h-screen bg-[#050510] text-zinc-300 pb-20">
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
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-blue-900/10 blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-cyan-900/10 blur-[120px]" />
      </div>

      <main className="relative z-10 max-w-3xl mx-auto px-5 pt-10 sm:pt-16">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-zinc-500 mb-6">
          <Link href="/" className="hover:text-cyan-400 transition-colors">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <Link href="/articles" className="hover:text-cyan-400 transition-colors">Articles</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-zinc-400 truncate max-w-[180px]">{title}</span>
        </nav>

        <Link
          href="/articles"
          className="inline-flex items-center text-sm text-cyan-400 hover:text-cyan-300 transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Articles
        </Link>

        {/* Article Header */}
        <header className="mb-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight mb-4">
            {title}
          </h1>
          <p className="text-zinc-400 text-lg leading-relaxed mb-5">{description}</p>
          <div className="flex flex-wrap items-center gap-4 text-xs text-zinc-500">
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
          </div>
        </header>

        {/* Hero Image */}
        {heroImage && (
          <figure className="mb-10 rounded-2xl overflow-hidden border border-white/5">
            <img
              src={heroImage.src}
              alt={heroImage.alt}
              className="w-full h-56 sm:h-72 object-cover"
              loading="eager"
            />
            {heroImage.credit && (
              <figcaption className="text-xs text-zinc-500 text-center py-2 bg-zinc-900/50">
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
            "prose-headings:font-bold prose-headings:text-white",
            "prose-h2:text-2xl prose-h2:mt-0 prose-h2:mb-4",
            "prose-h3:text-lg prose-h3:mt-0 prose-h3:mb-3",
            // Paragraphs
            "prose-p:leading-[1.85] prose-p:text-zinc-300 prose-p:mb-6 prose-p:mt-0",
            // Lists
            "prose-li:text-zinc-300 prose-li:leading-relaxed prose-li:mb-1",
            "prose-ul:my-5 prose-ol:my-5 prose-ul:space-y-1",
            // Strong / links
            "prose-strong:text-zinc-100 prose-strong:font-semibold",
            "prose-a:text-cyan-400 prose-a:no-underline hover:prose-a:text-cyan-300",
            // Section separators via arbitrary variants
            "[&>h2]:mt-14 [&>h2]:pt-8 [&>h2]:border-t [&>h2]:border-zinc-800",
            "[&>h3]:mt-9 [&>h3]:mb-3",
            // Figure / blockquote spacing
            "prose-figure:my-8",
          ].join(" ")}
        >
          {children}
        </div>

        {/* CTA Banner */}
        <div className="mt-14 rounded-2xl border border-cyan-500/30 bg-cyan-500/5 p-6 sm:p-8 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-cyan-400 mb-2">
            Ready to tune?
          </p>
          <p className="text-zinc-300 mb-5">
            Use GuitarTunePro's free online tuner — works directly in your browser, no app download needed.
          </p>
          <Link
            href="/"
            className="inline-block bg-cyan-500 hover:bg-cyan-400 text-zinc-950 font-bold px-6 py-3 rounded-full text-sm transition-colors"
          >
            Open Free Guitar Tuner →
          </Link>
        </div>

        {/* FAQ Section */}
        {faqs && faqs.length > 0 && (
          <section className="mt-14" aria-labelledby="faq-heading">
            <h2 id="faq-heading" className="text-2xl font-bold text-white mb-6">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <details
                  key={i}
                  className="group rounded-xl border border-zinc-800 bg-zinc-900/40 p-5"
                >
                  <summary className="flex cursor-pointer items-center justify-between gap-4 font-semibold text-zinc-100 list-none">
                    <span>{faq.question}</span>
                    <ChevronRight className="w-4 h-4 shrink-0 text-cyan-400 transition-transform group-open:rotate-90" />
                  </summary>
                  <p className="mt-4 text-sm leading-relaxed text-zinc-400">{faq.answer}</p>
                </details>
              ))}
            </div>
          </section>
        )}

        {/* Related Articles */}
        {relatedArticles && relatedArticles.length > 0 && (
          <section className="mt-14" aria-labelledby="related-heading">
            <h2 id="related-heading" className="text-2xl font-bold text-white mb-6">
              Related Articles
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {relatedArticles.map((article) => (
                <Link
                  key={article.slug}
                  href={`/articles/${article.slug}`}
                  className="group block rounded-xl border border-zinc-800 bg-zinc-900/40 p-5 hover:border-cyan-500/40 hover:bg-zinc-800/50 transition-all"
                >
                  <p className="font-semibold text-zinc-100 group-hover:text-cyan-400 transition-colors mb-1.5 leading-snug">
                    {article.title}
                  </p>
                  <p className="text-xs text-zinc-500 leading-relaxed">{article.description}</p>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
