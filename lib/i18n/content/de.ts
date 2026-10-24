import type { LanguageContent } from "./types";

/** German: letter note names with H for B natural (a German "B" is B♭),
 *  decimal comma, informal "du" as is usual for music sites. */
export const de: LanguageContent = {
  labels: {
    "/": "Gitarre stimmen",
    "/drop-d-tuner": "Drop-D-Stimmung",
    "/drop-c-tuner": "Drop-C-Stimmung",
    "/drop-c-sharp-tuner": "Drop-Cis-Stimmung",
    "/drop-b-tuner": "Drop-H-Stimmung",
    "/dadgad-tuner": "DADGAD-Stimmung",
    "/open-g-tuner": "Open-G-Stimmung",
    "/open-d-tuner": "Open-D-Stimmung",
    "/open-e-tuner": "Open-E-Stimmung",
    "/open-c-tuner": "Open-C-Stimmung",
    "/open-a-tuner": "Open-A-Stimmung",
    "/half-step-down-tuner": "Halbton tiefer stimmen",
    "/full-step-down-tuner": "Ganzton tiefer stimmen",
    "/432-hz-tuner": "Stimmgerät 432 Hz",
    "/bass-tuner": "Bass stimmen",
    "/5-string-bass-tuner": "5-Saiter-Bass stimmen",
    "/ukulele-tuner": "Ukulele stimmen",
    "/baritone-ukulele-tuner": "Bariton-Ukulele stimmen",
    "/7-string-guitar-tuner": "7-saitige Gitarre stimmen",
    "/12-string-guitar-tuner": "12-saitige Gitarre stimmen",
    "/mandolin-tuner": "Mandoline stimmen",
    "/banjo-tuner": "Banjo stimmen",
    "/violin-tuner": "Geige stimmen",
    "/viola-tuner": "Bratsche stimmen",
    "/cello-tuner": "Cello stimmen",
  },
  pages: {
    "/": {
      metaTitle: "Gitarre stimmen – Online-Stimmgerät gratis",
      metaDescription:
        "Kostenloses Online-Stimmgerät für Gitarre. Stimme per Mikrofon direkt hier: Standardstimmung, Drop D, Halbton tiefer und mehr. Ohne Download.",
      title: "Gitarre stimmen",
      intro:
        "Stimme deine Gitarre per Mikrofon, direkt auf dieser Seite. Tippe auf Mikrofon starten und schlage eine Saite an: Das Stimmgerät erkennt die Saite und zeigt dir, in welche Richtung du drehen musst.",
      sections: [
        {
          heading: "E A D G H E – warum H und nicht B?",
          body: [
            "Die Standardstimmung der Gitarre heißt im Deutschen **E A D G H E**. Im englischsprachigen Raum steht dort ein B – aber ein deutsches B ist ein **B♭**, einen Halbton tiefer. Dieses Stimmgerät zeigt deshalb H an, damit du nicht versehentlich die zweite Saite falsch stimmst.",
            "Die Zahl hinter dem Ton in der Tabelle (E2, A2 …) gibt die Oktave an: Das tiefe E der sechsten Saite ist E2, das hohe E der ersten Saite E4 – zwei Oktaven höher.",
          ],
        },
        {
          heading: "In welche Richtung drehen?",
          body: [
            "Saite spannen macht den Ton höher, lockern macht ihn tiefer. Je nach Seite der Kopfplatte heißt das, die Mechanik in die eine oder andere Richtung zu drehen – prüf die Nadel nach einer kleinen Drehung.",
            "Tipp vom Gitarrenbauer: **Stimme immer von unten an den Ton heran.** Ist die Saite zu hoch, lass sie etwas unter den Ton und dreh dann wieder hoch bis 0 Cent. So bleibt das Getriebe in die richtige Richtung gespannt und die Stimmung hält länger.",
          ],
        },
        {
          heading: "Häufige Probleme",
          body: [
            "**Die Nadel springt hin und her.** Meist Hintergrundgeräusche oder mehrere klingende Saiten. Schlage nur eine Saite an, dämpfe die anderen und geh näher ans Mikrofon.",
            "**Alle Saiten stehen auf 0, aber Akkorde klingen schief.** Dann stimmt eventuell die Oktavreinheit nicht: Vergleiche die leere Saite mit dem 12. Bund. Ist der Ton dort nicht genau eine Oktave höher, braucht die Gitarre eine Einstellung.",
          ],
        },
      ],
      faqs: [
        {
          question: "Wie heißen die Saiten der Gitarre in Standardstimmung?",
          answer:
            "Von der sechsten (dicksten) zur ersten (dünnsten) Saite: E, A, D, G, H, E. Die Frequenzen sind 82,41; 110,00; 146,83; 196,00; 246,94 und 329,63 Hz.",
        },
        {
          question: "Ist das Stimmgerät kostenlos? Muss ich etwas installieren?",
          answer:
            "Es ist komplett kostenlos und läuft im Browser, auf dem Handy wie am Computer. Du musst nur den Mikrofonzugriff erlauben. Der Ton wird auf deinem Gerät ausgewertet und an keinen Server geschickt.",
        },
        {
          question: "Funktioniert es für Konzert-, Western- und E-Gitarre?",
          answer:
            "Ja, alle drei nutzen dieselbe Standardstimmung. Bei der E-Gitarre stimmst du am besten mit ausgeschaltetem oder leisem Verstärker, nah am Mikrofon des Geräts.",
        },
        {
          question: "Was sind Cent?",
          answer:
            "Ein Cent ist ein Hundertstel Halbton. Zeigt die Nadel −20, ist die Saite 20 Cent zu tief: spannen. Bei +20 ist sie zu hoch: lockern. Zwischen −5 und +5 gilt die Saite als gestimmt.",
        },
      ],
    },
    "/drop-d-tuner": {
      metaTitle: "Drop-D-Stimmung – Stimmgerät online",
      metaDescription:
        "Stimme deine Gitarre in Drop D (D A D G H E) per Mikrofon. Nur die sechste Saite ändert sich. Kostenlos und ohne Download.",
      title: "Drop-D-Stimmung",
      intro:
        "Stimme in Drop D per Mikrofon: Das Stimmgerät ist bereits auf D A D G H E eingestellt. Du musst nur die sechste Saite einen Ganzton tiefer stimmen.",
      sections: [
        {
          heading: "Was ist Drop D?",
          body: [
            "Drop D ist die Standardstimmung mit **der tiefen E-Saite einen Ganzton tiefer** auf D. Die anderen fünf Saiten bleiben gleich. Es ist die meistgenutzte alternative Stimmung, weil man sie in Sekunden ein- und wieder ausstellt.",
            "Mit der sechsten Saite auf D bilden die drei tiefen Leersaiten einen D-Powerchord, und jeder Powerchord lässt sich **mit einem Finger** greifen, indem du die drei tiefen Saiten im selben Bund barrierst. Deshalb ist Drop D aus Rock, Grunge und Metal nicht wegzudenken.",
          ],
        },
        {
          heading: "Nach Gehör prüfen",
          body: [
            "Spiele das Flageolett im 12. Bund der sechsten Saite und vergleiche es mit der leeren D-Saite: Beide sind ein D und sollten ohne Schwebung gleich klingen.",
            "Zurück zur Standardstimmung: Stimme die sechste Saite wieder auf E (82,41 Hz).",
          ],
        },
      ],
      faqs: [
        {
          question: "Brauche ich für Drop D neue Saiten?",
          answer:
            "Nein. Eine einzige Saite einen Ganzton tiefer bleibt im normalen Spannungsbereich. Schnarrt sie, hilft eine etwas dickere tiefe E-Saite.",
        },
        {
          question: "Ändern sich die Akkorde in Drop D?",
          answer:
            "Nur die, bei denen du die sechste Saite spielst. Alles auf den fünf hohen Saiten bleibt gleich.",
        },
        {
          question: "Was ist der Unterschied zu Drop C?",
          answer:
            "Drop C ist dasselbe Muster einen Ganzton tiefer: C G C F A D. Klingt schwerer und braucht meist dickere Saiten.",
        },
      ],
    },
    "/drop-c-tuner": {
      metaTitle: "Drop-C-Stimmung – Stimmgerät online",
      metaDescription:
        "Stimme deine Gitarre in Drop C (C G C F A D) per Mikrofon. Kostenloses Online-Stimmgerät mit der genauen Frequenz jeder Saite.",
      title: "Drop-C-Stimmung",
      intro:
        "Stimme in Drop C per Mikrofon: Das Stimmgerät ist bereits auf C G C F A D eingestellt. Saite anschlagen und der Nadel folgen.",
      sections: [
        {
          heading: "Was ist Drop C?",
          body: [
            "Drop C ist Drop D einen Ganzton tiefer: **Alle Saiten gehen einen Ganzton runter**, die sechste **noch einen weiteren** bis auf C (65,41 Hz). Die Intervalle zwischen den Saiten entsprechen Drop D – alle Drop-D-Griffe funktionieren, nur einen Ganzton tiefer.",
            "Die typische Stimmung für Metalcore und modernen Hardcore.",
          ],
        },
        {
          heading: "Saiten und Einstellung",
          body: [
            "Sechs Saiten einen Ganzton tiefer bedeuten deutlich weniger Spannung. Mit einem normalen 10er-Satz wird die tiefe Saite schlabberig und schnarrt. Üblich sind **11–56 oder 12–56**.",
            {
              list: [
                "Nach dem Saitenwechsel die **Halskrümmung** prüfen: Weniger Zug macht den Hals gerader.",
                "Die **Oktavreinheit** kontrollieren (12. Bund gegen Leersaite).",
                "Bei einem schwebenden Tremolo die Federn nachstellen.",
              ],
            },
          ],
        },
      ],
      faqs: [
        {
          question: "Geht Drop C mit normalen Saiten?",
          answer:
            "Ja, aber die tiefe Saite wird locker, schnarrt und verstimmt sich bei hartem Anschlag. Für regelmäßiges Spielen lohnt sich ein dickerer Satz.",
        },
        {
          question: "Ist Drop C dasselbe wie C-Stimmung?",
          answer:
            "Nein. C-Standard (C F B Es G C) stimmt alle Saiten zwei Ganztöne tiefer. In Drop C landet nur die sechste Saite auf C.",
        },
        {
          question: "Warum braucht das Stimmgerät bei der tiefen Saite länger?",
          answer:
            "Das tiefe C schwingt mit 65,41 Hz – am unteren Rand dessen, was Handymikrofone gut aufnehmen. Kräftig anschlagen, Handy näher ran, andere Saiten dämpfen.",
        },
      ],
    },
    "/drop-c-sharp-tuner": {
      metaTitle: "Drop-Cis-Stimmung – Stimmgerät online",
      metaDescription: "Stimme deine Gitarre in Drop Cis (Cis Gis Cis Fis Ais Dis), auch Drop Des oder Drop C# genannt, per Mikrofon. Kostenlos, mit genauen Frequenzen.",
      title: "Drop-Cis-Stimmung",
      intro: "Stimme in Drop Cis per Mikrofon: Das Stimmgerät ist bereits auf Cis Gis Cis Fis Ais Dis eingestellt. Saite anschlagen und der Nadel folgen.",
      sections: [
        {
          heading: "Was ist Drop Cis?",
          body: [
            "Drop Cis ist **Drop D einen Halbton tiefer**. Alle Saiten liegen einen Halbton unter Drop D, die Intervalle bleiben gleich – jeder Drop-D-Riff und jeder Powerchord funktioniert unverändert. Man schreibt es auch Drop Des; gemeint sind dieselben Töne. In englischen Tabs heißt es Drop C#.",
            "Von der Halbton-tiefer-Stimmung (Es As Des Ges B Es) aus musst du **nur die sechste Saite einen Ganzton tiefer** stimmen, auf Cis (69,30 Hz). Deshalb ist Drop Cis die naheliegende Drop-Stimmung für Bands, die ohnehin in Es spielen.",
          ],
        },
        {
          heading: "Saiten",
          body: [
            "Die fünf hohen Saiten gehen nur einen Halbton runter und behalten rund **89 % ihrer Spannung**; die tiefe Saite fällt um drei Halbtöne und behält etwa **71 %**. Ein 10er-Satz geht, viele nehmen aber **10–52**, damit die tiefe Saite nicht schlabbert.",
            {
              list: [
                "Nach einem Saitenwechsel die **Oktavreinheit** prüfen.",
                "Bei einem schwebenden Tremolo die Federn nachstellen.",
              ],
            },
          ],
        },
      ],
      faqs: [
        {
          question: "Ist Drop Cis dasselbe wie Drop Des?",
          answer: "Ja. Cis und Des sind derselbe Ton, also dieselbe Stimmung – einmal mit Kreuzen, einmal mit Bs geschrieben. In Tabs findest du beide Namen, oft auch das englische „Drop C#“.",
        },
        {
          question: "Wie komme ich von der Standardstimmung zu Drop Cis?",
          answer: "Saiten 5 bis 1 je einen Halbton tiefer (A→Gis, D→Cis, G→Fis, H→Ais, E→Dis), die sechste drei Halbtöne von E auf Cis. Danach alle Saiten noch einmal durchgehen – der Hals arbeitet, wenn Spannung wegfällt.",
        },
        {
          question: "Warum braucht das Stimmgerät bei der tiefen Saite länger?",
          answer: "Das tiefe Cis schwingt mit 69,30 Hz; Handy- und Laptopmikrofone nehmen seine Obertöne stärker auf als den Grundton. Kräftig anschlagen, Handy näher ran, andere Saiten dämpfen.",
        },
      ],
    },
    "/drop-b-tuner": {
      metaTitle: "Drop-H-Stimmung – Stimmgerät online",
      metaDescription: "Stimme deine Gitarre in Drop H (H Fis H E Gis Cis), englisch Drop B, per Mikrofon. Kostenloses Online-Stimmgerät mit Tipps zu Saiten und Einstellung.",
      title: "Drop-H-Stimmung",
      intro: "Stimme in Drop H per Mikrofon: Das Stimmgerät ist bereits auf H Fis H E Gis Cis eingestellt. Saite anschlagen und der Nadel folgen.",
      sections: [
        {
          heading: "Was ist Drop H?",
          body: [
            "Drop H ist **Drop D drei Halbtöne tiefer**: Die fünf hohen Saiten gehen eineinhalb Töne runter, die sechste **fünf Halbtöne** von E auf H (61,74 Hz). Alle Drop-D-Griffe funktionieren, nur deutlich tiefer.",
            "Im Englischen heißt die Stimmung **Drop B**, weil dort B für unser H steht. Englische Tabs und Videos meinen also genau diese Stimmung – nicht B im deutschen Sinn, das wäre einen Halbton tiefer. Das tiefe H entspricht der siebten Saite einer Siebensaiter-Gitarre.",
          ],
        },
        {
          heading: "Saiten und Einstellung",
          body: [
            "Die Saiten 1 bis 5 behalten nur rund **71 % ihrer Spannung**, die tiefe Saite etwa **56 %**. Mit einem normalen 10er-Satz flattert und schnarrt die H-Saite. Bei 25,5 Zoll Mensur sind **12–56** ein sinnvolles Minimum, viele spielen **13–62**.",
            {
              list: [
                "Prüfen, ob die dicke Saite in die **Sattelkerbe** passt – eine .056 oder .062 passt oft nicht in eine Kerbe für .046.",
                "**Halskrümmung** kontrollieren und die **Saitenlage** auf der Bassseite etwas anheben.",
                "**Oktavreinheit** neu einstellen: Dickere Saiten brauchen die Reiter weiter hinten.",
              ],
            },
          ],
        },
      ],
      faqs: [
        {
          question: "Warum heißt es auf Englisch Drop B?",
          answer: "Weil im Englischen der Ton H „B“ heißt und unser B „B flat“. Drop B und Drop H sind dieselbe Stimmung: H Fis H E Gis Cis.",
        },
        {
          question: "Geht Drop H mit normalen Saiten?",
          answer: "Stimmen lässt es sich, aber die tiefe Saite wird so locker, dass sie schnarrt und sich beim Spielen verstimmt. Für Drop H lohnt sich ein Satz für tiefe Stimmungen oder eine Baritongitarre.",
        },
        {
          question: "Erkennt das Handy ein so tiefes H?",
          answer: "Meist ja, mit etwas Geduld. Bei 61,74 Hz kommt der Grundton bei kleinen Mikrofonen schwach an. Kräftig anschlagen, Handy nah an die Gitarre, andere Saiten dämpfen und kurz warten.",
        },
      ],
    },
    "/dadgad-tuner": {
      metaTitle: "DADGAD-Stimmung – Stimmgerät online",
      metaDescription:
        "Stimme deine Gitarre in DADGAD (D A D G A D) per Mikrofon. Die keltische Stimmung, mit der genauen Frequenz jeder Saite.",
      title: "DADGAD-Stimmung",
      intro:
        "Stimme in DADGAD per Mikrofon: Das Stimmgerät ist bereits auf D A D G A D eingestellt. Nur drei Saiten ändern sich.",
      sections: [
        {
          heading: "Von Standard zu DADGAD",
          body: [
            "Aus der Standardstimmung stimmst du **drei Saiten einen Ganzton tiefer**: die sechste von E auf D, die zweite von H auf A und die erste von E auf D.",
            "Leer gespielt ergibt das einen Dsus4-Akkord – weder Dur noch Moll. Genau diese Offenheit macht den modalen Klang von DADGAD aus.",
          ],
        },
        {
          heading: "Wofür man DADGAD nutzt",
          body: [
            "DADGAD ist die Standardstimmung der **keltischen Musik** auf der Gitarre und beliebt im Fingerstyle. Die Leersaiten klingen wie ein Bordun unter der Melodie.",
            "Auch im Rock taucht sie auf: „Kashmir“ von Led Zeppelin ist in DADGAD.",
          ],
        },
      ],
      faqs: [
        {
          question: "Brauche ich besondere Saiten?",
          answer:
            "Nein. Drei Saiten einen Ganzton tiefer senken die Spannung leicht, jeder normale Satz funktioniert.",
        },
        {
          question: "Welche Akkorde klingen gut in DADGAD?",
          answer:
            "Alles rund um D und G mit Griffen, die Leersaiten mitklingen lassen. Mit Kapodaster im 2. Bund geht alles nach E.",
        },
        {
          question: "Wie komme ich zurück zur Standardstimmung?",
          answer:
            "Sechste und erste Saite wieder auf E, die zweite auf H. Im Bereich Stimmung des Stimmgeräts Standard wählen und der Nadel folgen.",
        },
      ],
    },
    "/open-g-tuner": {
      metaTitle: "Open-G-Stimmung – Stimmgerät online",
      metaDescription:
        "Stimme deine Gitarre in Open G (D G D G H D) per Mikrofon. Die Slide- und Bluesstimmung, mit den genauen Frequenzen.",
      title: "Open-G-Stimmung",
      intro:
        "Stimme in Open G per Mikrofon: Das Stimmgerät ist bereits auf D G D G H D eingestellt. Leer angeschlagen klingt die Gitarre als G-Dur-Akkord.",
      sections: [
        {
          heading: "Von Standard zu Open G",
          body: [
            "**Stimme drei Saiten einen Ganzton tiefer**: die sechste von E auf D, die fünfte von A auf G und die erste von E auf D. D-, G- und H-Saite bleiben gleich.",
            "Da die Spannung sinkt statt steigt, ist Open G für jede Gitarre unbedenklich.",
          ],
        },
        {
          heading: "Warum Open G so beliebt ist",
          body: [
            "Alle sechs Saiten bilden einen Durakkord, also ergibt **ein gerades Barré in jedem Bund wieder einen Durakkord**: 5. Bund C, 7. Bund D. Perfekt für **Slide**-Gitarre.",
            "Es ist die Stimmung des Delta-Blues und vieler Riffs von Keith Richards, der zusätzlich die tiefe Saite weglässt und auf fünf Saiten spielt.",
          ],
        },
      ],
      faqs: [
        {
          question: "Schadet Open G der Gitarre?",
          answer: "Nein. Saiten werden nur entspannt, die Gesamtspannung sinkt.",
        },
        {
          question: "Was ist der Unterschied zwischen Open G und Open D?",
          answer:
            "Open G (D G D G H D) ergibt G-Dur, Open D (D A D Fis A D) ergibt D-Dur und klingt tiefer und voller.",
        },
        {
          question: "Wie spiele ich in Open G einen Mollakkord?",
          answer:
            "Senke die Terz auf der H-Saite um einen Halbton: Barré im 5. Bund (C), dazu die H-Saite im 4. Bund für c-Moll.",
        },
      ],
    },
    "/open-d-tuner": {
      metaTitle: "Open-D-Stimmung – Stimmgerät online",
      metaDescription:
        "Stimme deine Gitarre in Open D (D A D F♯ A D) per Mikrofon. Slide- und Fingerstyle-Stimmung, mit den genauen Frequenzen.",
      title: "Open-D-Stimmung",
      intro:
        "Stimme in Open D per Mikrofon: Das Stimmgerät ist bereits auf D A D Fis A D eingestellt. Leer klingt die Gitarre als D-Dur-Akkord.",
      sections: [
        {
          heading: "Von Standard zu Open D",
          body: [
            {
              list: [
                "Sechste Saite: E → **D** (Ganzton tiefer).",
                "Dritte Saite: G → **Fis** (Halbton tiefer, im Display F♯).",
                "Zweite Saite: H → **A** (Ganzton tiefer).",
                "Erste Saite: E → **D** (Ganzton tiefer).",
              ],
            },
            "A- und D-Saite bleiben gleich.",
          ],
        },
        {
          heading: "Groß und tief",
          body: [
            "Mit zwei tiefen D klingt Open D breit und resonant. Es ist die klassische Slide-Blues-Stimmung (auch **Vestapol** genannt) und ein Favorit im Fingerstyle.",
            "Wie bei Open G ergibt ein gerades Barré Durakkorde: 5. Bund G, 7. Bund A.",
          ],
        },
      ],
      faqs: [
        {
          question: "Sind Open D und Open E dieselbe Stimmung?",
          answer:
            "Gleiche Form, aber Open E liegt einen Ganzton höher. Viele spielen lieber Open D mit Kapodaster im 2. Bund, statt die Spannung zu erhöhen.",
        },
        {
          question: "Brauche ich dickere Saiten?",
          answer:
            "Nein, Open D senkt die Spannung von vier Saiten. Für Slide hilft ein etwas dickerer Satz.",
        },
        {
          question: "Was unterscheidet Open D von DADGAD?",
          answer:
            "Nur die dritte Saite: Fis bei Open D (Dur), G bei DADGAD (sus4).",
        },
      ],
    },
    "/open-e-tuner": {
      metaTitle: "Open-E-Stimmung – Stimmgerät online",
      metaDescription:
        "Stimme deine Gitarre in Open E (E H E G♯ H E) per Mikrofon. Die Slide-Stimmung für E-Gitarre, mit den genauen Frequenzen.",
      title: "Open-E-Stimmung",
      intro:
        "Stimme in Open E per Mikrofon: Das Stimmgerät ist bereits auf E H E Gis H E eingestellt. Leer klingt die Gitarre als E-Dur-Akkord.",
      sections: [
        {
          heading: "Von Standard zu Open E",
          body: [
            "Open E **erhöht** drei Saiten: die A-Saite auf **H** (Ganzton), die D-Saite auf **E** (Ganzton) und die G-Saite auf **Gis** (Halbton, im Display G♯).",
            "Höhere Saiten bedeuten mehr Zug auf dem Hals. Stimme langsam hoch und schieß nicht über den Ton hinaus.",
          ],
        },
        {
          heading: "Open E oder Open D mit Kapo",
          body: [
            "Die Form ist identisch mit Open D, nur einen Ganzton höher. Viele stimmen in **Open D und setzen den Kapodaster in den 2. Bund** – klingt in E, ohne die Gitarre zu belasten.",
            "Wer direkt Open E nutzt, spielt meist E-Gitarre mit Slide: der Sound von Duane Allman und Derek Trucks.",
          ],
        },
      ],
      faqs: [
        {
          question: "Ist Open E gefährlich für die Gitarre?",
          answer:
            "Mit normalen Saiten meist nicht, aber es erhöht die Spannung. Bei älteren Akustikgitarren lieber Open D mit Kapo im 2. Bund.",
        },
        {
          question: "Warum reißt die G-Saite?",
          answer:
            "Von G auf Gis arbeitet sie näher an ihrer Grenze. Langsam hochstimmen und prüfen, ob der Sattel die Saite klemmt.",
        },
        {
          question: "Welche Akkorde ergibt ein gerades Barré?",
          answer: "Durakkorde: 5. Bund A, 7. Bund H.",
        },
      ],
    },
    "/open-c-tuner": {
      metaTitle: "Open-C-Stimmung – Stimmgerät online",
      metaDescription:
        "Stimme deine Gitarre in Open C (C G C G C E) per Mikrofon. Die tiefste offene Stimmung, mit den genauen Frequenzen.",
      title: "Open-C-Stimmung",
      intro:
        "Stimme in Open C per Mikrofon: Das Stimmgerät ist bereits auf C G C G C E eingestellt. Leer klingt die Gitarre als sehr tiefer C-Dur-Akkord.",
      sections: [
        {
          heading: "Von Standard zu Open C",
          body: [
            {
              list: [
                "Sechste: E → **C** (zwei Ganztöne tiefer).",
                "Fünfte: A → **G** (Ganzton tiefer).",
                "Vierte: D → **C** (Ganzton tiefer).",
                "Dritte: **G**, unverändert.",
                "Zweite: H → **C** (Halbton höher).",
                "Erste: **E**, unverändert.",
              ],
            },
            "Die sechste Saite sinkt auf 65,41 Hz und wird mit einem normalen Satz sehr locker; für regelmäßiges Spielen lohnt eine dickere Saite.",
          ],
        },
        {
          heading: "Ein Klang wie ein Klavier",
          body: [
            "Mit drei C und zwei G ist der Leerakkord riesig. Open C ist im Fingerstyle und in Instrumentalstücken beliebt, in denen die Leersaiten als Bordun klingen.",
            "Die Griffe sind für fast alle neu – eine Stimmung zum Entdecken.",
          ],
        },
      ],
      faqs: [
        {
          question: "Schnarrt die tiefe Saite in Open C?",
          answer:
            "Mit einem normalen Satz ja, sie geht zwei Ganztöne runter. Leichter anschlagen oder eine dickere Saite nehmen.",
        },
        {
          question: "Erkennt das Stimmgerät das tiefe C?",
          answer:
            "Bei 65,41 Hz ist das die Grenze von Handymikrofonen. Kräftig anschlagen und das Handy ans Schallloch halten.",
        },
        {
          question: "Was ist der Unterschied zu Drop C?",
          answer:
            "In Drop C behalten die fünf hohen Saiten die Intervalle der Standardstimmung; in Open C bilden alle sechs C-Dur.",
        },
      ],
    },
    "/open-a-tuner": {
      metaTitle: "Open-A-Stimmung – Stimmgerät online",
      metaDescription:
        "Stimme deine Gitarre in Open A (E A E A C♯ E) per Mikrofon. Slide- und Bluesstimmung, mit den genauen Frequenzen.",
      title: "Open-A-Stimmung",
      intro:
        "Stimme in Open A per Mikrofon: Das Stimmgerät ist bereits auf E A E A Cis E eingestellt. Leer klingt die Gitarre als A-Dur-Akkord.",
      sections: [
        {
          heading: "Von Standard zu Open A",
          body: [
            "Open A **erhöht** drei Saiten um einen Ganzton: D auf **E**, G auf **A** und H auf **Cis** (im Display C♯).",
            "Die Form entspricht Open G, einen Ganzton höher. Viele spielen lieber **Open G mit Kapodaster im 2. Bund** – gleicher Klang ohne zusätzliche Spannung.",
          ],
        },
        {
          heading: "A – die Bluestonart",
          body: [
            "A ist eine der häufigsten Tonarten im Blues, und Open A erlaubt Slide mit klingenden Leersaiten. Barré im 5. Bund ergibt D, im 7. Bund E: die drei Bluesakkorde in A.",
          ],
        },
      ],
      faqs: [
        {
          question: "Belastet Open A den Hals zu sehr?",
          answer:
            "Drei Saiten bekommen mehr Spannung. Mit leichten Saiten meist kein Problem; sonst lieber Open G mit Kapo im 2. Bund.",
        },
        {
          question: "Welche Saite reißt am häufigsten?",
          answer: "Die H-Saite, wenn sie auf Cis geht. Langsam hochstimmen.",
        },
        {
          question: "Funktionieren Open-G-Riffs?",
          answer: "Ja, alle Open-G-Griffe klappen in Open A, nur einen Ganzton höher.",
        },
      ],
    },
    "/half-step-down-tuner": {
      metaTitle: "Halbton tiefer stimmen (Es-Stimmung)",
      metaDescription:
        "Stimme deine Gitarre einen Halbton tiefer (Es As Des Ges B Es) per Mikrofon – wie Hendrix und SRV. Online und kostenlos.",
      title: "Gitarre einen Halbton tiefer stimmen",
      intro:
        "Stimme einen Halbton tiefer per Mikrofon: Das Stimmgerät ist bereits eingestellt. Das Display zeigt Kreuze (D♯ G♯ C♯ F♯ A♯ D♯) – das sind dieselben Töne wie Es As Des Ges B Es.",
      sections: [
        {
          heading: "Was sich ändert",
          body: [
            "Alle Saiten gehen **einen Halbton tiefer**. Die Intervalle sind die der Standardstimmung, also bleiben **alle Akkorde und Tonleitern gleich** – sie klingen nur einen Halbton tiefer.",
            "Die Spannung sinkt etwas: Bendings gehen leichter, der Ton wird fetter. Die Stimmung von Jimi Hendrix, Stevie Ray Vaughan, Van Halen und Guns N’ Roses.",
          ],
        },
        {
          heading: "Kreuz oder B?",
          body: [
            "Im Deutschen heißen die Töne dieser Stimmung **Es, As, Des, Ges, B, Es** – oder gleichwertig Dis, Gis, Cis, Fis, Ais, Dis. Achtung: Das deutsche **B** ist hier tatsächlich gemeint, nämlich der Halbton unter H.",
            "Zum Zusammenspielen mit jemandem in Standardstimmung reicht ein Kapodaster im 1. Bund.",
          ],
        },
      ],
      faqs: [
        {
          question: "Warum zeigt das Stimmgerät D♯ statt Es?",
          answer:
            "Das sind zwei Namen für denselben Ton. Das Stimmgerät nutzt Kreuze; Noten von Songs in dieser Stimmung nutzen meist B-Vorzeichen.",
        },
        {
          question: "Brauche ich andere Saiten?",
          answer:
            "Nein, ein Halbton weniger Spannung passt zu jedem Satz. Manche nehmen eine Stärke dicker für mehr Zug.",
        },
        {
          question: "Wie komme ich zurück zur Standardstimmung?",
          answer:
            "Alle Saiten einen Halbton hochstimmen. Im Bereich Stimmung Standard wählen und der Nadel folgen.",
        },
      ],
    },
    "/full-step-down-tuner": {
      metaTitle: "Ganzton tiefer stimmen (D-Standard)",
      metaDescription:
        "Stimme deine Gitarre einen Ganzton tiefer (D G C F A D) per Mikrofon. Mehr Druck ohne neue Griffe. Online und kostenlos.",
      title: "Gitarre einen Ganzton tiefer stimmen",
      intro:
        "Stimme einen Ganzton tiefer (D-Standard) per Mikrofon: Das Stimmgerät ist bereits auf D G C F A D eingestellt.",
      sections: [
        {
          heading: "Was sich ändert",
          body: [
            "Alle Saiten gehen **einen Ganzton tiefer**: E wird D, A wird G, D wird C, G wird F, H wird A und E wird D. Die Intervalle bleiben – **gleiche Akkorde, gleiche Tonleitern**.",
            "Verbreitet in Grunge, Stoner und Metal und bei Sängern, die eine bequemere Tonart suchen.",
          ],
        },
        {
          heading: "Saiten und Spannung",
          body: [
            "Ein Ganzton weniger Spannung ist deutlich spürbar. Mit 9er- oder 10er-Saiten wird es schlabberig; viele wechseln für diese Stimmung auf **11er oder 12er**.",
            "Nach dem Wechsel Halskrümmung und Oktavreinheit prüfen.",
          ],
        },
      ],
      faqs: [
        {
          question: "Ist das dasselbe wie Drop D?",
          answer:
            "Nein. Bei Drop D geht nur die tiefe Saite runter. Hier gehen alle sechs runter – die tiefe Saite landet auch auf D, aber die anderen ändern sich ebenfalls.",
        },
        {
          question: "Wie spiele ich mit jemandem in Standardstimmung?",
          answer: "Kapodaster in den 2. Bund.",
        },
        {
          question: "Warum zeigt das Stimmgerät C und F auf der vierten und dritten Saite?",
          answer:
            "Weil D einen Ganzton tiefer C ist und G zu F wird. Stimmt so: D G C F A D.",
        },
      ],
    },
    "/432-hz-tuner": {
      metaTitle: "Stimmgerät 432 Hz – online und gratis",
      metaDescription:
        "Stimme deine Gitarre auf A = 432 Hz per Mikrofon. Alle Saiten werden automatisch umgerechnet. Kostenlos, online, ohne Download.",
      title: "Stimmgerät 432 Hz",
      intro:
        "Stimme auf A = 432 Hz per Mikrofon. Das Stimmgerät ist bereits auf 432 eingestellt: Saite anschlagen und der Nadel folgen – alle Zielwerte sind umgerechnet.",
      sections: [
        {
          heading: "Was heißt auf 432 Hz stimmen?",
          body: [
            "Der Standard-Kammerton legt A4 auf 440 Hz fest. Bei 432 Hz **sinken alle Töne im selben Verhältnis**, um etwa 31,8 Cent (knapp ein Drittel Halbton). Die Intervalle bleiben gleich: Akkorde, Tonleitern und Tabs funktionieren wie gewohnt.",
            "Auf der Gitarre geht das tiefe E von 82,41 Hz auf 80,91 Hz, das hohe E von 329,63 Hz auf 323,63 Hz. Die Saitenspannung sinkt um etwa 3,6 %.",
          ],
        },
        {
          heading: "Was man weiß – und was nicht",
          body: [
            "Viele Musiker empfinden 432 Hz als wärmer, und das ist eine berechtigte Vorliebe. Behauptungen, es sei gesünder oder natürlicher, haben Blindtests nicht bestanden: Die meisten Menschen hören ohne Referenz keinen Unterschied.",
            "Bei 432 klingst du **gegenüber Aufnahmen und Musikern auf 440 verstimmt**.",
            "In den Einstellungen kannst du jeden Kammerton zwischen 415 und 466 Hz wählen, zum Beispiel 442 oder 443 fürs Orchester.",
          ],
        },
      ],
      faqs: [
        {
          question: "Geht das auch für Bass, Ukulele oder Geige?",
          answer:
            "Ja. Wähle dein Instrument in den Einstellungen; der Kammerton bleibt bei 432 und alle Saiten werden umgerechnet.",
        },
        {
          question: "Ist 432 Hz besser als 440 Hz?",
          answer:
            "Geschmackssache. Für gesundheitliche Vorteile gibt es keine belastbaren Belege; wenn dir der etwas tiefere Klang gefällt, ist das Grund genug.",
        },
        {
          question: "Wie weit muss ich drehen?",
          answer: "Von 440 kommend ist jede Saite etwa 32 Cent zu hoch: eine kleine Drehung.",
        },
      ],
    },
    "/bass-tuner": {
      metaTitle: "Bass stimmen – Online-Stimmgerät gratis",
      metaDescription:
        "Kostenloses Online-Stimmgerät für E-Bass. Stimme deinen 4-Saiter (E A D G) per Mikrofon, bis zum tiefen E bei 41 Hz.",
      title: "Bass stimmen",
      intro:
        "Stimme deinen 4-saitigen Bass (E A D G) per Mikrofon. Das Stimmgerät ist bereits auf Bass eingestellt: Mikrofon starten und eine Saite anschlagen.",
      sections: [
        {
          heading: "Warum Bass fürs Mikrofon schwierig ist",
          body: [
            "Die Grundtöne des Basses liegen zwischen 41 und 98 Hz – genau der Bereich, den Handy- und Laptopmikrofone abschneiden, weil sie für Sprache gebaut sind.",
            "Eine Basssaite klingt aber nicht nur im Grundton: Sie erzeugt Obertöne beim Doppelten, Dreifachen und Vierfachen der Frequenz, und die nimmt das Mikrofon gut auf. Das Stimmgerät wertet diese Reihe aus und rechnet die Anzeige auf die richtige Oktave zurück. So hilfst du ihm:",
            {
              list: [
                "Handy nah an den Bass halten.",
                "Kräftig am Hals-Pickup anschlagen und die anderen Saiten dämpfen.",
                "Mit ausgeschaltetem Verstärker in einem ruhigen Raum stimmen.",
              ],
            },
          ],
        },
        {
          heading: "Bass und Gitarre: gleiche Stimmung, eine Oktave tiefer",
          body: [
            "Die vier Basssaiten (E A D G) heißen wie die vier tiefen Gitarrensaiten, klingen aber genau eine Oktave tiefer. Mit einem Gitarristen könnt ihr die Stimmung prüfen, indem ihr denselben Ton spielt: Er sollte ohne Schwebung „gleich“ klingen.",
          ],
        },
      ],
      faqs: [
        {
          question: "Wie ist ein Bass standardmäßig gestimmt?",
          answer: "E A D G, von tief nach hoch: E1, A1, D2 und G2.",
        },
        {
          question: "Kann ich mit angeschlossenem Verstärker stimmen?",
          answer:
            "Das Stimmgerät nutzt das Mikrofon deines Geräts – stimm lieber mit ausgeschaltetem oder leisem Amp. Brummen und Rauschen stören die Erkennung der tiefen Töne.",
        },
        {
          question: "Und für einen 5-Saiter?",
          answer:
            "Wähle im Bereich Instrument den 5-Saiter-Bass, der ein tiefes H unter dem E ergänzt. Dafür gibt es auch eine eigene Seite.",
        },
      ],
    },
    "/5-string-bass-tuner": {
      metaTitle: "5-Saiter-Bass stimmen – Stimmgerät",
      metaDescription:
        "Stimme deinen 5-Saiter-Bass (H E A D G) per Mikrofon, inklusive tiefem H bei 30,87 Hz. Online, kostenlos und ohne Download.",
      title: "5-Saiter-Bass stimmen",
      intro:
        "Stimme deinen 5-Saiter per Mikrofon: Das Stimmgerät ist bereits auf H E A D G eingestellt. Kräftig anschlagen und der Nadel folgen.",
      sections: [
        {
          heading: "Das tiefe H",
          body: [
            "Der 5-Saiter ergänzt ein **tiefes H (H0, 30,87 Hz)** unter dem E. Der Ton ist so tief, dass Handymikrofone seinen Grundton kaum aufnehmen.",
            "Das Stimmgerät hört deshalb auch auf die Obertöne der Saite und rechnet auf die richtige Oktave zurück. Kräftig am Hals-Pickup anschlagen, andere Saiten dämpfen, Handy nah ran.",
          ],
        },
        {
          heading: "Saiten und Mensur",
          body: [
            "Damit das H genug Spannung hat, nutzt man Saitenstärken von 125 bis 135 und oft Bässe mit **35-Zoll-Mensur**. Auf einem Short-Scale-Bass kann das H auch bei 0 Cent schlapp und undeutlich klingen.",
          ],
        },
      ],
      faqs: [
        {
          question: "Warum braucht die Nadel beim H so lange?",
          answer:
            "Eine Schwingung des tiefen H dauert 32 Millisekunden, und das Stimmgerät braucht mehrere davon. Lass den Ton klingen und lies nach dem Anschlag ab.",
        },
        {
          question: "Sind die anderen Saiten wie beim 4-Saiter?",
          answer: "Ja: E, A, D und G haben exakt dieselben Frequenzen.",
        },
        {
          question: "Gibt es 5-Saiter mit hohem C?",
          answer:
            "Ja, manche spielen E A D G C. Dieses Stimmgerät ist auf die verbreitetere Variante mit tiefem H eingestellt.",
        },
      ],
    },
    "/ukulele-tuner": {
      metaTitle: "Ukulele stimmen – Online-Stimmgerät gratis",
      metaDescription:
        "Kostenloses Online-Stimmgerät für Ukulele. Stimme auf G C E A per Mikrofon, direkt hier. Für Sopran, Konzert und Tenor.",
      title: "Ukulele stimmen",
      intro:
        "Stimme deine Ukulele auf G C E A per Mikrofon. Das Stimmgerät ist bereits auf Ukulele eingestellt: Mikrofon starten und eine Saite anschlagen.",
      chartCaption:
        "Das sind die genauen Zielfrequenzen bei A4 = 440 Hz. Saite 4 (G) ist nicht die tiefste: Die Ukulele ist reentrant gestimmt, das G liegt über C und E.",
      sections: [
        {
          heading: "Die reentrante Stimmung",
          body: [
            "Was Gitarristen am meisten verwirrt: **Die Saiten laufen nicht von tief nach hoch.** Die Töne sind G4 (392 Hz), C4 (262 Hz), E4 (330 Hz) und A4 (440 Hz) – die vierte Saite ist die zweithöchste.",
            "Das nennt man **reentrante Stimmung**. Weil alle vier Saiten in eine Oktave passen, haben Akkorde keinen ausgeprägten Bass – daher der helle, leichte Ukulele-Klang.",
          ],
        },
        {
          heading: "Größen und tiefes G",
          body: [
            "Sopran, Konzert und Tenor werden alle **G C E A** gestimmt. Die **Bariton**-Ukulele ist anders (D G H E) und hat eine eigene Seite.",
            "Manche ersetzen das hohe G durch ein **tiefes G** (G3, 196 Hz) für einen volleren Klang. Dafür braucht es eine eigene Saite – eine normale Saite eine Oktave tiefer wäre viel zu locker.",
          ],
        },
      ],
      faqs: [
        {
          question: "Warum klingt die vierte Saite höher als die dritte?",
          answer:
            "Weil die Stimmung reentrant ist: Das G liegt über C und E. Das ist Absicht und macht den Ukulele-Sound aus.",
        },
        {
          question: "Warum verstimmt sich meine neue Ukulele ständig?",
          answer:
            "Nylonsaiten dehnen sich in den ersten Tagen stark. Zieh jede Saite vorsichtig in die Länge und stimm mehrmals nach; nach einer Woche ist es stabil.",
        },
        {
          question: "Das Stimmgerät zeigt G höher als C – ist das richtig?",
          answer: "Ja, das ist die reentrante Stimmung. Die häufigste Verwechslung bei der Ukulele.",
        },
      ],
    },
    "/baritone-ukulele-tuner": {
      metaTitle: "Bariton-Ukulele stimmen – Stimmgerät",
      metaDescription:
        "Stimme deine Bariton-Ukulele auf D G H E per Mikrofon, direkt hier. Online, kostenlos und ohne Download.",
      title: "Bariton-Ukulele stimmen",
      intro:
        "Stimme deine Bariton-Ukulele per Mikrofon: Das Stimmgerät ist bereits auf D G H E eingestellt – wie die vier hohen Gitarrensaiten.",
      chartCaption:
        "Das sind die genauen Zielfrequenzen bei A4 = 440 Hz. Anders als die normale Ukulele ist die Bariton der Reihe nach gestimmt: Saite 4 (D) ist die tiefste, Saite 1 (E) die höchste.",
      sections: [
        {
          heading: "Bariton und normale Ukulele",
          body: [
            "Sopran, Konzert und Tenor werden **G C E A** mit hohem G gestimmt. Die Bariton, die größte (etwa 76 cm), wird **D G H E** gestimmt, von tief nach hoch wie eine Gitarre.",
            "Die Griffe sind dieselben wie bei der normalen Ukulele, klingen aber eine Quarte tiefer: Der C-Griff der Sopran ist auf der Bariton ein G.",
          ],
        },
        {
          heading: "Wenn du von der Gitarre kommst",
          body: [
            "Die Bariton hat die Stimmung der vier hohen Gitarrensaiten – **Gitarrenakkorde auf diesen Saiten behalten ihren Namen**.",
            "D- und G-Saite sind meist umsponnen: Das ist normal und gibt den tiefen Saiten mehr Fülle.",
          ],
        },
      ],
      faqs: [
        {
          question: "Kann ich die Bariton auf G C E A stimmen?",
          answer:
            "Nur mit Saiten, die dafür gemacht sind. Mit normalen Bariton-Saiten wäre die Spannung zu hoch.",
        },
        {
          question: "Ist die Stimmung reentrant?",
          answer: "Nein, die Standardstimmung der Bariton ist linear, mit D3 auf der vierten Saite.",
        },
        {
          question: "Das Stimmgerät zeigt das D eine Oktave zu hoch?",
          answer: "Es hört einen Oberton. Über dem Schallloch anschlagen und ausklingen lassen.",
        },
      ],
    },
    "/7-string-guitar-tuner": {
      metaTitle: "7-saitige Gitarre stimmen – Stimmgerät",
      metaDescription:
        "Stimme deine 7-saitige Gitarre (H E A D G H E) per Mikrofon, inklusive tiefem H. Online, kostenlos und ohne Download.",
      title: "7-saitige Gitarre stimmen",
      intro:
        "Stimme deine 7-Saiter per Mikrofon: Das Stimmgerät ist bereits auf H E A D G H E eingestellt.",
      sections: [
        {
          heading: "Die siebte Saite",
          body: [
            "Die 7-saitige Gitarre ergänzt ein **tiefes H (H1, 61,74 Hz)** unter dem E. Die übrigen sechs Saiten werden genau wie bei einer normalen Gitarre gestimmt.",
            "Das H liegt eine Quarte unter dem E – dasselbe Intervall wie zwischen fast allen Saiten. Tonleitern lassen sich also ganz natürlich erweitern.",
          ],
        },
        {
          heading: "Einsatzgebiete",
          body: [
            "Die Gitarre des **modernen Metal** und Djent, aber auch des Jazz, wo die siebte Saite eigene Basslinien ermöglicht.",
            "Häufige Variante: **Drop A** (A E A D G H E), mit der siebten Saite einen Ganzton tiefer.",
          ],
        },
      ],
      faqs: [
        {
          question: "Ändern sich die sechs hohen Saiten?",
          answer: "Nein: E A D G H E wie bei jeder 6-saitigen Gitarre.",
        },
        {
          question: "Welche Saitenstärke für die siebte Saite?",
          answer:
            "Meist 56 bis 64 für H bei normaler Mensur; je länger die Mensur, desto straffer und klarer die Saite.",
        },
        {
          question: "Erkennt das Stimmgerät das tiefe H?",
          answer: "Ja, bei 61,74 Hz. Wenn die Nadel zögert: kräftig anschlagen und andere Saiten dämpfen.",
        },
      ],
    },
    "/12-string-guitar-tuner": {
      metaTitle: "12-saitige Gitarre stimmen – Stimmgerät",
      metaDescription:
        "Stimme deine 12-saitige Gitarre per Mikrofon: sechs Saitenpaare, vier in Oktaven, zwei im Einklang. Online und kostenlos.",
      title: "12-saitige Gitarre stimmen",
      intro:
        "Stimme deine 12-Saiter per Mikrofon: Das Stimmgerät ist bereits mit allen sechs Saitenpaaren eingestellt.",
      chartCaption:
        "Das sind die genauen Zielfrequenzen bei A4 = 440 Hz. Jede Zeile ist ein Saitenpaar. Die vier tiefen Paare haben eine Oktavsaite, die zwei hohen (H und E) sind im Einklang gestimmt.",
      sections: [
        {
          heading: "So stimmst du eine 12-Saiter",
          body: [
            "Die zwölf Saiten bilden **sechs Paare** mit den Tönen der Standardstimmung. Bei E, A, D und G ist die zweite Saite **eine Oktave höher**; bei H und E sind beide Saiten **gleich (Einklang)**.",
            "Stimme **jede Saite einzeln**: Dämpfe die Partnersaite mit einem Finger. Klingen beide, hört das Stimmgerät zwei Töne und die Nadel kommt nicht zur Ruhe.",
          ],
        },
        {
          heading: "Spannung und Hals",
          body: [
            "Zwölf Saiten ziehen fast doppelt so stark am Hals. Viele stimmen ihre 12-Saiter deshalb **einen Halb- oder Ganzton tiefer** und spielen mit Kapodaster – bei älteren Gitarren eine gute Idee.",
            "Zum Schluss jedes Paar zusammen anschlagen: Eine schnelle Schwebung zeigt, dass eine Saite noch daneben liegt.",
          ],
        },
      ],
      faqs: [
        {
          question: "Warum sind H- und E-Paar nicht in Oktaven?",
          answer:
            "Eine Saite eine Oktave über dem hohen E wäre an der Reißgrenze. Deshalb zwei gleiche Saiten.",
        },
        {
          question: "In welcher Reihenfolge stimme ich die zwölf Saiten?",
          answer:
            "Erst die Hauptsaite jedes Paares von tief nach hoch, dann die Oktav- bzw. Einklangsaiten. Zum Schluss ein zweiter Durchgang.",
        },
        {
          question: "Gehen alternative Stimmungen?",
          answer:
            "Ja, aber vorsichtig: Hochstimmen erhöht bei 12 Saiten die Spannung stark. Stimmungen, die Saiten absenken, sind am sichersten.",
        },
      ],
    },
    "/mandolin-tuner": {
      metaTitle: "Mandoline stimmen – Online-Stimmgerät",
      metaDescription:
        "Stimme deine Mandoline auf G D A E per Mikrofon: alle acht Saiten, Paar für Paar. Online, kostenlos und ohne Download.",
      title: "Mandoline stimmen",
      intro:
        "Stimme deine Mandoline per Mikrofon: Das Stimmgerät ist bereits auf G D A E eingestellt. Stimme jede Saite eines Paares einzeln.",
      chartCaption:
        "Das sind die genauen Zielfrequenzen bei A4 = 440 Hz. Jede Zeile ist ein Saitenpaar im Einklang – beide Saiten haben denselben Zielton.",
      sections: [
        {
          heading: "Vier Paare im Einklang",
          body: [
            "Die Mandoline hat **acht Saiten in vier Paaren**, je zwei auf denselben Ton gestimmt: G3, D4, A4 und E5 – dieselben Töne wie die Geige.",
            "**Stimme eine Saite nach der anderen**: Leg einen Finger auf die Partnersaite. Klingen beide, hört das Stimmgerät zwei fast gleiche Töne und die Nadel pendelt.",
          ],
        },
        {
          heading: "Der lose Steg",
          body: [
            "Bei den meisten Mandolinen ist der Steg nicht verleimt, nur der Saitendruck hält ihn. Verrutscht er, können die Leersaiten stimmen und gegriffene Töne trotzdem schief klingen.",
            "Wechsle die Saiten einzeln, damit der Steg an seinem Platz bleibt, und prüfe, ob der 12. Bund genau eine Oktave über der Leersaite liegt.",
          ],
        },
      ],
      faqs: [
        {
          question: "Woran erkenne ich, dass ein Paar gleich gestimmt ist?",
          answer:
            "Spiel beide zusammen: Klingt es sauber und ruhig, passt es. Hörst du ein Wabern, liegt eine Saite daneben.",
        },
        {
          question: "Und die Mandola?",
          answer:
            "Die Mandola wird C G D A gestimmt, wie die Bratsche – nutze das Bratschen-Stimmgerät.",
        },
        {
          question: "Warum reißen die E-Saiten?",
          answer:
            "Sie sind dünn und stark gespannt. Langsam von unten an den Ton heranstimmen und Sattel sowie Steg auf scharfe Kanten prüfen.",
        },
      ],
    },
    "/banjo-tuner": {
      metaTitle: "Banjo stimmen – Online-Stimmgerät gratis",
      metaDescription:
        "Stimme dein 5-saitiges Banjo in Open G (G D G H D) per Mikrofon, inklusive kurzer fünfter Saite. Online und kostenlos.",
      title: "Banjo stimmen",
      intro:
        "Stimme dein 5-saitiges Banjo per Mikrofon: Das Stimmgerät ist bereits auf Open G (G D G H D) mit hoher fünfter Saite eingestellt.",
      chartCaption:
        "Das sind die genauen Zielfrequenzen bei A4 = 440 Hz. Saite 5 (die kurze, mit der Mechanik in der Halsmitte) ist nicht die tiefste: Sie ist ein hohes G4.",
      sections: [
        {
          heading: "Die fünfte Saite",
          body: [
            "Das 5-saitige Banjo hat eine **kurze Saite**, die erst am 5. Bund beginnt und auf **G4** gestimmt wird – höher als alle anderen Leersaiten. Sie dient als Bordun: Bei Bluegrass-Rolls kehrt der Daumen ständig zu ihr zurück.",
            "Ihre Mechanik sitzt seitlich am Hals und verstellt sich leicht beim Einpacken. Prüf sie jedes Mal, wenn du das Banjo aus dem Koffer nimmst.",
          ],
        },
        {
          heading: "Weitere Banjo-Stimmungen",
          body: [
            {
              list: [
                "**Double C** (G C G C D): vierte und zweite Saite einen Ganzton tiefer. Beliebt beim Clawhammer.",
                "**G modal** (G D G C D): zweite Saite von H auf C.",
                "**Open D** (Fis D Fis A D): für D ohne Kapodaster.",
              ],
            },
            "Das Stimmgerät misst die Cent gegenüber Open G; bei anderen Stimmungen zeigt das Display den Namen des gespielten Tons.",
          ],
        },
      ],
      faqs: [
        {
          question: "Wie nutze ich einen Kapodaster mit der fünften Saite?",
          answer:
            "Die fünfte muss genauso weit hoch: Kapo im 2. Bund (A), fünfte Saite auf A4. Viele Banjos haben kleine Haken („Railroad Spikes“) dafür.",
        },
        {
          question: "Geht das auch für ein 4-saitiges Tenorbanjo?",
          answer:
            "Nein. Das Tenorbanjo wird C G D A gestimmt, wie die Bratsche – nutze das Bratschen-Stimmgerät.",
        },
        {
          question: "Leer gestimmt, aber in den Bünden schief?",
          answer:
            "Der Banjosteg ist nicht fest. Richtig platziert klingt der 12. Bund genau eine Oktave über der Leersaite.",
        },
      ],
    },
    "/violin-tuner": {
      metaTitle: "Geige stimmen – Online-Stimmgerät gratis",
      metaDescription:
        "Kostenloses Online-Stimmgerät für Geige. Stimme auf G D A E per Mikrofon, direkt hier. Für alle Größen von 1/16 bis 4/4.",
      title: "Geige stimmen",
      intro:
        "Stimme deine Geige auf G D A E per Mikrofon. Das Stimmgerät ist bereits eingestellt: leere Saite mit dem Bogen oder pizzicato spielen.",
      sections: [
        {
          heading: "Wirbel und Feinstimmer",
          body: [
            "Die **Feinstimmer** sind die kleinen Schrauben am Saitenhalter. Im Uhrzeigersinn wird der Ton höher. Sie verändern die Tonhöhe nur wenig – ideal fürs tägliche Nachstimmen.",
            "Die **Wirbel** halten nur durch Reibung: Dreh sie und drück sie dabei leicht **in den Wirbelkasten hinein**. Faustregel: Ab etwa 30 Cent Abweichung mit dem Wirbel annähern, mit dem Feinstimmer abschließen.",
          ],
        },
        {
          heading: "Achte auf den Steg",
          body: [
            "Der Steg ist nicht verleimt, nur der Saitendruck hält ihn. Jedes Mal, wenn du eine Saite mit dem Wirbel spannst, zieht die Reibung die Stegoberkante Richtung Griffbrett.",
            "Schau nach einem Saitenwechsel von der Seite: Die Rückseite (zum Saitenhalter) sollte etwa senkrecht zur Decke stehen. Neigt er sich, lass dir von deiner Lehrkraft oder einem Geigenbauer zeigen, wie man ihn aufrichtet.",
          ],
        },
      ],
      faqs: [
        {
          question: "Welche Saite stimme ich zuerst?",
          answer:
            "Das A – es ist der Bezugston im Orchester. Dann D, G und E, und zum Schluss das A noch einmal prüfen.",
        },
        {
          question: "Mein Orchester stimmt auf 443 Hz. Geht das?",
          answer:
            "Ja. In Deutschland und Österreich stimmen viele Orchester auf 442 oder 443 Hz. Stell den Kammerton in den Einstellungen entsprechend ein.",
        },
        {
          question: "Werden kleine Geigen genauso gestimmt?",
          answer: "Ja: 1/16, 1/8, 1/4, 1/2 und 3/4 nutzen dasselbe G D A E wie eine 4/4-Geige.",
        },
      ],
    },
    "/viola-tuner": {
      metaTitle: "Bratsche stimmen – Online-Stimmgerät",
      metaDescription:
        "Stimme deine Bratsche auf C G D A per Mikrofon, direkt hier. Für alle Größen. Online und kostenlos.",
      title: "Bratsche stimmen",
      intro:
        "Stimme deine Bratsche per Mikrofon: Das Stimmgerät ist bereits auf C G D A eingestellt. Fang mit dem A an und folge der Nadel.",
      sections: [
        {
          heading: "Bratsche, Geige und Cello",
          body: [
            {
              list: [
                "**Geige**: G3 D4 A4 E5.",
                "**Bratsche**: C3 G3 D4 A4, eine Quinte unter der Geige.",
                "**Cello**: C2 G2 D3 A3, eine Oktave unter der Bratsche.",
              ],
            },
            "Die Bratsche teilt G, D und A mit der Geige und ergänzt ein **tiefes C** (130,81 Hz). Diese Saite gibt der Bratsche ihre dunkle, warme Stimme – und braucht nach einem Wechsel am längsten, bis sie stabil ist.",
          ],
        },
        {
          heading: "Der Altschlüssel",
          body: [
            "Die Bratsche liest im **Altschlüssel**: Die Note auf der Mittellinie ist das eingestrichene c (C4). Die leere C-Saite liegt eine Oktave darunter.",
            "Feinstimmer für kleine Korrekturen, Wirbel nur für große – und danach prüfen, ob der Steg noch senkrecht steht.",
          ],
        },
      ],
      faqs: [
        {
          question: "Kann ich ein Geigen-Stimmgerät für die Bratsche nutzen?",
          answer:
            "Für G, D und A ja, aber es sucht ein E5 und kennt kein C3. Dieses Stimmgerät ist auf alle vier Bratschensaiten eingestellt.",
        },
        {
          question: "Warum tut sich das Stimmgerät mit dem C schwer?",
          answer:
            "Es ist der tiefste Ton des Instruments. Mit ruhigem, vollem Bogen oder pizzicato spielen und das Handy näher halten.",
        },
        {
          question: "Mein Orchester stimmt auf 442 oder 443 Hz?",
          answer:
            "Stell den Kammerton in den Einstellungen ein, oder stimm jede Saite etwa 8 bzw. 12 Cent über 0.",
        },
      ],
    },
    "/cello-tuner": {
      metaTitle: "Cello stimmen – Online-Stimmgerät gratis",
      metaDescription:
        "Stimme dein Cello auf C G D A per Mikrofon, inklusive tiefem C bei 65,41 Hz. Online, kostenlos und ohne Download.",
      title: "Cello stimmen",
      intro:
        "Stimme dein Cello per Mikrofon: Das Stimmgerät ist bereits auf C G D A eingestellt. Fang mit dem A an und folge der Nadel.",
      chartCaption:
        "Das sind die genauen Zielfrequenzen bei A4 = 440 Hz. Saite 1 ist A3 (220 Hz), eine Oktave unter dem Orchester-A.",
      sections: [
        {
          heading: "Wohin mit dem Handy?",
          body: [
            "Das tiefe C des Cellos schwingt mit **65,41 Hz**, das G mit 98 Hz – an der Grenze dessen, was Handymikrofone gut aufnehmen. Leg das Handy aufs Notenpult oder auf den Boden, nah am Korpus.",
            "Spiel mit langem, langsamem, kräftigem Bogen nahe am Griffbrett. Zeigt das Stimmgerät beim C ein G, hört es einen Oberton: Handy näher, Bogen leichter.",
          ],
        },
        {
          heading: "Wirbel, Feinstimmer und Stachel",
          body: [
            "Für den Alltag die **Feinstimmer**; viele Celli haben sie an allen vier Saiten. Die Wirbel nur für große Änderungen, mit festem Druck nach innen.",
            "Stachel einstellen und Spielposition einnehmen, bevor du stimmst – wer schief stimmt und sich danach zurechtsetzt, stößt leicht an einen Wirbel.",
          ],
        },
      ],
      faqs: [
        {
          question: "Warum zeigt das Stimmgerät A3 und nicht A4?",
          answer:
            "Weil die A-Saite des Cellos ein A3 mit 220 Hz ist – eine Oktave unter dem 440-Hz-A des Orchesters.",
        },
        {
          question: "Werden kleine Celli genauso gestimmt?",
          answer: "Ja: 7/8, 3/4, 1/2, 1/4 und 1/8 nutzen dasselbe C G D A.",
        },
        {
          question: "Mein Cello ist verstimmt, wenn ich es aus dem Koffer nehme?",
          answer:
            "Meist liegt es an der Temperatur. Lass es ein paar Minuten außerhalb des Koffers, bevor du stimmst.",
        },
      ],
    },
  },
};
