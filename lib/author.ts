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
  /** Short role line shown under the name, e.g. "Guitar teacher, 12 years". */
  role: string;
  /** One or two sentences of genuine, verifiable background. */
  bio: string;
  /** Page with more about them — typically /about. */
  url?: string;
}

export const SITE_AUTHOR: Author | null = null;

export const ORGANISATION = {
  name: "GuitarTunePro",
  url: "https://www.guitartunepro.com",
};
