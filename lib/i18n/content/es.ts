import type { LanguageContent } from "./types";

/** Spanish (neutral Latin American — ustedes, not vosotros; solfège note
 *  names; decimal point). The guitar, bass, ukulele and violin pages are
 *  hand-written routes under app/es and only need labels here. */
export const es: LanguageContent = {
  labels: {
    "/": "Afinador de guitarra",
    "/drop-d-tuner": "Afinador Drop D",
    "/drop-c-tuner": "Afinador Drop C",
    "/drop-c-sharp-tuner": "Afinador Drop C♯",
    "/drop-b-tuner": "Afinador Drop B",
    "/dadgad-tuner": "Afinador DADGAD",
    "/open-g-tuner": "Afinador Sol abierto",
    "/open-d-tuner": "Afinador Re abierto",
    "/open-e-tuner": "Afinador Mi abierto",
    "/open-c-tuner": "Afinador Do abierto",
    "/open-a-tuner": "Afinador La abierto",
    "/half-step-down-tuner": "Afinador medio tono abajo",
    "/full-step-down-tuner": "Afinador un tono abajo",
    "/432-hz-tuner": "Afinador 432 Hz",
    "/bass-tuner": "Afinador de bajo",
    "/5-string-bass-tuner": "Afinador de bajo de 5 cuerdas",
    "/ukulele-tuner": "Afinador de ukelele",
    "/baritone-ukulele-tuner": "Afinador de ukelele barítono",
    "/7-string-guitar-tuner": "Afinador de guitarra de 7 cuerdas",
    "/12-string-guitar-tuner": "Afinador de guitarra de 12 cuerdas",
    "/mandolin-tuner": "Afinador de mandolina",
    "/banjo-tuner": "Afinador de banjo",
    "/violin-tuner": "Afinador de violín",
    "/viola-tuner": "Afinador de viola",
    "/cello-tuner": "Afinador de violonchelo",
    "/cavaquinho-tuner": "Afinador de cavaquinho",
  },
  pages: {
    "/drop-d-tuner": {
      metaTitle: "Afinador Drop D online gratis",
      metaDescription:
        "Afina tu guitarra en Drop D (Re La Re Sol Si Mi) con el micrófono, aquí mismo. Solo cambia la sexta cuerda. Gratis y sin descargas.",
      title: "Afinador Drop D",
      intro:
        "Afina en Drop D con el micrófono: el afinador ya está configurado en Re La Re Sol Si Mi. Solo tienes que bajar la sexta cuerda un tono.",
      sections: [
        {
          heading: "Qué es el Drop D",
          body: [
            "El Drop D es la afinación estándar con **la sexta cuerda bajada un tono**, de Mi a Re. Las otras cinco cuerdas no cambian. Es la afinación alternativa más usada del mundo porque se entra y se sale de ella en segundos.",
            "Con la sexta en Re, las tres cuerdas graves al aire forman un acorde de quinta (power chord) de Re, y cualquier power chord se toca con **un solo dedo** cejando las tres cuerdas graves en el mismo traste. Por eso es la base de tanto rock, grunge y metal.",
          ],
        },
        {
          heading: "Cómo comprobarla de oído",
          body: [
            "Toca el armónico del traste 12 de la sexta cuerda y compáralo con la cuarta cuerda al aire: los dos son Re y deben sonar idénticos, sin batido. Es una forma rápida de confirmar el Drop D cuando no tienes el móvil a mano.",
            "Para volver a la afinación estándar, sube la sexta cuerda hasta Mi (82.41 Hz) con el afinador.",
          ],
        },
      ],
      faqs: [
        {
          question: "¿Necesito cuerdas nuevas para tocar en Drop D?",
          answer:
            "No. Bajar una sola cuerda un tono deja la tensión dentro de lo normal. Si notas la sexta algo floja o con trasteo, un calibre un poco más grueso en esa cuerda lo soluciona.",
        },
        {
          question: "¿Qué es el Drop C y en qué se diferencia?",
          answer:
            "El Drop C es el mismo patrón un tono más abajo: Do Sol Do Fa La Re. Todas las cuerdas bajan un tono y la sexta baja otro más. Suena más pesado y suele necesitar cuerdas más gruesas.",
        },
        {
          question: "¿Cambian los acordes en Drop D?",
          answer:
            "Solo los que usan la sexta cuerda. Los acordes que se tocan en las cinco cuerdas agudas, como La, Re o Do sin bajo en la sexta, se tocan exactamente igual.",
        },
      ],
    },
    "/drop-c-tuner": {
      metaTitle: "Afinador Drop C online gratis",
      metaDescription:
        "Afina tu guitarra en Drop C (Do Sol Do Fa La Re) con el micrófono. Afinador online gratis, con frecuencias exactas para cada cuerda.",
      title: "Afinador Drop C",
      intro:
        "Afina en Drop C con el micrófono: el afinador ya está configurado en Do Sol Do Fa La Re. Toca una cuerda y sigue la aguja.",
      sections: [
        {
          heading: "Qué es el Drop C",
          body: [
            "El Drop C es el Drop D bajado un tono entero: **todas las cuerdas bajan un tono** respecto a la afinación estándar y la sexta baja **un tono más**, hasta Do (65.41 Hz). Las relaciones entre cuerdas son las mismas que en Drop D, así que todas las formas de acordes de Drop D sirven, solo que suenan un tono más graves.",
            "Es la afinación típica del metalcore y del hardcore moderno: power chords de un dedo y un registro grave que llena mucho.",
          ],
        },
        {
          heading: "Cuerdas y ajuste",
          body: [
            "Bajar seis cuerdas un tono reduce bastante la tensión. Con un juego normal de calibre 10, la sexta queda floja y trastea. Lo habitual es pasar a **11–56 o 12–56**, o a un juego específico para afinaciones graves.",
            {
              list: [
                "Tras cambiar de calibre, revisa la **curvatura del mástil**: con menos tensión, el mástil se endereza y puede trastear.",
                "Revisa la **octavación** (traste 12 contra la cuerda al aire) después de afinar.",
                "Si el puente es flotante (trémolo), equilibra los muelles: al bajar la tensión, el puente se inclina.",
              ],
            },
          ],
        },
      ],
      faqs: [
        {
          question: "¿Puedo afinar en Drop C con cuerdas normales?",
          answer:
            "Se puede, pero la sexta cuerda quedará floja: trasteará y desafinará al pulsar fuerte. Para tocar habitualmente en Drop C conviene un calibre más grueso.",
        },
        {
          question: "¿El Drop C es lo mismo que afinar en Do?",
          answer:
            "No. La afinación en Do (Do Fa Si♭ Mi♭ Sol Do) baja todas las cuerdas dos tonos. En Drop C solo la sexta llega a Do; las demás quedan un tono por debajo del estándar.",
        },
        {
          question: "¿Por qué el afinador tarda en leer la sexta cuerda?",
          answer:
            "El Do grave vibra a 65.41 Hz, cerca del límite de lo que captan bien los micrófonos de móviles y portátiles. Pulsa con firmeza, acerca el móvil a la guitarra y apaga las demás cuerdas.",
        },
      ],
    },
    "/drop-c-sharp-tuner": {
      metaTitle: "Afinador Drop C# online gratis",
      metaDescription: "Afina tu guitarra en Drop C# (Do♯ Sol♯ Do♯ Fa♯ La♯ Re♯), también llamado Drop D♭, con el micrófono. Gratis, sin descargas y con frecuencias exactas.",
      title: "Afinador Drop C♯",
      intro: "Afina en Drop C♯ con el micrófono: el afinador ya está configurado en Do♯ Sol♯ Do♯ Fa♯ La♯ Re♯. Toca una cuerda y sigue la aguja.",
      sections: [
        {
          heading: "Qué es el Drop C♯",
          body: [
            "El Drop C♯ es el **Drop D medio tono más abajo**. Todas las cuerdas bajan un semitono respecto al Drop D, así que las relaciones entre cuerdas no cambian y cualquier riff o power chord de Drop D se toca igual. También se escribe Drop D♭: son las mismas notas con otro nombre.",
            "Desde la afinación de medio tono abajo (Mi♭ La♭ Re♭ Sol♭ Si♭ Mi♭) solo hay que **bajar la sexta cuerda un tono**, hasta Do♯ (69.30 Hz). Por eso es la afinación drop natural para los grupos que ya tocan en Mi♭.",
          ],
        },
        {
          heading: "Cuerdas",
          body: [
            "Las cinco cuerdas agudas solo bajan un semitono y conservan cerca del **89 % de su tensión**; la sexta baja tres semitonos y se queda en torno al **71 %**. Un juego de calibre 10 funciona, pero muchos guitarristas usan un **10–52** para que la sexta no quede floja.",
            {
              list: [
                "Si cambias de calibre, revisa la **octavación** al terminar.",
                "Con puente flotante (trémolo), reajusta los muelles: al bajar la tensión, el puente se inclina.",
              ],
            },
          ],
        },
      ],
      faqs: [
        {
          question: "¿Es lo mismo Drop C♯ que Drop D♭?",
          answer: "Sí. Do♯ y Re♭ son la misma nota, así que es la misma afinación escrita con sostenidos o con bemoles. En las tablaturas aparecen los dos nombres.",
        },
        {
          question: "¿Cómo paso de la afinación estándar a Drop C♯?",
          answer: "Baja las cuerdas 5 a 1 un semitono (La→Sol♯, Re→Do♯, Sol→Fa♯, Si→La♯, Mi→Re♯) y la sexta tres semitonos, de Mi a Do♯. Después repasa todas otra vez: al quitar tensión el mástil se mueve y las primeras se desafinan un poco.",
        },
        {
          question: "¿Por qué el afinador tarda en leer la sexta cuerda?",
          answer: "El Do♯ grave vibra a 69.30 Hz, y los micrófonos de móviles y portátiles captan mejor sus armónicos que la nota fundamental. Pulsa con firmeza, acerca el móvil y apaga las demás cuerdas.",
        },
      ],
    },
    "/drop-b-tuner": {
      metaTitle: "Afinador Drop B online gratis",
      metaDescription: "Afina tu guitarra en Drop B (Si Fa♯ Si Mi Sol♯ Do♯) con el micrófono. Afinador online gratis, con frecuencias exactas y consejos de cuerdas y ajuste.",
      title: "Afinador Drop B",
      intro: "Afina en Drop B con el micrófono: el afinador ya está configurado en Si Fa♯ Si Mi Sol♯ Do♯. Toca una cuerda y sigue la aguja.",
      sections: [
        {
          heading: "Qué es el Drop B",
          body: [
            "El Drop B es el **Drop D tres semitonos más abajo**: las cinco cuerdas agudas bajan un tono y medio y la sexta baja **cinco semitonos**, de Mi a Si (61.74 Hz). Las formas de Drop D funcionan igual, solo que suenan mucho más graves.",
            "Ese Si grave es la misma nota que la séptima cuerda de una guitarra de 7 cuerdas, por eso el Drop B es la forma más común de llegar a ese registro con una guitarra de seis. Es muy habitual en el metal moderno y el metalcore.",
          ],
        },
        {
          heading: "Cuerdas y ajuste",
          body: [
            "Es una bajada grande: las cuerdas 1 a 5 se quedan con cerca del **71 % de su tensión** y la sexta con un **56 %**. Con un juego normal de calibre 10, la sexta trastea y se mueve a la vista. En una escala de 25.5 pulgadas lo habitual es **12–56** como mínimo, o **13–62**.",
            {
              list: [
                "Comprueba que la cuerda gruesa entra en la **cejuela**: una .056 o .062 puede no caber en una ranura hecha para una .046.",
                "Revisa la **curvatura del mástil** y sube un poco la **acción** en el lado de los graves.",
                "Ajusta la **octavación**: con cuerdas más gruesas, las selletas van más atrás.",
              ],
            },
          ],
        },
      ],
      faqs: [
        {
          question: "¿Puedo usar Drop B con cuerdas normales?",
          answer: "Se puede afinar, pero la sexta cuerda quedará tan floja que trasteará y se desafinará al tocar. Para Drop B conviene un juego específico para afinaciones graves o una guitarra barítono.",
        },
        {
          question: "¿Qué diferencia hay entre Drop B y una guitarra de 7 cuerdas?",
          answer: "La guitarra de 7 cuerdas añade un Si grave y mantiene las otras seis en afinación estándar (Si Mi La Re Sol Si Mi). El Drop B consigue el mismo Si grave con seis cuerdas, pero todas las demás bajan un tono y medio.",
        },
        {
          question: "¿El móvil puede detectar un Si tan grave?",
          answer: "Normalmente sí, con paciencia. A 61.74 Hz la fundamental llega débil a los micrófonos pequeños. Pulsa con fuerza, acerca el móvil a la guitarra, apaga las demás cuerdas y espera a que la lectura se estabilice.",
        },
      ],
    },
    "/dadgad-tuner": {
      metaTitle: "Afinador DADGAD online gratis",
      metaDescription:
        "Afina tu guitarra en DADGAD (Re La Re Sol La Re) con el micrófono. La afinación celta, con las frecuencias exactas de cada cuerda.",
      title: "Afinador DADGAD",
      intro:
        "Afina en DADGAD con el micrófono: el afinador ya está configurado en Re La Re Sol La Re. Solo cambian tres cuerdas.",
      sections: [
        {
          heading: "De estándar a DADGAD",
          body: [
            "Desde la afinación estándar solo hay que **bajar un tono tres cuerdas**: la sexta de Mi a Re, la segunda de Si a La y la primera de Mi a Re. La quinta, la cuarta y la tercera se quedan igual.",
            "El resultado al aire es un acorde de Re suspendido (Dsus4): ni mayor ni menor. Esa ambigüedad es lo que da a DADGAD su sonido abierto y modal.",
          ],
        },
        {
          heading: "Para qué se usa",
          body: [
            "Es la afinación de referencia de la **música celta** en guitarra y del fingerstyle acústico. Las cuerdas al aire suenan como un bordón (drone) bajo la melodía, y muchas melodías se pueden tocar en las dos cuerdas agudas dejando sonar el resto.",
            "También aparece en el rock: «Kashmir» de Led Zeppelin está en DADGAD.",
          ],
        },
      ],
      faqs: [
        {
          question: "¿Necesito cuerdas especiales para DADGAD?",
          answer:
            "No. Bajar tres cuerdas un tono reduce un poco la tensión, pero cualquier juego normal funciona bien.",
        },
        {
          question: "¿Qué acordes funcionan bien en DADGAD?",
          answer:
            "Los que se apoyan en Re y Sol: Re, Sol, La y Mi menor con formas que dejan sonar las cuerdas al aire. Con cejilla en el traste 2, todo sube a Mi; en el traste 5, a Sol.",
        },
        {
          question: "¿Cómo vuelvo a la afinación estándar?",
          answer:
            "Sube la sexta y la primera cuerda a Mi y la segunda a Si. En el panel Afinación del afinador puedes elegir Estándar y seguir la aguja.",
        },
      ],
    },
    "/open-g-tuner": {
      metaTitle: "Afinador en Sol abierto (Open G) gratis",
      metaDescription:
        "Afina tu guitarra en Sol abierto (Re Sol Re Sol Si Re) con el micrófono. La afinación del slide y del blues, con las frecuencias exactas.",
      title: "Afinador en Sol abierto (Open G)",
      intro:
        "Afina en Sol abierto con el micrófono: el afinador ya está configurado en Re Sol Re Sol Si Re. Al aire, la guitarra suena un acorde de Sol mayor.",
      sections: [
        {
          heading: "Cómo pasar de estándar a Sol abierto",
          body: [
            "Se **bajan tres cuerdas un tono**: la sexta de Mi a Re, la quinta de La a Sol y la primera de Mi a Re. La cuarta (Re), la tercera (Sol) y la segunda (Si) no cambian.",
            "Como se baja la tensión en vez de subirla, es una afinación segura para cualquier guitarra y juego de cuerdas.",
          ],
        },
        {
          heading: "Por qué se usa tanto",
          body: [
            "Con todas las cuerdas formando un acorde mayor, **una cejilla recta en cualquier traste es otro acorde mayor**: traste 5 para Do, traste 7 para Re. Eso la hace perfecta para el **slide** (bottleneck), que solo puede tocar acordes rectos.",
            "Es la afinación del blues del Delta y de muchos riffs de Keith Richards, que además quita la sexta cuerda y toca con cinco.",
          ],
        },
      ],
      faqs: [
        {
          question: "¿Sol abierto daña la guitarra?",
          answer:
            "No. Solo se aflojan cuerdas, así que la tensión total baja. Es de las afinaciones alternativas más seguras.",
        },
        {
          question: "¿Qué diferencia hay entre Sol abierto y Re abierto?",
          answer:
            "Sol abierto (Re Sol Re Sol Si Re) forma un acorde de Sol mayor; Re abierto (Re La Re Fa♯ La Re) forma uno de Re mayor. Re abierto suena más grave y profundo; Sol abierto, más brillante.",
        },
        {
          question: "¿Cómo se toca un acorde menor en Sol abierto?",
          answer:
            "Baja un semitono la nota de la tercera del acorde, que está en la segunda cuerda: por ejemplo, con cejilla en el traste 5 (Do), pisa la segunda cuerda en el traste 4 para Do menor.",
        },
      ],
    },
    "/open-d-tuner": {
      metaTitle: "Afinador en Re abierto (Open D) gratis",
      metaDescription:
        "Afina tu guitarra en Re abierto (Re La Re Fa♯ La Re) con el micrófono. Afinación de slide y fingerstyle, con frecuencias exactas.",
      title: "Afinador en Re abierto (Open D)",
      intro:
        "Afina en Re abierto con el micrófono: el afinador ya está configurado en Re La Re Fa♯ La Re. Al aire suena un acorde de Re mayor.",
      sections: [
        {
          heading: "De estándar a Re abierto",
          body: [
            {
              list: [
                "Sexta cuerda: de Mi a **Re** (un tono abajo).",
                "Tercera cuerda: de Sol a **Fa♯** (medio tono abajo).",
                "Segunda cuerda: de Si a **La** (un tono abajo).",
                "Primera cuerda: de Mi a **Re** (un tono abajo).",
              ],
            },
            "La quinta (La) y la cuarta (Re) no cambian. En la pantalla el Fa♯ puede aparecer como Fa♯ o, en otras herramientas, como Sol♭: es la misma nota.",
          ],
        },
        {
          heading: "Un sonido grande y grave",
          body: [
            "Re abierto tiene dos Re graves y suena amplio y resonante. Es la afinación clásica del slide en el blues (también llamada **Vestapol**) y una favorita del fingerstyle, porque las cuerdas al aire dan un bajo continuo de Re bajo cualquier melodía.",
            "Igual que en Sol abierto, una cejilla recta da acordes mayores: traste 5 para Sol, traste 7 para La.",
          ],
        },
      ],
      faqs: [
        {
          question: "¿Re abierto y Mi abierto son la misma afinación?",
          answer:
            "Tienen la misma forma, pero Mi abierto está un tono más alto. Muchos guitarristas prefieren Re abierto con cejilla en el traste 2 en lugar de subir la tensión hasta Mi abierto.",
        },
        {
          question: "¿Necesito cuerdas más gruesas?",
          answer:
            "No. Re abierto baja la tensión de cuatro cuerdas. Si tocas con slide, un calibre algo más grueso ayuda a que el slide no golpee los trastes.",
        },
        {
          question: "¿Cuál es la diferencia con DADGAD?",
          answer:
            "Solo la tercera cuerda: en Re abierto es Fa♯ (acorde mayor); en DADGAD es Sol (acorde suspendido). Pasar de una a otra es cuestión de medio tono.",
        },
      ],
    },
    "/open-e-tuner": {
      metaTitle: "Afinador en Mi abierto (Open E) gratis",
      metaDescription:
        "Afina tu guitarra en Mi abierto (Mi Si Mi Sol♯ Si Mi) con el micrófono. Afinación de slide eléctrico, con las frecuencias exactas.",
      title: "Afinador en Mi abierto (Open E)",
      intro:
        "Afina en Mi abierto con el micrófono: el afinador ya está configurado en Mi Si Mi Sol♯ Si Mi. Al aire suena un acorde de Mi mayor.",
      sections: [
        {
          heading: "De estándar a Mi abierto",
          body: [
            "Mi abierto **sube** tres cuerdas en lugar de bajarlas: la quinta de La a **Si** (un tono), la cuarta de Re a **Mi** (un tono) y la tercera de Sol a **Sol♯** (medio tono). La sexta, la segunda y la primera se quedan igual.",
            "Subir cuerdas aumenta la tensión del mástil. Sube despacio, vigilando la aguja, y no te pases de la nota.",
          ],
        },
        {
          heading: "Mi abierto o Re abierto con cejilla",
          body: [
            "La forma de Mi abierto es idéntica a la de Re abierto, un tono más alta. Muchos guitarristas afinan en **Re abierto y ponen la cejilla en el traste 2**: suena en Mi sin forzar la guitarra.",
            "Quien usa Mi abierto directamente suele hacerlo en guitarra eléctrica y con slide, donde el brillo y la tensión extra ayudan: es el sonido de Duane Allman y Derek Trucks.",
          ],
        },
      ],
      faqs: [
        {
          question: "¿Mi abierto es peligroso para la guitarra?",
          answer:
            "No suele serlo con cuerdas normales, pero añade tensión. En guitarras acústicas antiguas o con cuerdas gruesas, es más prudente usar Re abierto con cejilla en el traste 2.",
        },
        {
          question: "¿Por qué se me rompe la tercera cuerda?",
          answer:
            "Al subirla de Sol a Sol♯ trabaja más cerca de su límite. Sube despacio y comprueba que la cejuela no la pellizca.",
        },
        {
          question: "¿Qué acordes da una cejilla recta?",
          answer:
            "Acordes mayores: traste 5 para La y traste 7 para Si. Junto con las cuerdas al aire (Mi), cubren el blues en Mi.",
        },
      ],
    },
    "/open-c-tuner": {
      metaTitle: "Afinador en Do abierto (Open C) gratis",
      metaDescription:
        "Afina tu guitarra en Do abierto (Do Sol Do Sol Do Mi) con el micrófono. La afinación abierta más grave, con frecuencias exactas.",
      title: "Afinador en Do abierto (Open C)",
      intro:
        "Afina en Do abierto con el micrófono: el afinador ya está configurado en Do Sol Do Sol Do Mi. Al aire suena un acorde de Do mayor muy grave.",
      sections: [
        {
          heading: "De estándar a Do abierto",
          body: [
            {
              list: [
                "Sexta: de Mi a **Do** (dos tonos abajo).",
                "Quinta: de La a **Sol** (un tono abajo).",
                "Cuarta: de Re a **Do** (un tono abajo).",
                "Tercera: **Sol**, sin cambios.",
                "Segunda: de Si a **Do** (medio tono arriba).",
                "Primera: **Mi**, sin cambios.",
              ],
            },
            "La sexta baja hasta 65.41 Hz y queda muy floja con un juego normal; si vas a usar Do abierto a menudo, conviene una sexta más gruesa.",
          ],
        },
        {
          heading: "Un sonido de piano",
          body: [
            "Con tres Do y dos Sol, el acorde al aire es enorme y resonante. Do abierto es muy usado en fingerstyle acústico y en composiciones instrumentales donde las cuerdas al aire hacen de bordón.",
            "Como el intervalo entre las cuerdas graves es amplio, las formas de acordes son nuevas para casi todo el mundo: es una afinación para explorar más que para trasladar canciones.",
          ],
        },
      ],
      faqs: [
        {
          question: "¿La sexta cuerda trastea en Do abierto?",
          answer:
            "Es lo habitual con un juego normal, porque baja dos tonos. Púlsala más suave o usa una cuerda más gruesa (0.056 o más).",
        },
        {
          question: "¿El afinador lee bien el Do grave?",
          answer:
            "A 65.41 Hz está cerca del límite de los micrófonos de móvil. Pulsa con firmeza y acerca el móvil a la boca de la guitarra.",
        },
        {
          question: "¿Qué diferencia hay con el Drop C?",
          answer:
            "En Drop C las cinco cuerdas agudas mantienen los intervalos de la afinación estándar; en Do abierto las seis forman un acorde de Do mayor.",
        },
      ],
    },
    "/open-a-tuner": {
      metaTitle: "Afinador en La abierto (Open A) gratis",
      metaDescription:
        "Afina tu guitarra en La abierto (Mi La Mi La Do♯ Mi) con el micrófono. Afinación de slide y blues, con frecuencias exactas.",
      title: "Afinador en La abierto (Open A)",
      intro:
        "Afina en La abierto con el micrófono: el afinador ya está configurado en Mi La Mi La Do♯ Mi. Al aire suena un acorde de La mayor.",
      sections: [
        {
          heading: "De estándar a La abierto",
          body: [
            "La abierto **sube** tres cuerdas: la cuarta de Re a **Mi** (un tono), la tercera de Sol a **La** (un tono) y la segunda de Si a **Do♯** (un tono). La sexta, la quinta y la primera no cambian.",
            "Es la misma forma que Sol abierto, un tono más alta. Muchos prefieren afinar en **Sol abierto con cejilla en el traste 2**, que suena igual sin subir la tensión.",
          ],
        },
        {
          heading: "El La del blues",
          body: [
            "La es una de las tonalidades más comunes del blues, y La abierto permite tocar slide en ella con todas las cuerdas al aire sonando. Una cejilla recta en el traste 5 da Re y en el 7 da Mi: los tres acordes del blues en La.",
          ],
        },
      ],
      faqs: [
        {
          question: "¿La abierto tensa demasiado el mástil?",
          answer:
            "Añade tensión en tres cuerdas. Con cuerdas ligeras suele ir bien; con cuerdas gruesas o en una acústica delicada, mejor Sol abierto con cejilla en el 2.",
        },
        {
          question: "¿Qué cuerda suele romperse?",
          answer:
            "La segunda, al subirla de Si a Do♯. Súbela despacio y sin pasarte de la nota.",
        },
        {
          question: "¿Puedo usar los mismos riffs de Sol abierto?",
          answer:
            "Sí, todas las formas de Sol abierto funcionan igual en La abierto; solo suenan un tono más agudas.",
        },
      ],
    },
    "/half-step-down-tuner": {
      metaTitle: "Afinador medio tono abajo (Mi♭) gratis",
      metaDescription:
        "Afina tu guitarra medio tono abajo (Mi♭ La♭ Re♭ Sol♭ Si♭ Mi♭) con el micrófono. Como Hendrix y SRV. Online, gratis y sin descargas.",
      title: "Afinador medio tono abajo",
      intro:
        "Afina tu guitarra medio tono abajo con el micrófono: el afinador ya está configurado. En pantalla las notas aparecen con sostenidos (Re♯ Sol♯ Do♯ Fa♯ La♯ Re♯), que son las mismas que Mi♭ La♭ Re♭ Sol♭ Si♭ Mi♭.",
      sections: [
        {
          heading: "Qué cambia",
          body: [
            "Todas las cuerdas bajan **un semitono**. Los intervalos entre cuerdas son exactamente los de la afinación estándar, así que **todas las formas de acordes y escalas son iguales**; solo suenan medio tono más graves.",
            "La tensión baja un poco, lo que hace los bends más fáciles y el sonido algo más grueso. Es la afinación de Jimi Hendrix, Stevie Ray Vaughan, Van Halen y Guns N’ Roses.",
          ],
        },
        {
          heading: "Para cantantes",
          body: [
            "Bajar medio tono también ayuda a la voz: una canción que queda un poco alta se vuelve cómoda sin cambiar ni un acorde. Es una solución habitual en bandas en directo.",
            "Si quieres tocar con alguien en afinación estándar, una cejilla en el traste 1 te devuelve al estándar.",
          ],
        },
      ],
      faqs: [
        {
          question: "¿Por qué el afinador muestra Re♯ en vez de Mi♭?",
          answer:
            "Son la misma nota con dos nombres (enarmónicos). El afinador usa sostenidos; las partituras de canciones afinadas medio tono abajo suelen usar bemoles.",
        },
        {
          question: "¿Necesito cuerdas diferentes?",
          answer:
            "No. Medio tono menos de tensión funciona bien con cualquier juego. Algunos guitarristas suben un calibre para recuperar la sensación de tensión.",
        },
        {
          question: "¿Cómo vuelvo a la afinación estándar?",
          answer:
            "Sube todas las cuerdas un semitono. En el panel Afinación del afinador, elige Estándar y sigue la aguja cuerda por cuerda.",
        },
      ],
    },
    "/full-step-down-tuner": {
      metaTitle: "Afinador un tono abajo (Re estándar)",
      metaDescription:
        "Afina tu guitarra un tono abajo (Re Sol Do Fa La Re) con el micrófono. Más peso sin aprender formas nuevas. Online y gratis.",
      title: "Afinador un tono abajo",
      intro:
        "Afina tu guitarra un tono abajo (Re estándar) con el micrófono: el afinador ya está configurado en Re Sol Do Fa La Re.",
      sections: [
        {
          heading: "Qué cambia",
          body: [
            "Todas las cuerdas bajan **un tono entero**: Mi pasa a Re, La a Sol, Re a Do, Sol a Fa, Si a La y Mi a Re. Los intervalos no cambian, así que **los acordes y escalas se tocan igual** y suenan un tono más graves.",
            "Es habitual en el grunge, el stoner y el metal, y también entre cantautores que buscan una tonalidad más cómoda para la voz.",
          ],
        },
        {
          heading: "Cuerdas y tensión",
          body: [
            "Un tono menos de tensión se nota. Con un juego de calibre 9 o 10 las cuerdas pueden quedar flojas y trastear; muchos guitarristas pasan a **11 o 12** para esta afinación.",
            "Después de cambiar de calibre, revisa la curvatura del mástil y la octavación.",
          ],
        },
      ],
      faqs: [
        {
          question: "¿Es lo mismo que Drop D?",
          answer:
            "No. En Drop D solo baja la sexta cuerda. En la afinación un tono abajo bajan las seis, y la sexta queda en Re igualmente, pero el resto también cambia.",
        },
        {
          question: "¿Cómo toco con alguien en afinación estándar?",
          answer:
            "Pon una cejilla en el traste 2: vuelves a sonar en la afinación estándar.",
        },
        {
          question: "¿Por qué el afinador marca Do y Fa en la cuarta y tercera?",
          answer:
            "Porque al bajar un tono, Re pasa a Do y Sol a Fa. Es correcto: la afinación completa es Re Sol Do Fa La Re.",
        },
      ],
    },
    "/432-hz-tuner": {
      metaTitle: "Afinador 432 Hz online gratis",
      metaDescription:
        "Afina tu guitarra en La = 432 Hz con el micrófono. Todas las cuerdas se recalculan automáticamente. Gratis, online y sin descargas.",
      title: "Afinador 432 Hz",
      intro:
        "Afina en La = 432 Hz con el micrófono. El afinador ya está configurado a 432: toca una cuerda y sigue la aguja; todos los objetivos están recalculados.",
      sections: [
        {
          heading: "Qué significa afinar a 432 Hz",
          body: [
            "El diapasón estándar fija el La4 en 440 Hz. A 432 Hz, **todas las notas bajan en la misma proporción**, unos 31.8 cents (casi un tercio de semitono). Los intervalos no cambian: los acordes, escalas y tablaturas funcionan igual.",
            "En la guitarra, el Mi grave pasa de 82.41 Hz a 80.91 Hz, y el Mi agudo de 329.63 Hz a 323.63 Hz. La tensión de las cuerdas baja alrededor de un 3.6 %, mucho menos que al afinar medio tono abajo.",
          ],
        },
        {
          heading: "Lo que se sabe y lo que no",
          body: [
            "Muchos músicos describen el sonido a 432 Hz como más cálido, y es una preferencia válida. Las afirmaciones de que es más sano o más natural no se han confirmado en pruebas a ciegas: la mayoría de la gente no distingue 432 de 440 sin una referencia.",
            "Ten en cuenta que, a 432, sonarás **desafinado frente a grabaciones y otros músicos** que tocan a 440.",
            "En el panel de ajustes del afinador puedes elegir cualquier diapasón entre 415 y 466 Hz, por ejemplo 442 para orquestas.",
          ],
        },
      ],
      faqs: [
        {
          question: "¿Sirve para bajo, ukelele o violín?",
          answer:
            "Sí. Elige tu instrumento en el panel de ajustes, debajo del afinador; el diapasón se queda en 432 y todas las cuerdas se recalculan.",
        },
        {
          question: "¿432 Hz es mejor que 440 Hz?",
          answer:
            "Es cuestión de gusto. No hay pruebas sólidas de beneficios para la salud; si te gusta cómo suena tu instrumento un poco más grave, es motivo suficiente.",
        },
        {
          question: "¿Cuánto tengo que girar las clavijas?",
          answer:
            "Si venías de 440, cada cuerda está unos 32 cents alta: un giro pequeño, menos de un tercio del camino hasta el semitono inferior.",
        },
      ],
    },
    "/5-string-bass-tuner": {
      metaTitle: "Afinador de bajo de 5 cuerdas gratis",
      metaDescription:
        "Afina tu bajo de 5 cuerdas (Si Mi La Re Sol) con el micrófono, incluido el Si grave de 30.87 Hz. Online, gratis y sin descargas.",
      title: "Afinador de bajo de 5 cuerdas",
      intro:
        "Afina tu bajo de 5 cuerdas con el micrófono: el afinador ya está configurado en Si Mi La Re Sol. Pulsa con firmeza y sigue la aguja.",
      sections: [
        {
          heading: "El Si grave",
          body: [
            "El bajo de 5 cuerdas añade un **Si grave (Si0, 30.87 Hz)** por debajo del Mi de un bajo de 4 cuerdas. Es una nota tan grave que los micrófonos de móviles y portátiles casi no captan su fundamental.",
            "Este afinador lo resuelve escuchando también los armónicos de la cuerda (el doble y el cuádruple de la frecuencia) y llevándolos de vuelta a la octava correcta. Para ayudarle:",
            {
              list: [
                "Pulsa con firmeza, cerca de la pastilla del mástil.",
                "Apaga las demás cuerdas con la mano.",
                "Acerca el móvil al bajo y afina con el amplificador apagado.",
              ],
            },
          ],
        },
        {
          heading: "Cuerdas y escala",
          body: [
            "Para que el Si tenga tensión suficiente se usan cuerdas de calibre 0.125 a 0.135 y, a menudo, bajos de **escala de 35 pulgadas**. En un bajo de escala corta, el Si puede quedar flojo y sonar poco definido aunque el afinador marque 0 cents.",
          ],
        },
      ],
      faqs: [
        {
          question: "¿Por qué la aguja tarda en estabilizarse en el Si?",
          answer:
            "Un ciclo del Si grave dura 32 milisegundos, y el afinador necesita varios ciclos para medirlo. Deja sonar la nota y lee la aguja tras el golpe inicial.",
        },
        {
          question: "¿Puedo afinar las otras cuerdas igual que en un bajo de 4?",
          answer:
            "Sí: Mi, La, Re y Sol tienen exactamente las mismas frecuencias que en un bajo de 4 cuerdas.",
        },
        {
          question: "¿Existe el bajo de 5 cuerdas con Do agudo?",
          answer:
            "Sí, algunos bajistas usan Mi La Re Sol Do. Este afinador está configurado para la versión con Si grave, que es la más común.",
        },
      ],
    },
    "/baritone-ukulele-tuner": {
      metaTitle: "Afinador de ukelele barítono gratis",
      metaDescription:
        "Afina tu ukelele barítono en Re Sol Si Mi con el micrófono, aquí mismo. Online, gratis y sin descargas.",
      title: "Afinador de ukelele barítono",
      intro:
        "Afina tu ukelele barítono con el micrófono: el afinador ya está configurado en Re Sol Si Mi, como las cuatro cuerdas agudas de la guitarra.",
      chartCaption:
        "Estas son las frecuencias exactas que busca el afinador, con La4 = 440 Hz. A diferencia del ukelele estándar, el barítono va en orden: la cuerda 4 (Re) es la más grave y la cuerda 1 (Mi) la más aguda.",
      sections: [
        {
          heading: "Barítono frente a ukelele estándar",
          body: [
            "El soprano, el concierto y el tenor se afinan **Sol Do Mi La** con el Sol agudo (afinación reentrante). El barítono, el más grande (unos 76 cm), se afina **Re Sol Si Mi** y en orden de grave a agudo, igual que una guitarra.",
            "Las formas de acordes son las mismas que en el ukelele estándar, pero suenan una cuarta más grave: la forma de Do del soprano da Sol en el barítono.",
          ],
        },
        {
          heading: "Si vienes de la guitarra",
          body: [
            "El barítono está afinado como las cuatro cuerdas agudas de la guitarra, así que **los acordes de guitarra en esas cuerdas conservan su nombre**: la forma de Sol en las cuatro cuerdas agudas es Sol en el barítono.",
            "Las cuerdas Re y Sol suelen ser entorchadas (con metal): es normal y da más cuerpo a los graves.",
          ],
        },
      ],
      faqs: [
        {
          question: "¿Puedo afinar el barítono en Sol Do Mi La?",
          answer:
            "Solo con cuerdas fabricadas para eso. Con cuerdas normales de barítono, subirlas a Sol Do Mi La las tensaría demasiado.",
        },
        {
          question: "¿Es una afinación reentrante?",
          answer:
            "No. La afinación estándar del barítono es lineal, con el Re grave (Re3) en la cuarta cuerda.",
        },
        {
          question: "¿El afinador marca el Re una octava más alto?",
          answer:
            "Está captando un armónico. Pulsa sobre la boca del instrumento y deja sonar la cuerda; el afinador corrige la octava cuando la cuerda coincide.",
        },
      ],
    },
    "/7-string-guitar-tuner": {
      metaTitle: "Afinador de guitarra de 7 cuerdas gratis",
      metaDescription:
        "Afina tu guitarra de 7 cuerdas (Si Mi La Re Sol Si Mi) con el micrófono, con el Si grave incluido. Online, gratis y sin descargas.",
      title: "Afinador de guitarra de 7 cuerdas",
      intro:
        "Afina tu guitarra de 7 cuerdas con el micrófono: el afinador ya está configurado en Si Mi La Re Sol Si Mi.",
      sections: [
        {
          heading: "La séptima cuerda",
          body: [
            "La guitarra de 7 cuerdas añade un **Si grave (Si1, 61.74 Hz)** por debajo del Mi. Las seis cuerdas restantes se afinan exactamente igual que en una guitarra normal, así que todo lo que ya sabes sigue valiendo.",
            "El Si está una cuarta por debajo del Mi, el mismo intervalo que entre casi todas las cuerdas: las formas de escalas se extienden de forma natural a la séptima cuerda.",
          ],
        },
        {
          heading: "Usos habituales",
          body: [
            "Es la guitarra del **metal moderno** y del djent, pero también del jazz (para líneas de bajo y acordes con bajo propio) y de la música brasileña: en el choro, la guitarra de 7 cuerdas tradicionalmente se afina con un **Do grave**, aunque el Si también es común.",
            "Una variante frecuente es el **Drop A** (La Mi La Re Sol Si Mi), bajando la séptima un tono.",
          ],
        },
      ],
      faqs: [
        {
          question: "¿Las seis cuerdas agudas cambian?",
          answer:
            "No. Mi La Re Sol Si Mi, igual que en cualquier guitarra de 6 cuerdas.",
        },
        {
          question: "¿Qué calibre necesita la séptima cuerda?",
          answer:
            "Normalmente entre 0.056 y 0.064 para Si en escala estándar. En guitarras de escala larga (multiescala o 26.5″) la cuerda queda más tensa y definida.",
        },
        {
          question: "¿El afinador lee bien el Si grave?",
          answer:
            "Sí, a 61.74 Hz. Si la aguja duda, pulsa con firmeza y apaga las demás cuerdas.",
        },
      ],
    },
    "/12-string-guitar-tuner": {
      metaTitle: "Afinador de guitarra de 12 cuerdas gratis",
      metaDescription:
        "Afina tu guitarra de 12 cuerdas con el micrófono: seis órdenes, cuatro en octavas y dos al unísono. Online, gratis y sin descargas.",
      title: "Afinador de guitarra de 12 cuerdas",
      intro:
        "Afina tu guitarra de 12 cuerdas con el micrófono: el afinador ya está configurado con las seis parejas de cuerdas (órdenes).",
      chartCaption:
        "Estas son las frecuencias exactas que busca el afinador, con La4 = 440 Hz. Cada fila es un orden de dos cuerdas. Los cuatro graves llevan una cuerda una octava más aguda; los dos agudos (Si y Mi) van al unísono.",
      sections: [
        {
          heading: "Cómo se afina una 12 cuerdas",
          body: [
            "Las doce cuerdas forman **seis órdenes** con las notas de la afinación estándar. En los órdenes de Mi, La, Re y Sol, la segunda cuerda es **una octava más aguda**; en Si y Mi, las dos cuerdas son **iguales (unísono)**.",
            "Afina **cada cuerda por separado**: apaga su pareja con un dedo y pulsa solo una. Si suenan las dos a la vez, el afinador oye dos notas y la aguja no se estabiliza.",
          ],
        },
        {
          heading: "Tensión y mástil",
          body: [
            "Doce cuerdas tiran del mástil con casi el doble de fuerza. Por eso muchos guitarristas afinan su 12 cuerdas **medio tono o un tono abajo** y usan cejilla. Si tu guitarra es antigua o el puente se levanta, es una buena idea.",
            "Al terminar, toca cada orden completo: si oyes un batido rápido entre las dos cuerdas, una de ellas sigue desafinada.",
          ],
        },
      ],
      faqs: [
        {
          question: "¿Por qué los órdenes de Si y Mi no van en octava?",
          answer:
            "Porque una cuerda una octava por encima del Mi agudo estaría al límite de rotura. Por eso se usan cuerdas iguales.",
        },
        {
          question: "¿En qué orden afino las doce cuerdas?",
          answer:
            "Primero la cuerda principal de cada orden, de grave a agudo, y después las cuerdas de octava o unísono. Termina con una segunda pasada.",
        },
        {
          question: "¿Puedo usar afinaciones alternativas?",
          answer:
            "Sí, pero con cuidado: subir cuerdas en una 12 cuerdas añade mucha tensión. Las afinaciones que bajan cuerdas, como Drop D o Re abierto, son las más seguras.",
        },
      ],
    },
    "/mandolin-tuner": {
      metaTitle: "Afinador de mandolina online gratis",
      metaDescription:
        "Afina tu mandolina en Sol Re La Mi con el micrófono: las ocho cuerdas, pareja por pareja. Online, gratis y sin descargas.",
      title: "Afinador de mandolina",
      intro:
        "Afina tu mandolina con el micrófono: el afinador ya está configurado en Sol Re La Mi. Afina cada cuerda de la pareja por separado.",
      chartCaption:
        "Estas son las frecuencias exactas que busca el afinador, con La4 = 440 Hz. Cada fila es una pareja de cuerdas afinadas al unísono, así que las dos comparten el mismo objetivo.",
      sections: [
        {
          heading: "Cuatro parejas al unísono",
          body: [
            "La mandolina tiene **ocho cuerdas en cuatro parejas**, y las dos cuerdas de cada pareja se afinan en la misma nota: Sol3, Re4, La4 y Mi5. Son exactamente las mismas notas que el violín, por eso muchos violinistas se pasan a la mandolina con facilidad.",
            "**Afina una cuerda cada vez**: apoya un dedo en su pareja para apagarla. Si suenan las dos, el afinador oye dos notas casi iguales y la aguja oscila.",
          ],
        },
        {
          heading: "El puente flotante",
          body: [
            "En casi todas las mandolinas el puente no está pegado: lo sujeta la presión de las cuerdas. Si se mueve, las cuerdas al aire pueden estar afinadas y las notas pisadas sonar desafinadas.",
            "Cambia las cuerdas de una en una para que el puente no se desplace, y comprueba que la nota del traste 12 sea exactamente una octava sobre la cuerda al aire.",
          ],
        },
      ],
      faqs: [
        {
          question: "¿Cómo sé que las dos cuerdas de una pareja coinciden?",
          answer:
            "Tócalas juntas: si suena limpio y estable, coinciden. Si oyes una ondulación, una está desafinada; cuanto más rápida, más diferencia.",
        },
        {
          question: "¿Sirve para mandola u octava mandolina?",
          answer:
            "No. La mandola se afina Do Sol Re La (como la viola) y la octava mandolina Sol Re La Mi una octava más grave. Para la mandola, usa el afinador de viola.",
        },
        {
          question: "¿Por qué se rompen las cuerdas Mi?",
          answer:
            "Son finas y van muy tensas. Súbelas despacio, acercándote a la nota desde abajo, y revisa que la cejuela y el puente no tengan bordes cortantes.",
        },
      ],
    },
    "/banjo-tuner": {
      metaTitle: "Afinador de banjo de 5 cuerdas gratis",
      metaDescription:
        "Afina tu banjo de 5 cuerdas en Sol abierto (Sol Re Sol Si Re) con el micrófono, incluida la quinta cuerda corta. Online y gratis.",
      title: "Afinador de banjo",
      intro:
        "Afina tu banjo de 5 cuerdas con el micrófono: el afinador ya está configurado en Sol abierto (Sol Re Sol Si Re), con la quinta cuerda aguda.",
      chartCaption:
        "Estas son las frecuencias exactas que busca el afinador, con La4 = 440 Hz. La cuerda 5 (la corta, con la clavija a media altura del mástil) no es la más grave: es un Sol4 agudo.",
      sections: [
        {
          heading: "La quinta cuerda",
          body: [
            "El banjo de 5 cuerdas tiene una **cuerda corta** que empieza en el traste 5 y se afina en **Sol4**, más aguda que todas las demás cuerdas al aire. Funciona como bordón: en los rasgueos y arpegios del bluegrass, el pulgar vuelve a ella una y otra vez.",
            "Su clavija está en el lateral del mástil y es fácil moverla sin querer al guardar el banjo. Compruébala cada vez que lo saques del estuche.",
          ],
        },
        {
          heading: "Otras afinaciones del banjo",
          body: [
            {
              list: [
                "**Do doble** (Sol Do Sol Do Re): baja la cuarta y la segunda cuerda un tono. Muy usada en clawhammer.",
                "**Sol modal** (Sol Re Sol Do Re): sube la segunda de Si a Do. Sonido antiguo y misterioso.",
                "**Re abierto** (Fa♯ Re Fa♯ La Re): para tocar en Re sin cejilla.",
              ],
            },
            "Este afinador mide los cents respecto a Sol abierto; para las demás, la pantalla muestra el nombre de la nota que tocas.",
          ],
        },
      ],
      faqs: [
        {
          question: "¿Cómo uso la cejilla con la quinta cuerda?",
          answer:
            "La quinta debe subir lo mismo que las demás: con cejilla en el traste 2 (La), afina la quinta a La4. Muchos banjos tienen pequeños clavos («railroad spikes») para engancharla.",
        },
        {
          question: "¿Sirve para banjo tenor de 4 cuerdas?",
          answer:
            "No. El banjo tenor se afina Do Sol Re La (igual que la viola), así que puedes usar el afinador de viola.",
        },
        {
          question: "¿Al aire está afinado pero los trastes no?",
          answer:
            "El puente del banjo no está fijo y puede moverse. La posición correcta hace que el traste 12 suene exactamente una octava sobre la cuerda al aire.",
        },
      ],
    },
    "/viola-tuner": {
      metaTitle: "Afinador de viola online gratis",
      metaDescription:
        "Afina tu viola en Do Sol Re La con el micrófono, aquí mismo. Para todos los tamaños, sin descargas. Gratis.",
      title: "Afinador de viola",
      intro:
        "Afina tu viola con el micrófono: el afinador ya está configurado en Do Sol Re La. Empieza por el La y sigue la aguja.",
      sections: [
        {
          heading: "La viola, el violín y el violonchelo",
          body: [
            {
              list: [
                "**Violín**: Sol3 Re4 La4 Mi5.",
                "**Viola**: Do3 Sol3 Re4 La4, una quinta por debajo del violín.",
                "**Violonchelo**: Do2 Sol2 Re3 La3, una octava por debajo de la viola.",
              ],
            },
            "La viola comparte con el violín las cuerdas Sol, Re y La y añade un **Do grave** (130.81 Hz). Esa cuerda es la que le da su voz oscura y cálida, y también la que más cuesta estabilizar tras cambiar cuerdas.",
          ],
        },
        {
          heading: "Clavijas, microafinadores y puente",
          body: [
            "Usa los **microafinadores** del cordal para correcciones pequeñas y las clavijas solo cuando la cuerda está muy lejos. Gira las clavijas empujándolas suavemente hacia dentro para que no se suelten.",
            "Tras afinar mucho con clavijas, mira el puente de perfil: debe quedar más o menos perpendicular a la tapa. Si se inclina hacia el diapasón, pide ayuda a tu profesor o luthier para enderezarlo.",
          ],
        },
      ],
      faqs: [
        {
          question: "¿Puedo usar un afinador de violín para la viola?",
          answer:
            "Para Sol, Re y La sí, pero un afinador de violín busca un Mi5 y no tiene Do3. Este afinador está configurado con las cuatro cuerdas de la viola.",
        },
        {
          question: "¿Por qué al afinador le cuesta leer el Do?",
          answer:
            "Es la nota más grave del instrumento y algunos micrófonos captan poco a esa frecuencia. Toca con un arco firme y lento, o en pizzicato, y acerca el móvil.",
        },
        {
          question: "Mi orquesta afina a La = 442. ¿Qué hago?",
          answer:
            "Cambia el diapasón a 442 en el panel de ajustes del afinador, o afina cada cuerda unos 8 cents por encima de 0.",
        },
      ],
    },
    "/cello-tuner": {
      metaTitle: "Afinador de violonchelo online gratis",
      metaDescription:
        "Afina tu violonchelo en Do Sol Re La con el micrófono, incluido el Do grave de 65.41 Hz. Online, gratis y sin descargas.",
      title: "Afinador de violonchelo",
      intro:
        "Afina tu violonchelo con el micrófono: el afinador ya está configurado en Do Sol Re La. Empieza por el La y sigue la aguja.",
      chartCaption:
        "Estas son las frecuencias exactas que busca el afinador, con La4 = 440 Hz. La cuerda 1 es el La3 (220 Hz), una octava por debajo del La de la orquesta.",
      sections: [
        {
          heading: "Dónde poner el móvil",
          body: [
            "El Do grave del violonchelo vibra a **65.41 Hz** y el Sol a 98 Hz, cerca del límite de lo que captan bien los micrófonos de móvil. Coloca el móvil en el atril o en el suelo, cerca del cuerpo del instrumento, no al otro lado de la sala.",
            "Toca con un arco largo, lento y firme cerca del diapasón. Si el afinador muestra Sol cuando tocas el Do, está captando un armónico: acerca el móvil y suaviza el arco.",
          ],
        },
        {
          heading: "Clavijas, microafinadores y pica",
          body: [
            "Usa los **microafinadores** para el ajuste diario; muchos violonchelos los tienen en las cuatro cuerdas. Las clavijas, solo para cambios grandes, con presión firme hacia dentro del clavijero.",
            "Coloca la pica y siéntate en tu posición antes de afinar: si afinas en una postura incómoda y luego te recolocas, es fácil mover una clavija sin querer.",
          ],
        },
      ],
      faqs: [
        {
          question: "¿Por qué el afinador muestra La3 y no La4?",
          answer:
            "Porque la cuerda La del violonchelo es La3, a 220 Hz: una octava por debajo del La de 440 Hz de la orquesta.",
        },
        {
          question: "¿Los violonchelos pequeños se afinan igual?",
          answer:
            "Sí. Los tamaños 7/8, 3/4, 1/2, 1/4 y 1/8 se afinan en el mismo Do Sol Re La.",
        },
        {
          question: "¿El violonchelo se desafina al sacarlo del estuche?",
          answer:
            "Suele ser por la temperatura. Déjalo unos minutos fuera del estuche para que se adapte a la sala antes de afinar.",
        },
      ],
    },
    "/cavaquinho-tuner": {
      metaTitle: "Afinador de cavaquinho online gratis",
      metaDescription:
        "Afina tu cavaquinho en Re Sol Si Re con el micrófono, directamente en el navegador. La afinación estándar del samba y el choro. Gratis y sin descargas.",
      title: "Afinador de cavaquinho",
      intro:
        "Afina tu cavaquinho con el micrófono: el afinador ya está en Re Sol Si Re (D G B D). Toca una cuerda cada vez y gira la clavija hasta que la aguja quede en el centro.",
      chartCaption:
        "Estas son las frecuencias exactas que busca el afinador, con La4 = 440 Hz. La cuerda 1 es el Re agudo, una octava por encima de la cuerda 4.",
      sections: [
        {
          heading: "Re Sol Si Re: la afinación estándar",
          body: [
            "El cavaquinho es un pequeño instrumento de cuatro cuerdas de acero, llegado a Brasil desde Portugal. Su afinación estándar es **Re Sol Si Re** (D G B D), de la cuarta cuerda a la primera: Re4, Sol4, Si4 y Re5. Al aire forman un acorde de **Sol mayor**.",
            "Para comprobarlo de oído: el traste 5 de la cuerda 4 es Sol y debe sonar igual que la cuerda 3 al aire; el traste 4 de la cuerda 3 es Si, igual que la cuerda 2; y el traste 3 de la cuerda 2 es Re, igual que la cuerda 1.",
          ],
        },
        {
          heading: "Otras afinaciones",
          body: [
            {
              list: [
                "**Re Sol Si Mi** (D G B E): las cuatro cuerdas agudas de la guitarra, una octava más arriba. Solo cambia la primera cuerda.",
                "**Sol Re La Mi** (G D A E): por quintas, como la mandolina.",
              ],
            },
            "El afinador está en Re Sol Si Re. Para las demás, elige la cuerda y afina con la nota que muestra la pantalla cromática.",
          ],
        },
        {
          heading: "Samba, pagode y choro",
          body: [
            "En el samba y el pagode, el cavaquinho lleva el rasgueo sincopado que sostiene el ritmo. En el choro también toca melodías junto a la flauta, la bandola y la guitarra de 7 cuerdas; \"Brasileirinho\", de Waldir Azevedo, lo convirtió en instrumento solista.",
          ],
        },
      ],
      faqs: [
        {
          question: "¿Sirve para el banjo de samba?",
          answer:
            "Sí. El banjo de 4 cuerdas del samba se afina igual que el cavaquinho, Re Sol Si Re.",
        },
        {
          question: "¿Por qué se rompe tanto la primera cuerda?",
          answer:
            "Es una cuerda de acero fina y muy tensa, afinada en Re5. Súbela despacio, llegando a la nota desde abajo, y revisa que el puente y la cejuela no tengan aristas.",
        },
        {
          question: "¿Es lo mismo que un ukelele?",
          answer:
            "Son parientes: el ukelele desciende de pequeños instrumentos portugueses llevados a Hawái por inmigrantes de Madeira. Pero el cavaquinho usa cuerdas de acero, otra afinación y casi siempre se toca con púa.",
        },
      ],
    },
  },
};
