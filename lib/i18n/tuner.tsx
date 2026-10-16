import type { ReactNode } from "react";

/** UI language for the tuner and tool page shells. English is the default
 *  everywhere; the translated tuner pages pass their own. */
export type Locale = "en" | "es" | "pt" | "fr" | "de";

export const LOCALES: Locale[] = ["en", "es", "pt", "fr", "de"];

/** Each language's name in that language, for the language selector. */
export const LANGUAGE_NAMES: Record<Locale, string> = {
  en: "English",
  es: "Español",
  pt: "Português",
  fr: "Français",
  de: "Deutsch",
};

/** How each language names the seven natural notes. Spanish, Portuguese and
 *  French players learn solfège; German keeps letters but calls B "H" (a
 *  German "B" is B♭), which a German player would read as a wrong note. */
const NOTE_NAMES: Record<Locale, Record<string, string>> = {
  en: { C: "C", D: "D", E: "E", F: "F", G: "G", A: "A", B: "B" },
  es: { C: "Do", D: "Re", E: "Mi", F: "Fa", G: "Sol", A: "La", B: "Si" },
  pt: { C: "Dó", D: "Ré", E: "Mi", F: "Fá", G: "Sol", A: "Lá", B: "Si" },
  fr: { C: "Do", D: "Ré", E: "Mi", F: "Fa", G: "Sol", A: "La", B: "Si" },
  de: { C: "C", D: "D", E: "E", F: "F", G: "G", A: "A", B: "H" },
};

/** Splits a note name ("F♯", "B") into its base and accidental, with the
 *  base in the local naming. */
export function noteParts(name: string, locale: Locale) {
  const letter = name.charAt(0);
  const accidental = name.slice(1);
  const base = NOTE_NAMES[locale][letter] ?? letter;
  return { base, accidental };
}

/** "F♯" → "Fa♯" in Spanish, unchanged in English. Octave numbers pass through:
 *  "E2" → "Mi2", "B3" → "H3". */
export function localNote(name: string, locale: Locale) {
  const { base, accidental } = noteParts(name, locale);
  return `${base}${accidental}`;
}

const INSTRUMENTS: Partial<Record<Locale, Record<string, string>>> = {
  es: {
    sixString: "Guitarra de 6 cuerdas",
    sevenString: "Guitarra de 7 cuerdas",
    twelveString: "Guitarra de 12 cuerdas",
    bass: "Bajo eléctrico",
    fiveStringBass: "Bajo de 5 cuerdas",
    ukulele: "Ukelele",
    baritoneUkulele: "Ukelele barítono",
    mandolin: "Mandolina",
    banjo: "Banjo de 5 cuerdas",
    violin: "Violín",
    viola: "Viola",
    cello: "Violonchelo",
  },
  pt: {
    sixString: "Violão / guitarra de 6 cordas",
    sevenString: "Guitarra de 7 cordas",
    twelveString: "Violão de 12 cordas",
    bass: "Baixo",
    fiveStringBass: "Baixo de 5 cordas",
    ukulele: "Ukulele",
    baritoneUkulele: "Ukulele barítono",
    mandolin: "Bandolim",
    banjo: "Banjo de 5 cordas",
    violin: "Violino",
    viola: "Viola de arco",
    cello: "Violoncelo",
  },
  fr: {
    sixString: "Guitare 6 cordes",
    sevenString: "Guitare 7 cordes",
    twelveString: "Guitare 12 cordes",
    bass: "Basse",
    fiveStringBass: "Basse 5 cordes",
    ukulele: "Ukulélé",
    baritoneUkulele: "Ukulélé baryton",
    mandolin: "Mandoline",
    banjo: "Banjo 5 cordes",
    violin: "Violon",
    viola: "Alto",
    cello: "Violoncelle",
  },
  de: {
    sixString: "6-saitige Gitarre",
    sevenString: "7-saitige Gitarre",
    twelveString: "12-saitige Gitarre",
    bass: "E-Bass",
    fiveStringBass: "5-Saiter-Bass",
    ukulele: "Ukulele",
    baritoneUkulele: "Bariton-Ukulele",
    mandolin: "Mandoline",
    banjo: "5-saitiges Banjo",
    violin: "Geige",
    viola: "Bratsche",
    cello: "Cello",
  },
};

/** Drop D, DADGAD and the like keep their English names in every language —
 *  that is what guitarists call them everywhere. */
const PRESETS: Partial<Record<Locale, Record<string, string>>> = {
  es: {
    standard: "Estándar",
    halfStepDown: "Medio tono abajo",
    fullStepDown: "Un tono abajo",
    openG: "Sol abierto",
    openD: "Re abierto",
    openA: "La abierto",
    openE: "Mi abierto",
    openC: "Do abierto",
  },
  pt: {
    standard: "Padrão",
    halfStepDown: "Meio tom abaixo",
    fullStepDown: "Um tom abaixo",
    openG: "Sol aberto",
    openD: "Ré aberto",
    openA: "Lá aberto",
    openE: "Mi aberto",
    openC: "Dó aberto",
  },
  fr: {
    standard: "Standard",
    halfStepDown: "Un demi-ton plus bas",
    fullStepDown: "Un ton plus bas",
  },
  de: {
    standard: "Standard",
    halfStepDown: "Halbton tiefer",
    fullStepDown: "Ganzton tiefer",
  },
};

/** A decimal in the local convention: a point in English and Spanish (the
 *  RAE recommends it), a comma in Portuguese, French and German. */
export function localDecimal(value: number, digits: number, locale: Locale) {
  const fixed = value.toFixed(digits);
  return locale === "pt" || locale === "fr" || locale === "de"
    ? fixed.replace(".", ",")
    : fixed;
}

export function instrumentName(key: string, englishName: string, locale: Locale) {
  return INSTRUMENTS[locale]?.[key] ?? englishName;
}

export function presetName(key: string, englishName: string, locale: Locale) {
  return PRESETS[locale]?.[key] ?? englishName;
}

export interface TunerText {
  monitoring: string;
  standby: string;
  autoSelect: string;
  autoSelectHint: string;
  autoSelectAria: string;
  start: string;
  stop: string;
  actionRequired: string;
  actionIdle: string;
  actionInTune: string;
  actionLow: string;
  actionHigh: string;
  pegOffset: string;
  perfect: string;
  tighten: string;
  loosen: string;
  offsetLabel: string;
  sessionProgress: (done: number, total: number) => string;
  stringsTuned: string;
  allTuned: (count: number) => string;
  practiceRoutine: string;
  metronome: string;
  strumming: string;
  scales: string;
  backingLoop: string;
  playOverLoop: string;
  earTraining: string;
  visualPegs: string;
  stringSelector: string;
  fretboardTitle: string;
  fretboardHint: string;
  headstockTitle: string;
  headstockHint: string;
  selectString: (number: number, note: string) => string;
  instrument: string;
  tuningPreset: string;
  strings: (count: number) => string;
  standardOnly: string;
  frequency: string;
  offset: string;
  target: string;
  readyToTune: (note: string) => string;
  idle: string;
  flat: string;
  sharp: string;
  guidelinesTitle: string;
  guidelines: ReactNode[];
  playNote: (note: string) => string;
  referencePitch: string;
  referenceHint: string;
  lower: string;
  higher: string;
  reference: (a4: number) => string;
}

export const TUNER_TEXT: Record<Locale, TunerText> = {
  en: {
    monitoring: "Monitoring",
    standby: "Standby",
    autoSelect: "Auto-select string",
    autoSelectHint: "Switches to string automatically",
    autoSelectAria: "Toggle automatic played string selection",
    start: "Start Recording",
    stop: "Stop Recording",
    actionRequired: "Action Required",
    actionIdle: "Start tuner and pluck highlighted note.",
    actionInTune: "In tune. No turn needed.",
    actionLow: "Pitch is low. Tighten peg.",
    actionHigh: "Pitch is high. Loosen peg.",
    pegOffset: "Peg Rotation & Offset",
    perfect: "Perfect",
    tighten: "↻ Tighten peg",
    loosen: "↺ Loosen peg",
    offsetLabel: "OFFSET",
    sessionProgress: (done, total) => `In tune this session · ${done}/${total}`,
    stringsTuned: "Strings tuned",
    allTuned: (count) => `All ${count} strings in tune. Now play something:`,
    practiceRoutine: "Today’s practice routine",
    metronome: "Practise with the metronome",
    strumming: "Strumming patterns",
    scales: "Scale explorer",
    backingLoop: "Jam over a backing loop",
    playOverLoop: "Play over a backing loop",
    earTraining: "Ear training",
    visualPegs: "Visual Pegs",
    stringSelector: "String Selector",
    fretboardTitle: "Fretboard Strings",
    fretboardHint: "Interactive layout for manual note selection.",
    headstockTitle: "Headstock Alignment",
    headstockHint: "Tap a peg to tune that string specifically.",
    selectString: (number, note) => `Select string ${number} (${note})`,
    instrument: "Instrument",
    tuningPreset: "Tuning Preset",
    strings: (count) => `${count} strings`,
    standardOnly: "This instrument currently uses standard tuning.",
    frequency: "Frequency",
    offset: "Offset",
    target: "Target",
    readyToTune: (note) => `Ready to tune ${note}`,
    idle: "Tuner idle",
    flat: "FLAT",
    sharp: "SHARP",
    playNote: (note) => `Play ${note}`,
    referencePitch: "Reference Pitch",
    referenceHint:
      "Concert pitch for A4. 440 is the standard; many orchestras use 442.",
    lower: "Lower reference pitch",
    higher: "Raise reference pitch",
    reference: (a4) => `A4 = ${a4} Hz`,
    guidelinesTitle: "Quick Tuning Guidelines",
    guidelines: [
      <>
        Tap the <span className="font-semibold text-ink">Start Recording</span>{" "}
        button at the top to initialize your microphone.
      </>,
      <>
        Pluck one string cleanly at a time. Let it vibrate naturally to get a
        continuous frequency reading.
      </>,
      <>
        Adjust your tuning pegs until the dial centers in the{" "}
        <span className="font-semibold text-in-tune">green zone</span> (around
        0 cents).
      </>,
      <>
        Watch indicators: <span className="text-brass font-semibold">amber</span>{" "}
        is the currently selected note,{" "}
        <span className="text-in-tune font-semibold">green</span> is the
        automatically detected audio feed.
      </>,
    ],
  },
  es: {
    monitoring: "Escuchando",
    standby: "En espera",
    autoSelect: "Detectar cuerda",
    autoSelectHint: "Cambia de cuerda automáticamente",
    autoSelectAria: "Activar o desactivar la detección automática de cuerda",
    start: "Activar micrófono",
    stop: "Detener micrófono",
    actionRequired: "Qué hacer",
    actionIdle: "Activa el afinador y toca la nota resaltada.",
    actionInTune: "Afinada. No hace falta girar.",
    actionLow: "Está baja. Tensa la clavija.",
    actionHigh: "Está alta. Afloja la clavija.",
    pegOffset: "Clavija y desviación",
    perfect: "Perfecto",
    tighten: "↻ Tensar clavija",
    loosen: "↺ Aflojar clavija",
    offsetLabel: "DESVIACIÓN",
    sessionProgress: (done, total) =>
      `Afinadas en esta sesión · ${done}/${total}`,
    stringsTuned: "Cuerdas afinadas",
    allTuned: (count) =>
      `Las ${count} cuerdas están afinadas. Ahora, a tocar:`,
    practiceRoutine: "Rutina de práctica de hoy",
    metronome: "Practica con el metrónomo",
    strumming: "Ritmos de rasgueo",
    scales: "Explorador de escalas",
    backingLoop: "Improvisa sobre una base",
    playOverLoop: "Toca sobre una base",
    earTraining: "Entrenamiento auditivo",
    visualPegs: "Clavijas",
    stringSelector: "Cuerdas",
    fretboardTitle: "Cuerdas",
    fretboardHint: "Elige una cuerda manualmente.",
    headstockTitle: "Clavijero",
    headstockHint: "Toca una clavija para afinar esa cuerda.",
    selectString: (number, note) => `Seleccionar cuerda ${number} (${note})`,
    instrument: "Instrumento",
    tuningPreset: "Afinación",
    strings: (count) => `${count} cuerdas`,
    standardOnly: "Este instrumento usa la afinación estándar.",
    frequency: "Frecuencia",
    offset: "Desviación",
    target: "Objetivo",
    readyToTune: (note) => `Listo para afinar ${note}`,
    idle: "Afinador en espera",
    flat: "BAJO",
    sharp: "ALTO",
    playNote: (note) => `Escuchar ${note}`,
    referencePitch: "Diapasón",
    referenceHint:
      "Frecuencia del La4. El estándar es 440; muchas orquestas usan 442.",
    lower: "Bajar el diapasón",
    higher: "Subir el diapasón",
    reference: (a4) => `La4 = ${a4} Hz`,
    guidelinesTitle: "Consejos rápidos",
    guidelines: [
      <>
        Pulsa{" "}
        <span className="font-semibold text-ink">Activar micrófono</span>{" "}
        arriba y permite el acceso al micrófono.
      </>,
      <>
        Toca una sola cuerda cada vez, con limpieza, y déjala vibrar para
        obtener una lectura estable.
      </>,
      <>
        Gira la clavija hasta que la aguja quede en la{" "}
        <span className="font-semibold text-in-tune">zona verde</span>{" "}
        (alrededor de 0 cents).
      </>,
      <>
        Colores: <span className="text-brass font-semibold">ámbar</span> es la
        cuerda seleccionada y{" "}
        <span className="text-in-tune font-semibold">verde</span> la que el
        afinador detecta en el audio.
      </>,
    ],
  },
  pt: {
    monitoring: "Ouvindo",
    standby: "Em espera",
    autoSelect: "Detectar corda",
    autoSelectHint: "Troca de corda automaticamente",
    autoSelectAria: "Ativar ou desativar a detecção automática de corda",
    start: "Ativar microfone",
    stop: "Parar microfone",
    actionRequired: "O que fazer",
    actionIdle: "Ative o afinador e toque a nota destacada.",
    actionInTune: "Afinada. Não precisa girar.",
    actionLow: "Está baixa. Aperte a tarraxa.",
    actionHigh: "Está alta. Afrouxe a tarraxa.",
    pegOffset: "Tarraxa e desvio",
    perfect: "Perfeito",
    tighten: "↻ Apertar tarraxa",
    loosen: "↺ Afrouxar tarraxa",
    offsetLabel: "DESVIO",
    sessionProgress: (done, total) => `Afinadas nesta sessão · ${done}/${total}`,
    stringsTuned: "Cordas afinadas",
    allTuned: (count) => `As ${count} cordas estão afinadas. Agora é tocar:`,
    practiceRoutine: "Rotina de estudo de hoje",
    metronome: "Pratique com o metrônomo",
    strumming: "Ritmos de batida",
    scales: "Explorador de escalas",
    backingLoop: "Improvise sobre uma base",
    playOverLoop: "Toque sobre uma base",
    earTraining: "Treino de ouvido",
    visualPegs: "Tarraxas",
    stringSelector: "Cordas",
    fretboardTitle: "Cordas",
    fretboardHint: "Escolha uma corda manualmente.",
    headstockTitle: "Tarraxas",
    headstockHint: "Toque numa tarraxa para afinar essa corda.",
    selectString: (number, note) => `Selecionar corda ${number} (${note})`,
    instrument: "Instrumento",
    tuningPreset: "Afinação",
    strings: (count) => `${count} cordas`,
    standardOnly: "Este instrumento usa a afinação padrão.",
    frequency: "Frequência",
    offset: "Desvio",
    target: "Alvo",
    readyToTune: (note) => `Pronto para afinar ${note}`,
    idle: "Afinador em espera",
    flat: "BAIXO",
    sharp: "ALTO",
    guidelinesTitle: "Dicas rápidas",
    guidelines: [
      <>
        Toque em{" "}
        <span className="font-semibold text-ink">Ativar microfone</span> lá em
        cima e permita o acesso ao microfone.
      </>,
      <>
        Toque uma corda de cada vez, com clareza, e deixe soar para a leitura
        ficar estável.
      </>,
      <>
        Gire a tarraxa até o ponteiro parar na{" "}
        <span className="font-semibold text-in-tune">zona verde</span> (perto
        de 0 cents).
      </>,
      <>
        Cores: <span className="text-brass font-semibold">âmbar</span> é a
        corda selecionada e{" "}
        <span className="text-in-tune font-semibold">verde</span> é a que o
        afinador detecta no áudio.
      </>,
    ],
    playNote: (note) => `Ouvir ${note}`,
    referencePitch: "Diapasão",
    referenceHint:
      "Frequência do Lá4. O padrão é 440; muitas orquestras usam 442.",
    lower: "Baixar o diapasão",
    higher: "Subir o diapasão",
    reference: (a4) => `Lá4 = ${a4} Hz`,
  },
  fr: {
    monitoring: "Écoute",
    standby: "En attente",
    autoSelect: "Détection de corde",
    autoSelectHint: "Change de corde automatiquement",
    autoSelectAria: "Activer ou désactiver la détection automatique de la corde",
    start: "Activer le micro",
    stop: "Arrêter le micro",
    actionRequired: "À faire",
    actionIdle: "Lancez l’accordeur et jouez la note en surbrillance.",
    actionInTune: "Juste. Rien à tourner.",
    actionLow: "Trop bas. Tendez la corde.",
    actionHigh: "Trop haut. Détendez la corde.",
    pegOffset: "Mécanique et écart",
    perfect: "Parfait",
    tighten: "↻ Tendre la corde",
    loosen: "↺ Détendre la corde",
    offsetLabel: "ÉCART",
    sessionProgress: (done, total) =>
      `Accordées pendant cette session · ${done}/${total}`,
    stringsTuned: "Cordes accordées",
    allTuned: (count) => `Les ${count} cordes sont accordées. À vous de jouer  :`,
    practiceRoutine: "Routine d’entraînement du jour",
    metronome: "S’entraîner avec le métronome",
    strumming: "Rythmiques",
    scales: "Explorateur de gammes",
    backingLoop: "Improviser sur une boucle",
    playOverLoop: "Jouer sur une boucle",
    earTraining: "Entraînement de l’oreille",
    visualPegs: "Mécaniques",
    stringSelector: "Cordes",
    fretboardTitle: "Cordes",
    fretboardHint: "Choisissez une corde manuellement.",
    headstockTitle: "Tête de manche",
    headstockHint: "Touchez une mécanique pour accorder cette corde.",
    selectString: (number, note) => `Choisir la corde ${number} (${note})`,
    instrument: "Instrument",
    tuningPreset: "Accordage",
    strings: (count) => `${count} cordes`,
    standardOnly: "Cet instrument utilise l’accordage standard.",
    frequency: "Fréquence",
    offset: "Écart",
    target: "Cible",
    readyToTune: (note) => `Prêt à accorder ${note}`,
    idle: "Accordeur en attente",
    flat: "BAS",
    sharp: "HAUT",
    guidelinesTitle: "Conseils rapides",
    guidelines: [
      <>
        Appuyez sur{" "}
        <span className="font-semibold text-ink">Activer le micro</span> en
        haut et autorisez l’accès au microphone.
      </>,
      <>
        Jouez une seule corde à la fois, proprement, et laissez-la sonner pour
        obtenir une lecture stable.
      </>,
      <>
        Tournez la mécanique jusqu’à ce que l’aiguille s’arrête dans la{" "}
        <span className="font-semibold text-in-tune">zone verte</span> (autour
        de 0 cent).
      </>,
      <>
        Couleurs  : <span className="text-brass font-semibold">ambre</span> pour
        la corde sélectionnée,{" "}
        <span className="text-in-tune font-semibold">vert</span> pour celle que
        l’accordeur détecte.
      </>,
    ],
    playNote: (note) => `Écouter ${note}`,
    referencePitch: "Diapason",
    referenceHint:
      "Fréquence du La4. La norme est 440 ; beaucoup d’orchestres utilisent 442.",
    lower: "Baisser le diapason",
    higher: "Monter le diapason",
    reference: (a4) => `La4 = ${a4} Hz`,
  },
  de: {
    monitoring: "Hört zu",
    standby: "Bereit",
    autoSelect: "Saite erkennen",
    autoSelectHint: "Wechselt die Saite automatisch",
    autoSelectAria: "Automatische Saitenerkennung ein- oder ausschalten",
    start: "Mikrofon starten",
    stop: "Mikrofon stoppen",
    actionRequired: "Was zu tun ist",
    actionIdle: "Stimmgerät starten und die markierte Saite anschlagen.",
    actionInTune: "Gestimmt. Nichts mehr drehen.",
    actionLow: "Zu tief. Saite spannen.",
    actionHigh: "Zu hoch. Saite lockern.",
    pegOffset: "Mechanik und Abweichung",
    perfect: "Perfekt",
    tighten: "↻ Saite spannen",
    loosen: "↺ Saite lockern",
    offsetLabel: "ABWEICHUNG",
    sessionProgress: (done, total) =>
      `In dieser Sitzung gestimmt · ${done}/${total}`,
    stringsTuned: "Gestimmte Saiten",
    allTuned: (count) => `Alle ${count} Saiten sind gestimmt. Jetzt wird gespielt:`,
    practiceRoutine: "Heutige Übungsroutine",
    metronome: "Mit dem Metronom üben",
    strumming: "Schlagmuster",
    scales: "Tonleiter-Explorer",
    backingLoop: "Über einen Loop improvisieren",
    playOverLoop: "Über einen Loop spielen",
    earTraining: "Gehörbildung",
    visualPegs: "Mechaniken",
    stringSelector: "Saiten",
    fretboardTitle: "Saiten",
    fretboardHint: "Saite manuell auswählen.",
    headstockTitle: "Kopfplatte",
    headstockHint: "Tippe auf eine Mechanik, um diese Saite zu stimmen.",
    selectString: (number, note) => `Saite ${number} wählen (${note})`,
    instrument: "Instrument",
    tuningPreset: "Stimmung",
    strings: (count) => `${count} Saiten`,
    standardOnly: "Dieses Instrument nutzt die Standardstimmung.",
    frequency: "Frequenz",
    offset: "Abweichung",
    target: "Ziel",
    readyToTune: (note) => `Bereit zum Stimmen: ${note}`,
    idle: "Stimmgerät bereit",
    flat: "TIEF",
    sharp: "HOCH",
    guidelinesTitle: "Kurztipps",
    guidelines: [
      <>
        Tippe oben auf{" "}
        <span className="font-semibold text-ink">Mikrofon starten</span> und
        erlaube den Zugriff aufs Mikrofon.
      </>,
      <>
        Schlage immer nur eine Saite sauber an und lass sie ausklingen, damit
        die Anzeige ruhig wird.
      </>,
      <>
        Dreh an der Mechanik, bis die Nadel im{" "}
        <span className="font-semibold text-in-tune">grünen Bereich</span>{" "}
        steht (um 0 Cent).
      </>,
      <>
        Farben: <span className="text-brass font-semibold">Bernstein</span> ist
        die ausgewählte Saite,{" "}
        <span className="text-in-tune font-semibold">Grün</span> die, die das
        Stimmgerät gerade hört.
      </>,
    ],
    playNote: (note) => `${note} anhören`,
    referencePitch: "Kammerton",
    referenceHint:
      "Frequenz des A4. Standard ist 440; viele Orchester stimmen auf 442 oder 443.",
    lower: "Kammerton senken",
    higher: "Kammerton erhöhen",
    reference: (a4) => `A4 = ${a4} Hz`,
  },
};
