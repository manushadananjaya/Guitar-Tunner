import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { FAQItem, RelatedArticle } from "@/components/ArticleLayout";

export interface ToolPageLayoutProps {
  /** H1, and the breadcrumb leaf. */
  title: string;
  /** Sits under the H1, above the tool. Keep it short — the tool comes first. */
  description: string;
  canonicalPath: string;
  /** The interactive tool. Rendered full-bleed, directly under the header. */
  tool: React.ReactNode;
  /** Optional block between the tool and the prose, e.g. a reference table. */
  afterTool?: React.ReactNode;
  faqs?: FAQItem[];
  relatedArticles?: RelatedArticle[];
  /** Crawlable lateral links to sibling tools. */
  otherTools?: { label: string; href: string }[];
  otherToolsHeading?: string;
  children: React.ReactNode;
}

const SITE_URL = "https://www.guitartunepro.com";

/** Shared shell for pages whose primary content is an interactive tool:
 *  compact header, the tool itself, then supporting prose, FAQ, and links. */
export default function ToolPageLayout({
  title,
  description,
  canonicalPath,
  tool,
  afterTool,
  faqs,
  relatedArticles,
  otherTools,
  otherToolsHeading = "Other Tools",
  children,
}: ToolPageLayoutProps) {
  const faqJsonLd =
    faqs && faqs.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: { "@type": "Answer", text: faq.answer },
          })),
        }
      : null;

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      {
        "@type": "ListItem",
        position: 2,
        name: title,
        item: `${SITE_URL}${canonicalPath}`,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-canvas text-ink pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
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

      <main className="relative z-10">
        {/* Header — deliberately compact so the tool stays above the fold */}
        <div className="max-w-5xl mx-auto px-5 pt-8 sm:pt-10">
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-1.5 text-xs text-ink-subtle mb-5"
          >
            <Link href="/" className="hover:text-brass transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-ink-muted">{title}</span>
          </nav>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-ink leading-tight mb-3">
            {title}
          </h1>
          <p className="text-ink-muted text-base sm:text-lg leading-relaxed max-w-2xl">
            {description}
          </p>
        </div>

        <section aria-label={`${title} tool`} className="mt-8">
          {tool}
        </section>

        <div className="max-w-3xl mx-auto px-5">
          {afterTool}

          <div
            className={[
              "prose prose-invert prose-cyan max-w-none",
              "prose-headings:font-bold prose-headings:text-ink",
              "prose-h2:text-2xl prose-h2:mt-0 prose-h2:mb-4",
              "prose-h3:text-lg prose-h3:mt-0 prose-h3:mb-3",
              "prose-p:leading-[1.85] prose-p:text-ink prose-p:mb-6 prose-p:mt-0",
              "prose-li:text-ink prose-li:leading-relaxed prose-li:mb-1",
              "prose-ul:my-5 prose-ol:my-5 prose-ul:space-y-1",
              "prose-strong:text-ink prose-strong:font-semibold",
              "prose-a:text-brass prose-a:no-underline hover:prose-a:text-brass-hover",
              "[&>h2]:mt-14 [&>h2]:pt-8 [&>h2]:border-t [&>h2]:border-line",
              "[&>h3]:mt-9 [&>h3]:mb-3",
            ].join(" ")}
          >
            {children}
          </div>

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
                    <p className="mt-4 text-sm leading-relaxed text-ink-muted">
                      {faq.answer}
                    </p>
                  </details>
                ))}
              </div>
            </section>
          )}

          {otherTools && otherTools.length > 0 && (
            <section className="mt-14" aria-labelledby="other-tools-heading">
              <h2
                id="other-tools-heading"
                className="text-2xl font-bold text-ink mb-6"
              >
                {otherToolsHeading}
              </h2>
              <div className="flex flex-wrap gap-2.5">
                {otherTools.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="rounded-full border border-line bg-surface/40 px-4 py-2 text-sm text-ink hover:border-brass/40 hover:text-brass transition-colors"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </section>
          )}

          {relatedArticles && relatedArticles.length > 0 && (
            <section className="mt-14" aria-labelledby="related-heading">
              <h2
                id="related-heading"
                className="text-2xl font-bold text-ink mb-6"
              >
                Related Reading
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
                    <p className="text-xs text-ink-subtle leading-relaxed">
                      {article.description}
                    </p>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      </main>
    </div>
  );
}
