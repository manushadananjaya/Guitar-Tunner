import React from "react";
import Link from "next/link";
import { ArrowLeft, Mail, MessageSquare } from "lucide-react";

export const metadata = {
  title: "Contact Us | GuitarTunePro",
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
      email: "support@guitartunepro.com",
    }
  };

  return (
    <div className="min-h-screen bg-[#050510] text-zinc-300 font-sans selection:bg-cyan-500/30">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactJsonLd) }}
      />
      <div className="max-w-4xl mx-auto px-6 py-12 md:py-20">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors mb-8 text-sm font-medium"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Tuner
        </Link>

        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
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
          <div className="p-8 rounded-2xl bg-zinc-900/50 border border-zinc-800 flex flex-col items-center text-center">
            <div className="w-14 h-14 rounded-full bg-cyan-500/10 flex items-center justify-center mb-6">
              <Mail className="w-7 h-7 text-cyan-400" />
            </div>
            <h2 className="text-xl font-semibold text-white mb-3">
              Email Support
            </h2>
            <p className="text-zinc-400 mb-6 text-sm">
              For general inquiries, bug reports, and partnership opportunities,
              send us an email. We typically respond within 24-48 hours.
            </p>
            <a
              href="mailto:support@guitartunepro.com"
              className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-zinc-800 text-white hover:bg-zinc-700 transition-colors text-sm font-medium w-full"
            >
              support@guitartunepro.com
            </a>
          </div>

          {/* Feedback Card */}
          <div className="p-8 rounded-2xl bg-zinc-900/50 border border-zinc-800 flex flex-col items-center text-center">
            <div className="w-14 h-14 rounded-full bg-emerald-500/10 flex items-center justify-center mb-6">
              <MessageSquare className="w-7 h-7 text-emerald-400" />
            </div>
            <h2 className="text-xl font-semibold text-white mb-3">Feedback</h2>
            <p className="text-zinc-400 mb-6 text-sm">
              Missing a specific tuning mode? Is the pitch detection acting
              weird for your instrument? Let us know so we can improve the app.
            </p>
            <a
              href="mailto:feedback@guitartunepro.com"
              className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30 transition-colors text-sm font-medium w-full"
            >
              Send Feedback
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
