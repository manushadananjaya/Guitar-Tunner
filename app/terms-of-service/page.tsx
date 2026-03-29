import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Terms of Service | GuitarTunePro",
  description: "Terms and conditions of using GuitarTunePro's free tuning tools.",
};

export default function TermsOfServicePage() {
  const termsJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Terms of Service | GuitarTunePro",
    description: "Terms and conditions of using GuitarTunePro's free tuning tools.",
    url: "https://www.guitartunepro.com/terms-of-service"
  };

  return (
    <div className="min-h-screen bg-[#050510] text-zinc-300 font-sans selection:bg-cyan-500/30">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(termsJsonLd) }}
      />
      <div className="max-w-4xl mx-auto px-6 py-12 md:py-20">
        <Link href="/" className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors mb-8 text-sm font-medium">
          <ArrowLeft className="w-4 h-4" /> Back to Tuner
        </Link>
        
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Terms of Service</h1>
        <p className="text-sm text-zinc-500 mb-8">Last Updated: October 2023</p>
        
        <div className="space-y-6 text-base leading-relaxed">
          <p>
            Welcome to GuitarTunePro. By accessing this website (https://www.guitartunepro.com), we assume you accept these terms and conditions. Do not continue to use GuitarTunePro if you do not agree to take all of the terms and conditions stated on this page.
          </p>

          <h2 className="text-2xl font-semibold text-white mt-10 mb-4">1. License</h2>
          <p>
            Unless otherwise stated, GuitarTunePro and/or its licensors own the intellectual property rights for all material on GuitarTunePro. All intellectual property rights are reserved. You may access this from GuitarTunePro for your own personal use subjected to restrictions set in these terms and conditions.
          </p>
          <p>You must not:</p>
          <ul className="list-disc list-inside space-y-2 mt-4 ml-4">
            <li>Republish material from GuitarTunePro</li>
            <li>Sell, rent or sub-license material from GuitarTunePro</li>
            <li>Reproduce, duplicate or copy material from GuitarTunePro</li>
            <li>Redistribute content from GuitarTunePro</li>
          </ul>

          <h2 className="text-2xl font-semibold text-white mt-10 mb-4">2. Accuracy and Use of Tool</h2>
          <p>
            The GuitarTunePro tuner is provided "as is". While we strive for high accuracy through ongoing improvements to our pitch detection algorithms, we do not guarantee exact precision. Environmental factors (background noise, microphone quality) heavily influence the tool's performance. GuitarTunePro is not liable for any instrument damage resulting from improper tuning or reliance on this tool.
          </p>

          <h2 className="text-2xl font-semibold text-white mt-10 mb-4">3. Device Permissions</h2>
          <p>
            To use the tuning functionality, you must grant GuitarTunePro temporary access to your device's microphone. This access is strictly used in real-time within your browser for pitch detection and is disconnected immediately when you stop the tuner.
          </p>

          <h2 className="text-2xl font-semibold text-white mt-10 mb-4">4. Cookies and Advertising</h2>
          <p>
            We employ the use of cookies. By accessing GuitarTunePro, you agreed to use cookies in agreement with the GuitarTunePro's Privacy Policy. We also partner with third-party advertisement networks such as Google AdSense, which may place cookies on your browser to serve personalized ads.
          </p>

          <h2 className="text-2xl font-semibold text-white mt-10 mb-4">5. Disclaimer</h2>
          <p>
            To the maximum extent permitted by applicable law, we exclude all representations, warranties and conditions relating to our website and the use of this website. Nothing in this disclaimer will:
          </p>
          <ul className="list-disc list-inside space-y-2 mt-4 ml-4">
            <li>limit or exclude our or your liability for death or personal injury;</li>
            <li>limit or exclude our or your liability for fraud or fraudulent misrepresentation;</li>
            <li>limit any of our or your liabilities in any way that is not permitted under applicable law; or</li>
            <li>exclude any of our or your liabilities that may not be excluded under applicable law.</li>
          </ul>

          <h2 className="text-2xl font-semibold text-white mt-10 mb-4">6. Changes to Terms</h2>
          <p>
            We reserve the right, at our sole discretion, to modify or replace these Terms at any time. By continuing to access or use our Service after those revisions become effective, you agree to be bound by the revised terms.
          </p>
        </div>
      </div>
    </div>
  );
}
