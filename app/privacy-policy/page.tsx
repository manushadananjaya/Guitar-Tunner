import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy | GuitarTunePro",
  description: "GuitarTunePro privacy policy. Learn how we handle your data, microphone access, cookies, and third-party services including Google Analytics and Google AdSense.",
  alternates: { canonical: "/privacy-policy" },
};

const lastUpdated = "March 1, 2025";

export default function PrivacyPolicyPage() {
  const privacyJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Privacy Policy | GuitarTunePro",
    description: "GuitarTunePro privacy policy. Learn how we handle your data, microphone access, cookies, and third-party services.",
    url: "https://www.guitartunepro.com/privacy-policy"
  };

  return (
    <div className="min-h-screen bg-[#050510] text-zinc-300 pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(privacyJsonLd) }}
      />
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-blue-900/10 blur-[120px]" />
      </div>

      <main className="relative z-10 max-w-3xl mx-auto px-5 pt-10 sm:pt-16">
        <Link href="/" className="inline-flex items-center text-sm text-cyan-400 hover:text-cyan-300 transition-colors mb-8">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Home
        </Link>

        <header className="mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">Privacy Policy</h1>
          <p className="text-sm text-zinc-500">Last updated: {lastUpdated}</p>
        </header>

        <div className="prose prose-invert prose-zinc prose-headings:text-white prose-headings:font-semibold prose-h2:text-xl prose-h2:mt-10 prose-h2:mb-3 prose-p:text-zinc-400 prose-p:leading-relaxed prose-li:text-zinc-400 max-w-none space-y-0">

          <p>
            This Privacy Policy describes how GuitarTunePro ("we", "our", or "us"), operated by Helixios, collects, uses, and shares information when you use our website at <strong>www.guitartunepro.com</strong> (the "Service"). By using the Service, you agree to the practices described in this policy.
          </p>

          <h2>1. Information We Collect</h2>
          <h3 className="text-lg font-semibold text-zinc-100 mt-6 mb-2">a) Microphone Audio</h3>
          <p>
            GuitarTunePro requests access to your device's microphone solely for the purpose of real-time pitch detection. <strong>All audio processing is performed entirely on your device (client-side). We never transmit, store, record, or send your audio data to any server.</strong> Microphone access is only active when the tuner is running and is immediately released when you stop the tuner or close the page.
          </p>

          <h3 className="text-lg font-semibold text-zinc-100 mt-6 mb-2">b) Usage Analytics</h3>
          <p>
            We use <strong>Google Analytics (GA4)</strong> to collect anonymous usage data, including:
          </p>
          <ul>
            <li>Pages visited and time spent on each page</li>
            <li>General geographic region (country / city level)</li>
            <li>Device type, browser type, and operating system</li>
            <li>Traffic source (how you arrived at the site)</li>
          </ul>
          <p>
            This data is aggregated and anonymized. It does not personally identify you. You can opt out of Google Analytics tracking by installing the <a href="https://tools.google.com/dlpage/gaoptout" className="text-cyan-400 hover:text-cyan-300 transition-colors" target="_blank" rel="noopener noreferrer">Google Analytics opt-out browser add-on</a>.
          </p>

          <h3 className="text-lg font-semibold text-zinc-100 mt-6 mb-2">c) Advertising</h3>
          <p>
            We use <strong>Google AdSense</strong> to display advertisements on this site. Google AdSense may use cookies and similar tracking technologies to serve personalized ads based on your browsing history. Google's use of advertising cookies enables it and its partners to serve ads based on your visit to our site and other sites on the internet.
          </p>
          <p>
            You may opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" className="text-cyan-400 hover:text-cyan-300 transition-colors" target="_blank" rel="noopener noreferrer">Google's Ads Settings</a>. For more information on how Google uses your data, see <a href="https://policies.google.com/technologies/partner-sites" className="text-cyan-400 hover:text-cyan-300 transition-colors" target="_blank" rel="noopener noreferrer">Google's Partner Sites policy</a>.
          </p>

          <h3 className="text-lg font-semibold text-zinc-100 mt-6 mb-2">d) Log Data</h3>
          <p>
            Like most websites, our servers automatically log certain information when you visit. This may include your IP address (anonymized), browser type, referring URL, and the date and time of your visit. This data is used solely for security, debugging, and operational purposes.
          </p>

          <h2>2. Cookies</h2>
          <p>
            GuitarTunePro uses the following cookies:
          </p>
          <ul>
            <li><strong>Analytics cookies</strong> (Google Analytics): Track aggregate usage patterns. Expire after 2 years.</li>
            <li><strong>Advertising cookies</strong> (Google AdSense): Used to serve relevant ads. Governed by Google's cookie policy.</li>
            <li><strong>Functional cookies</strong>: May store user preferences (such as preferred guitar type or tuning mode) locally in your browser's localStorage. This data stays on your device and is never sent to our servers.</li>
          </ul>
          <p>
            You can control or disable cookies through your browser settings. Note that disabling cookies may affect the functionality of some features.
          </p>

          <h2>3. How We Use Your Information</h2>
          <p>We use the information we collect to:</p>
          <ul>
            <li>Provide, maintain, and improve the GuitarTunePro service</li>
            <li>Understand how users interact with the site to improve user experience</li>
            <li>Display relevant advertisements to support the free service</li>
            <li>Monitor security and prevent abuse</li>
            <li>Comply with legal obligations</li>
          </ul>

          <h2>4. Data Sharing</h2>
          <p>
            We do not sell, trade, or rent your personal information to third parties. We share data only with:
          </p>
          <ul>
            <li><strong>Google Analytics:</strong> Aggregated, anonymized usage data for site improvement purposes</li>
            <li><strong>Google AdSense:</strong> For the purpose of serving advertisements on our site</li>
            <li><strong>Law enforcement:</strong> If required by applicable law or legal process</li>
          </ul>

          <h2>5. Data Retention</h2>
          <p>
            We do not retain personal data beyond what is strictly necessary for the purposes described above. Analytics data is retained by Google for 26 months by default. We do not maintain our own database of user information.
          </p>

          <h2>6. Children's Privacy</h2>
          <p>
            GuitarTunePro is not directed to children under the age of 13. We do not knowingly collect personal information from children under 13. If we discover we have inadvertently collected such information, we will promptly delete it. If you are a parent or guardian and believe your child has provided us with personal information, please contact us.
          </p>

          <h2>7. Your Rights</h2>
          <p>
            Depending on your jurisdiction, you may have rights regarding your personal data including:
          </p>
          <ul>
            <li>The right to access the personal data we hold about you</li>
            <li>The right to request deletion of your personal data</li>
            <li>The right to opt out of marketing communications</li>
            <li>The right to data portability</li>
          </ul>
          <p>
            For EU/EEA users (GDPR), UK users (UK GDPR), and California users (CCPA), additional rights may apply. To exercise these rights, please contact us at the address below.
          </p>

          <h2>8. Third-Party Links</h2>
          <p>
            Our site may contain links to third-party websites. We are not responsible for the privacy practices or content of those websites. We encourage you to review the privacy policies of any third-party sites you visit.
          </p>

          <h2>9. Security</h2>
          <p>
            We take reasonable technical and organizational measures to protect the information we collect. However, no method of transmission over the internet is 100% secure. We cannot guarantee the absolute security of any information.
          </p>

          <h2>10. Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. When we do, we will revise the "Last updated" date at the top of this page. We encourage you to review this policy periodically. Continued use of the Service after any changes constitutes your acceptance of the revised policy.
          </p>

          <h2>11. Contact Us</h2>
          <p>
            If you have questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us:
          </p>
          <ul>
            <li><strong>Website:</strong> <a href="https://helixios.com" className="text-cyan-400 hover:text-cyan-300 transition-colors" target="_blank" rel="noopener noreferrer">helixios.com</a></li>
            <li><strong>Service:</strong> www.guitartunepro.com</li>
          </ul>
        </div>

        <div className="mt-12 pt-8 border-t border-zinc-800 flex flex-wrap gap-4 text-sm text-zinc-500">
          <Link href="/" className="hover:text-cyan-400 transition-colors">Home</Link>
          <Link href="/about" className="hover:text-cyan-400 transition-colors">About</Link>
          <Link href="/articles" className="hover:text-cyan-400 transition-colors">Articles</Link>
        </div>
      </main>
    </div>
  );
}
