import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Privacy Policy | GuitarTunePro",
  description: "Privacy policy for GuitarTunePro. Read how we handle data, cookies, and Google AdSense.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-[#050510] text-zinc-300 font-sans selection:bg-cyan-500/30">
      <div className="max-w-4xl mx-auto px-6 py-12 md:py-20">
        <Link href="/" className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors mb-8 text-sm font-medium">
          <ArrowLeft className="w-4 h-4" /> Back to Tuner
        </Link>
        
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Privacy Policy</h1>
        <p className="text-sm text-zinc-500 mb-8">Last Updated: October 2023</p>
        
        <div className="space-y-6 text-base leading-relaxed">
          <p>
            At <strong>GuitarTunePro</strong>, accessible from https://guitar-tuner.app, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by GuitarTunePro and how we use it.
          </p>
          
          <h2 className="text-2xl font-semibold text-white mt-10 mb-4">1. Microphone & Audio Data</h2>
          <p>
            GuitarTunePro operates entirely within your web browser. <strong>We do not record, transmit, or store any audio data captured by your microphone.</strong> The audio processing necessary for pitch detection happens locally on your device in real-time. Once the pitch is calculated, the raw audio data is instantly discarded.
          </p>
          
          <h2 className="text-2xl font-semibold text-white mt-10 mb-4">2. Usage Data & Analytics</h2>
          <p>
            We use Google Analytics to monitor and analyze the use of our Service. Google Analytics collects standard internet log information and visitor behavior information in an anonymous form. This information (including your IP address) is transmitted to Google to evaluate your use of the website and compile statistical reports on website activity.
          </p>

          <h2 className="text-2xl font-semibold text-white mt-10 mb-4">3. Cookies and Web Beacons</h2>
          <p>
            Like any other website, GuitarTunePro uses &quot;cookies&quot;. These cookies are used to store information including visitors&apos; preferences, and the pages on the website that the visitor accessed or visited. The information is used to optimize the users&apos; experience by customizing our web page content based on visitors&apos; browser type and/or other information.
          </p>

          <h2 className="text-2xl font-semibold text-white mt-10 mb-4">4. Google AdSense & Advertising</h2>
          <p>
            We use Google AdSense to display advertisements on our site. Google, as a third-party vendor, uses cookies to serve ads on GuitarTunePro.
          </p>
          <ul className="list-disc list-inside space-y-2 mt-4 ml-4">
            <li>
              Third party vendors, including Google, use cookies to serve ads based on a user&apos;s prior visits to this website or other websites.
            </li>
            <li>
              Google&apos;s use of advertising cookies enables it and its partners to serve ads to our users based on their visit to our sites and/or other sites on the Internet.
            </li>
            <li>
              Users may opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline">Ads Settings</a>. (Alternatively, you can opt out of a third-party vendor&apos;s use of cookies for personalized advertising by visiting <a href="http://www.aboutads.info/choices/" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline">www.aboutads.info</a>).
            </li>
          </ul>

          <h2 className="text-2xl font-semibold text-white mt-10 mb-4">5. Third-Party Privacy Policies</h2>
          <p>
            GuitarTunePro&apos;s Privacy Policy does not apply to other advertisers or websites. Thus, we are advising you to consult the respective Privacy Policies of these third-party ad servers for more detailed information. It may include their practices and instructions about how to opt-out of certain options.
          </p>

          <h2 className="text-2xl font-semibold text-white mt-10 mb-4">6. Consent</h2>
          <p>
            By using our website, you hereby consent to our Privacy Policy and agree to its terms.
          </p>

          <h2 className="text-2xl font-semibold text-white mt-10 mb-4">7. Contact Information</h2>
          <p>
            If you have additional questions or require more information about our Privacy Policy, do not hesitate to contact us at <Link href="/contact" className="text-cyan-400 hover:underline">our Contact page</Link>.
          </p>
        </div>
      </div>
    </div>
  );
}
