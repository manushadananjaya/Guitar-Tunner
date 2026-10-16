import type { ReactNode } from "react";

/** UI language for the tuner and tool page shells. English is the default
 *  everywhere; only the /es pages pass "es". */
export type Locale = "en" | "es";

const SOLFEGE: Record<string, string> = {
  C: "Do",
  D: "Re",
  E: "Mi",
  F: "Fa",
  G: "Sol",
  A: "La",
  B: "Si",
};

/** Splits a note name ("F♯", "B") into its base and accidental, translating
 *  the base to solfège for Spanish — most Spanish-speaking players learn
 *  Do Re Mi rather than letter names. */
export function noteParts(name: string, locale: Locale) {
  const letter = name.charAt(0);
  const accidental = name.slice(1);
  const base = locale === "es" ? (SOLFEGE[letter] ?? letter) : letter;
  return { base, accidental };
}

/** "F♯" → "Fa♯" in Spanish, unchanged in English. Octave numbers pass through:
 *  "E2" → "Mi2". */
export function localNote(name: string, locale: Locale) {
  const { base, accidental } = noteParts(name, locale);
  return `${base}${accidental}`;
}

const ES_INSTRUMENTS: Record<string, string> = {
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
};

const ES_PRESETS: Record<string, string> = {
  standard: "Estándar",
  halfStepDown: "Medio tono abajo",
  fullStepDown: "Un tono abajo",
  openG: "Sol abierto",
  openD: "Re abierto",
  openA: "La abierto",
  openE: "Mi abierto",
  openC: "Do abierto",
};

export function instrumentName(key: string, englishName: string, locale: Locale) {
  return locale === "es" ? (ES_INSTRUMENTS[key] ?? englishName) : englishName;
}

/** Drop D, DADGAD and the like keep their English names — that is what
 *  Spanish-speaking guitarists call them too. */
export function presetName(key: string, englishName: string, locale: Locale) {
  return locale === "es" ? (ES_PRESETS[key] ?? englishName) : englishName;
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
};
