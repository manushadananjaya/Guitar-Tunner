/** Per-language text shared by every translated tuner page: the generated
 *  "how to use" steps and small labels. Page-specific prose lives in
 *  lib/i18n/content/<lang>.ts. */

import { localDecimal, type Locale } from "@/lib/i18n/tuner";

/** "82.41" or "82,41", per local convention. */
export function formatHz(value: number, locale: Locale) {
  return localDecimal(value, 2, locale);
}

export interface StepText {
  heading: string;
  start: (button: string) => string;
  configured: (name: string) => string;
  first: (string: number, note: string, hz: string) => string;
  rest: (list: string) => string;
  again: string;
  alsoAvailable: string;
  /** Open Graph locale. */
  ogLocale: string;
}

const NB = " ";

export const STEP_TEXT: Record<Exclude<Locale, "en">, StepText> = {
  es: {
    heading: "Cómo usar este afinador",
    start: (b) =>
      `Pulsa **${b}** en el afinador de arriba y permite el acceso al micrófono.`,
    configured: (n) => `El afinador ya está configurado: **${n}**.`,
    first: (s, n, hz) =>
      `Toca la cuerda ${s} (${n}, ${hz}${NB}Hz) y gira la clavija hasta que la aguja quede en 0 cents.`,
    rest: (l) => `Sigue con el resto: ${l}.`,
    again:
      "Haz una segunda pasada: al tensar unas cuerdas, el instrumento cede un poco y las primeras que afinaste se mueven.",
    alsoAvailable: "Más afinadores",
    ogLocale: "es_ES",
  },
  pt: {
    heading: "Como usar este afinador",
    start: (b) =>
      `Toque em **${b}** no afinador acima e permita o acesso ao microfone.`,
    configured: (n) => `O afinador já está configurado: **${n}**.`,
    first: (s, n, hz) =>
      `Toque a corda ${s} (${n}, ${hz}${NB}Hz) e gire a tarraxa até o ponteiro ficar em 0 cents.`,
    rest: (l) => `Continue com as outras: ${l}.`,
    again:
      "Faça uma segunda passada: ao apertar umas cordas, o instrumento cede um pouco e as primeiras que você afinou se mexem.",
    alsoAvailable: "Mais afinadores",
    ogLocale: "pt_BR",
  },
  fr: {
    heading: "Comment utiliser cet accordeur",
    start: (b) =>
      `Appuyez sur **${b}** dans l’accordeur ci-dessus et autorisez l’accès au microphone.`,
    configured: (n) => `L’accordeur est déjà réglé${NB}: **${n}**.`,
    first: (s, n, hz) =>
      `Jouez la corde ${s} (${n}, ${hz}${NB}Hz) et tournez la mécanique jusqu’à ce que l’aiguille indique 0${NB}cent.`,
    rest: (l) => `Continuez avec les autres${NB}: ${l}.`,
    again: `Faites un second passage${NB}: en tendant certaines cordes, l’instrument cède légèrement et les premières cordes accordées bougent un peu.`,
    alsoAvailable: "Autres accordeurs",
    ogLocale: "fr_FR",
  },
  de: {
    heading: "So benutzt du dieses Stimmgerät",
    start: (b) =>
      `Tippe oben im Stimmgerät auf **${b}** und erlaube den Zugriff aufs Mikrofon.`,
    configured: (n) => `Das Stimmgerät ist bereits eingestellt: **${n}**.`,
    first: (s, n, hz) =>
      `Schlage Saite ${s} an (${n}, ${hz}${NB}Hz) und dreh an der Mechanik, bis die Nadel auf 0${NB}Cent steht.`,
    rest: (l) => `Weiter mit den übrigen Saiten: ${l}.`,
    again:
      "Mach einen zweiten Durchgang: Wenn du Saiten spannst, gibt das Instrument etwas nach und die ersten Saiten verstimmen sich leicht.",
    alsoAvailable: "Weitere Stimmgeräte",
    ogLocale: "de_DE",
  },
};
