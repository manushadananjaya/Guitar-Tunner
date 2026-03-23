import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata = {
  title: "About Us | GuitarTunePro",
  description: "Learn more about GuitarTunePro, our mission, and our free professional guitar tuning tools.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#050510] text-zinc-300 font-sans selection:bg-cyan-500/30">
      <div className="max-w-4xl mx-auto px-6 py-12 md:py-20">
        <Link href="/" className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors mb-8 text-sm font-medium">
          <ArrowLeft className="w-4 h-4" /> Back to Tuner
        </Link>
        
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">About GuitarTunePro</h1>
        
        <div className="space-y-6 text-lg leading-relaxed">
          <p>
            Welcome to <strong>GuitarTunePro</strong>, your trusted companion for achieving perfect pitch. Whether you are a beginner strumming your first chords or an experienced musician preparing for a gig, our mission is to provide you with the most accurate, reliable, and accessible tuning tools available on the web.
          </p>
          
          <h2 className="text-2xl font-semibold text-white mt-10 mb-4">Our Story</h2>
          <p>
            GuitarTunePro was born out of a simple frustration: why should musicians have to compromise between expensive hardware tuners and clunky, ad-heavy mobile apps? We wanted to build a seamless, web-first tuning experience that works flawlessly across all devices—desktops, tablets, and smartphones—without requiring any app installations.
          </p>
          
          <h2 className="text-2xl font-semibold text-white mt-10 mb-4">What We Do</h2>
          <p>
            We leverage advanced Web Audio API technology and state-of-the-art pitch detection algorithms to bring you a professional-grade tuner right in your browser. Our tool supports:
          </p>
          <ul className="list-disc list-inside space-y-2 mt-4 ml-4">
            <li>Standard 6-string guitars</li>
            <li>Extended range 7-string guitars</li>
            <li>12-string acoustic guitars</li>
            <li>Bass guitars (4-string and 5-string)</li>
            <li>Ukuleles and other stringed instruments</li>
            <li>Various alternative tunings (Drop D, Open G, Open D, Half Step Down, and more)</li>
          </ul>

          <h2 className="text-2xl font-semibold text-white mt-10 mb-4">Our Commitment</h2>
          <p>
            We believe that high-quality tools should be universally accessible. That is why GuitarTunePro is, and always will be, completely free to use. We continuously refine our pitch detection algorithms and UI to ensure the best possible experience for our users. We are proudly built and maintained by passionate musicians and developers who care about the details.
          </p>

          <div className="mt-12 p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800">
            <h3 className="text-xl font-semibold text-white mb-2">Connect With Us</h3>
            <p className="text-sm">
              Have feedback, feature requests, or just want to say hi? <Link href="/contact" className="text-cyan-400 hover:underline">Contact our support team</Link>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
