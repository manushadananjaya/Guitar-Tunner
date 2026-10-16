import { Metadata } from "next";
import Link from "next/link";
import ToolPageLayout from "@/components/ToolPageLayout";
import { EmbedBuilder } from "@/components/EmbedBuilder";

export const metadata: Metadata = {
  title: "Free Tuner Widget for Your Website",
  description:
    "Add a free guitar, bass, ukulele or violin tuner to your website. Choose the instrument, language and theme, then copy one snippet. No account, no ads.",
  alternates: { canonical: "/embed-tuner" },
  openGraph: {
    title: "Free Tuner Widget for Your Website",
    description:
      "Embed a working microphone tuner on your site with one line of HTML.",
  },
};

export default function EmbedTunerBuilderPage() {
  return (
    <ToolPageLayout
      title="Add a Free Tuner to Your Website"
      description="Choose an instrument, language and theme, then paste the code into your page. Your visitors get a working microphone tuner without leaving your site."
      canonicalPath="/embed-tuner"
      tool={<EmbedBuilder />}
      faqs={[
        {
          question: "Is the widget free?",
          answer:
            "Yes. There is no account, no API key and no usage limit. The only condition is that the small credit line under the tuner stays visible.",
        },
        {
          question: "Does the widget show ads?",
          answer:
            "No. The embedded tuner never loads advertising, so it will not put someone else's ads on your page.",
        },
        {
          question: "Is my visitors' audio recorded or uploaded?",
          answer:
            "No. Pitch detection runs entirely in the visitor's browser. The microphone audio is analysed in memory and never sent to our servers or anyone else's.",
        },
        {
          question: "Why does the microphone not work in my embed?",
          answer:
            "Check two things. The iframe must include allow=\"microphone\" — it is in the code above, but some page builders strip attributes, so look at the published HTML. And your page must be served over HTTPS; browsers refuse microphone access on plain HTTP pages.",
        },
        {
          question: "Which instruments and languages are available?",
          answer:
            "Every instrument the main tuner supports — 6, 7 and 12-string guitar with all its alternate tunings, 4 and 5-string bass, ukulele and baritone ukulele, mandolin, banjo, violin, viola and cello — with the interface in English, Spanish, Portuguese, French or German.",
        },
      ]}
      otherTools={[
        { label: "Guitar Tuner", href: "/" },
        { label: "Bass Tuner", href: "/bass-tuner" },
        { label: "Ukulele Tuner", href: "/ukulele-tuner" },
        { label: "Violin Tuner", href: "/violin-tuner" },
        { label: "Metronome", href: "/metronome" },
      ]}
    >
      <h2>Who This Is For</h2>
      <p>
        The widget is built for sites whose readers are about to pick up an
        instrument: guitar and ukulele teachers, music school pages, lesson
        blogs, song-sheet and tab sites, and community groups like ukulele
        clubs. Putting a tuner on the page means students can tune and start
        playing without opening another tab — and a tuned instrument makes the
        lesson that follows sound right.
      </p>

      <h2>How to Add It</h2>
      <ol>
        <li>Choose the instrument, tuning, language and theme above.</li>
        <li>
          Click <strong>Copy code</strong>.
        </li>
        <li>
          Paste it into your page as raw HTML. In WordPress, use a{" "}
          <strong>Custom HTML</strong> block; in Squarespace, a{" "}
          <strong>Code</strong> block; in Wix, <strong>Embed Code → Embed
          HTML</strong>; on Blogger, switch the post to HTML view.
        </li>
        <li>
          Publish, open the page on your phone, and tap{" "}
          <strong>Start Recording</strong> to check the microphone prompt
          appears.
        </li>
      </ol>
      <p>
        The tuner adapts to the width of its container down to small phones.
        Its height is fixed by the iframe; 600&nbsp;px fits the tuner, the
        string buttons and the credit line without scrolling. Raise it if your
        layout crops the bottom.
      </p>

      <h2>What Your Visitors Get</h2>
      <ul>
        <li>
          The same pitch detection as this site&rsquo;s main tuner, with
          automatic string detection and a needle in cents —{" "}
          <Link href="/accuracy">measured accuracy is published here</Link>.
        </li>
        <li>
          A <strong>Play</strong> button that sounds each target note, for
          tuning by ear or when the room is too noisy for the microphone.
        </li>
        <li>
          Your chosen reference pitch — useful for orchestras at A&nbsp;=&nbsp;442
          or players who prefer{" "}
          <Link href="/432-hz-tuner">A&nbsp;=&nbsp;432</Link>.
        </li>
        <li>No sign-up and no download.</li>
      </ul>

      <h2>Privacy and Performance</h2>
      <p>
        The widget loads only when it scrolls into view
        (<code>loading=&quot;lazy&quot;</code>), so it does not slow down the
        rest of your page. It asks for the microphone only after the visitor
        presses Start Recording, and the audio never leaves their device. The
        widget loads no ads and no tracking cookies; we count how often it is
        viewed with cookie-free analytics, and nothing else.
      </p>
    </ToolPageLayout>
  );
}
