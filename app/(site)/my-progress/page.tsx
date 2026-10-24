import { Metadata } from "next";
import Link from "next/link";
import ToolPageLayout from "@/components/ToolPageLayout";
import { ProgressCenter } from "@/components/ProgressCenter/ProgressCenter";

export const metadata: Metadata = {
  title: "Your Progress",
  description:
    "Your practice streak, course progress and best scores on GuitarTunePro — and how to move them to another phone or computer without an account.",
  alternates: { canonical: "/my-progress" },
  // A personal page: what it shows depends on the visitor's own browser.
  robots: { index: false, follow: true },
  openGraph: {
    title: "Your GuitarTunePro Progress",
    description: "Streaks, course progress and best scores, and a way to move them between devices.",
  },
};

export default function MyProgressPage() {
  return (
    <ToolPageLayout
      title="Your Progress"
      description="Everything the practice tools remember about you, in one place — and how to take it to another device. No account needed."
      canonicalPath="/my-progress"
      tool={<ProgressCenter />}
      faqs={[
        {
          question: "Why is there no account?",
          answer:
            "So there is nothing to sign up for and nothing about you on our servers. Your practice history lives in your browser. The trade-off is that it stays on one device unless you move it — which is what this page is for.",
        },
        {
          question: "Is the transfer link safe?",
          answer:
            "Your progress is packed into the part of the link after the # sign. Browsers never send that part to a website's server, so opening the link does not upload anything. Anyone who has the link can read your practice history, though, so send it to yourself rather than posting it.",
        },
        {
          question: "What happens if I import the same backup twice?",
          answer:
            "Nothing changes the second time. Imports merge: practice days are combined, the fuller daily-challenge result is kept, finished course days are added, and best scores keep the higher value. Nothing already on the device is removed.",
        },
        {
          question: "What is not copied?",
          answer:
            "The rhythm trainer's latency calibration, because it measures this device's speakers or headphones and would be wrong on another. Your settings, such as reference pitch, also stay as they are on the receiving device. Calibrate once on each device.",
        },
        {
          question: "How do I keep my progress if I clear my browser data?",
          answer:
            "Download a backup file first, then choose it here afterwards. Clearing site data, or browsing in a private window, removes everything the tools have stored.",
        },
      ]}
    >
      <h2>What Is Tracked</h2>
      <p>
        Your <Link href="/practice-routine">practice streak and calendar</Link>, which every
        practice tool adds to; your <Link href="/daily-challenge">daily challenge</Link> results
        and streak; days finished in the <Link href="/beginner-guitar-course">30-day beginner
        course</Link>; best scores in the <Link href="/rhythm-trainer">rhythm trainer</Link>; and
        accuracy in the <Link href="/ear-training">ear trainer</Link> and{" "}
        <Link href="/fretboard-trainer">fretboard trainer</Link>. All of it is stored in this
        browser and nowhere else.
      </p>
      <h2>Moving to a New Phone or Computer</h2>
      <p>
        Press <strong>Copy transfer link</strong>, send it to yourself in a message or an email,
        and open it on the other device. You will see what the backup contains and can merge it
        in with one tap. If you would rather keep a copy, download the backup file and choose it
        on the other device instead — it is a small text file you can store anywhere.
      </p>
    </ToolPageLayout>
  );
}
