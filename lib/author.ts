/** Named authorship for articles (E-E-A-T).
 *
 *  Google's guidance for advice content wants a real, identifiable person
 *  behind it — a named author with genuine relevant experience. A fabricated
 *  author or invented credentials is worse than none: it is deceptive, and
 *  Google treats it as a spam signal in its own right.
 *
 *  So this stays `null` until a real person's details are filled in. While it
 *  is null, articles are attributed to the organisation exactly as before —
 *  which is honest, just a weaker signal.
 *
 *  To enable it, replace `null` with a real person, e.g.:
 *
 *    export const SITE_AUTHOR: Author | null = {
 *      name: "Jane Smith",
 *      role: "Guitar teacher, 12 years",
 *      bio: "Jane has taught guitar in Colombo since 2013 and set up
 *            instruments professionally for six of them.",
 *      url: "/about",
 *    };
 *
 *  Only write things that are true. */

export interface Author {
  /** Full name of a real person. */
  name: string;
  /** URL-safe identifier, used for the author page route. */
  slug: string;
  /** Short role line shown under the name, e.g. "Guitar teacher, 12 years". */
  role: string;
  /** One or two sentences of genuine, verifiable background. */
  bio: string;
  /** Longer background for the dedicated author page. */
  longBio: string[];
  /** Topics this person writes about, for the Person schema's knowsAbout. */
  knowsAbout: string[];
  /** The dedicated author page — the byline links here. */
  url: string;
  /** Verifiable profiles elsewhere, for the Person schema's sameAs. */
  sameAs?: string[];
}

export const SITE_AUTHOR: Author | null = {
  name: "Manusha Dananjaya",
  slug: "manusha-dananjaya",
  role: "Developer & founder, GuitarTunePro",
  bio: "Manusha builds web tools and started GuitarTunePro after finding most free online tuners slow, ad-cluttered, or inaccurate. GuitarTunePro's pitch detection, tuning presets, and chord library are all custom-built and verified against equal-temperament reference frequencies rather than copied from another tool.",
  longBio: [
    "Manusha Dananjaya is a software developer and the founder of GuitarTunePro. He built the site after getting frustrated with free online tuners that were slow to lock on, cluttered with ads over the tuning display, or simply inaccurate.",
    "Every part of GuitarTunePro is built and tested in-house rather than wrapped around a third-party library. The pitch detector is a YIN-inspired autocorrelation algorithm whose measured error is published on the accuracy page. The tuning presets are derived from equal-temperament reference frequencies, and every chord voicing in the library is checked by computing the notes the fingering actually sounds and comparing them against the chord's formula.",
    "He writes the tuning and setup guides on this site, working from that engineering detail and from feedback sent in through the contact page.",
  ],
  knowsAbout: [
    "Guitar tuning",
    "Music theory",
    "Pitch detection",
    "Guitar setup and intonation",
    "Alternate tunings",
    "Web audio",
  ],
  url: "/authors/manusha-dananjaya",
};

export const ORGANISATION = {
  name: "GuitarTunePro",
  url: "https://www.guitartunepro.com",
};
