import React from "react";
import Link from "next/link";
import { ArrowLeft, Mail, MessageSquare } from "lucide-react";

export const metadata = {
  title: "Contact Us",
  description:
    "Get in touch with the GuitarTunePro team for support, feedback, or business inquiries.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  const contactJsonLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact GuitarTunePro",
    description: "Get in touch with the GuitarTunePro team for support, feedback, or business inquiries.",
    url: "https://www.guitartunepro.com/contact",
    mainEntity: {
      "@type": "Organization",
      name: "GuitarTunePro",
      email: "manushad.official@gmail.com",
    }
  };

  return (
    <div className="min-h-screen bg-canvas text-ink font-sans selection:bg-brass/30">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactJsonLd) }}
      />
      <div className="max-w-4xl mx-auto px-6 py-12 md:py-20">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-brass hover:text-brass-hover transition-colors mb-8 text-sm font-medium"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Tuner
        </Link>

        <h1 className="text-4xl md:text-5xl font-bold text-ink mb-6">
          Contact Us
        </h1>

        <div className="space-y-6 text-lg leading-relaxed mb-12">
          <p>
            We love hearing from our users! Whether you have a question about
            how to use the tuner, found a bug, or have a suggestion for a new
            feature, our team is ready to help.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Email Card */}
          <div className="p-8 rounded-2xl bg-surface/50 border border-line flex flex-col items-center text-center">
            <div className="w-14 h-14 rounded-full bg-brass/10 flex items-center justify-center mb-6">
              <Mail className="w-7 h-7 text-brass" />
            </div>
            <h2 className="text-xl font-semibold text-ink mb-3">
              Email Support
            </h2>
            <p className="text-ink-muted mb-6 text-sm">
              For general inquiries, bug reports, and partnership opportunities,
              send us an email. We typically respond within 24-48 hours.
            </p>
            <a
              href="mailto:manushad.official@gmail.com"
              className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-surface-raised text-ink hover:bg-surface-raised transition-colors text-sm font-medium w-full"
            >
              manushad.official@gmail.com
            </a>
          </div>

          {/* Feedback Card */}
          <div className="p-8 rounded-2xl bg-surface/50 border border-line flex flex-col items-center text-center">
            <div className="w-14 h-14 rounded-full bg-in-tune/10 flex items-center justify-center mb-6">
              <MessageSquare className="w-7 h-7 text-in-tune" />
            </div>
            <h2 className="text-xl font-semibold text-ink mb-3">Feedback</h2>
            <p className="text-ink-muted mb-6 text-sm">
              Missing a specific tuning mode? Is the pitch detection acting
              weird for your instrument? Let us know so we can improve the app.
            </p>
            <a
              href="mailto:manushad.official@gmail.com"
              className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-in-tune/20 text-in-tune hover:bg-in-tune/30 transition-colors text-sm font-medium w-full"
            >
              Send Feedback
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
