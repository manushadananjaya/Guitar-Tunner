import { Metadata } from "next";
import Link from "next/link";
import TunerPageLayout from "@/components/TunerPageLayout";
import { languageAlternates } from "@/lib/i18n/pages";
import { otherPagesFor } from "@/lib/i18n/content";

const PATH = "/es/afinador-de-ukelele";

export const metadata: Metadata = {
  title: "Afinador de ukelele online gratis",
  description:
    "Afinador de ukelele online y gratis. Afina tu ukelele en Sol Do Mi La con el micrófono, aquí mismo. Para soprano, concierto y tenor, sin descargas.",
  alternates: { canonical: PATH, languages: languageAlternates(PATH) },
  openGraph: {
    locale: "es_ES",
    title: "Afinador de ukelele online gratis",
    description:
      "Afina tu ukelele con el micrófono de tu móvil o computadora. Gratis y sin descargas.",
  },
};

export default function AfinadorUkelelePage() {
  const webAppJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Afinador de ukelele - GuitarTunePro",
    url: `https://www.guitartunepro.com${PATH}`,
    inLanguage: "es",
    applicationCategory: "MultimediaApplication",
    operatingSystem: "Any",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    description:
      "Afinador de ukelele online y gratis. Afina en Sol Do Mi La (GCEA).",
    browserRequirements: "Requiere acceso al micrófono",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppJsonLd) }}
      />
      <TunerPageLayout
        locale="es"
        title="Afinador de ukelele"
        description="Afina tu ukelele en Sol Do Mi La con el micrófono. El afinador ya está configurado para ukelele: pulsa Activar micrófono y toca una cuerda."
        canonicalPath={PATH}
        initialGuitarType="ukulele"
        chartCaption="Estas son las frecuencias exactas que busca el afinador, con La4 = 440 Hz y temperamento igual. Fíjate en que la cuerda 4 (Sol) no es la más grave: la afinación del ukelele es reentrante y el Sol queda por encima del Do y del Mi."
        otherTuners={otherPagesFor(PATH, "es")}
        faqs={[
          {
            question: "¿Cuál es la afinación estándar del ukelele?",
            answer:
              "Sol Do Mi La, de la cuarta cuerda a la primera (en cifrado americano, G C E A). Las notas exactas son Sol4, Do4, Mi4 y La4. Es la misma para ukelele soprano, concierto y tenor.",
          },
          {
            question: "¿Por qué la cuarta cuerda suena más aguda que la tercera?",
            answer:
              "Porque la afinación del ukelele es reentrante: el Sol se afina por encima del Do y del Mi en lugar de por debajo. Es intencionado y es lo que da al ukelele su sonido brillante y alegre. Si el afinador te muestra el Sol más agudo que el Do, está bien.",
          },
          {
            question: "¿Qué es el ukelele con Sol grave (low G)?",
            answer:
              "Es afinar la cuarta cuerda una octava más abajo, en Sol3 (196 Hz), para que las cuerdas queden ordenadas de grave a agudo. Da un sonido más lleno, parecido a la guitarra. Necesita una cuerda especial para Sol grave: una cuerda normal bajada una octava queda demasiado floja para sonar.",
          },
          {
            question: "¿Y el ukelele barítono?",
            answer:
              "El barítono no se afina Sol Do Mi La sino Re Sol Si Mi, igual que las cuatro cuerdas agudas de la guitarra. En el panel Instrumento, debajo del afinador, puedes elegir Ukelele barítono.",
          },
          {
            question: "¿Por qué mi ukelele nuevo se desafina todo el rato?",
            answer:
              "Las cuerdas de nailon se estiran mucho más que las de acero, y un juego nuevo tarda varios días en asentarse. Es completamente normal. Para acelerarlo, estira suavemente cada cuerda a lo largo después de afinar y vuelve a afinar; repite varias veces.",
          },
        ]}
      >
        <h2>Cómo usar este afinador de ukelele</h2>
        <ol>
          <li>
            Pulsa <strong>Activar micrófono</strong> en el afinador de arriba y
            permite el acceso al micrófono.
          </li>
          <li>
            El instrumento <strong>Ukelele</strong> ya está seleccionado.
          </li>
          <li>
            Toca la cuarta cuerda (Sol, 392.00&nbsp;Hz) y gira la clavija hasta
            que la aguja quede en 0 cents.
          </li>
          <li>
            Sigue con la tercera (Do, 261.63&nbsp;Hz), la segunda (Mi,
            329.63&nbsp;Hz) y la primera (La, 440.00&nbsp;Hz).
          </li>
          <li>
            Haz una segunda pasada. El nailon se mueve enseguida y las primeras
            cuerdas que afinaste habrán cambiado un poco.
          </li>
        </ol>
        <p>
          El ukelele es de los instrumentos más fáciles de afinar con el
          micrófono del móvil: sus cuatro cuerdas están justo en el rango donde
          los micrófonos son más sensibles. Si la lectura es inestable, casi
          siempre es por ruido de fondo, no por el instrumento.
        </p>

        <h2>La afinación reentrante</h2>
        <p>
          Lo que más confunde a quien empieza con el ukelele, sobre todo si
          viene de la guitarra, es que <strong>las cuerdas no van de grave a
          agudo</strong>. Las notas son Sol4 (392&nbsp;Hz), Do4 (262&nbsp;Hz),
          Mi4 (330&nbsp;Hz) y La4 (440&nbsp;Hz): la cuarta cuerda es la segunda
          más aguda del instrumento.
        </p>
        <p>
          A esto se le llama <strong>afinación reentrante</strong>. Como las
          cuatro cuerdas caben en una sola octava, los acordes no tienen un
          bajo marcado y todas las cuerdas suenan con un peso parecido. De ahí
          viene el sonido característico del ukelele: brillante, ligero y algo
          ambiguo.
        </p>

        <h2>¿Cambia la afinación según el tamaño?</h2>
        <p>Los tres tamaños más comunes usan Sol Do Mi La:</p>
        <ul>
          <li>
            <strong>Soprano</strong> (unos 53&nbsp;cm) — el tamaño original y
            el de sonido más brillante.
          </li>
          <li>
            <strong>Concierto</strong> (unos 58&nbsp;cm) — algo más de cuerpo,
            volumen y sostenido.
          </li>
          <li>
            <strong>Tenor</strong> (unos 66&nbsp;cm) — sonido más lleno y más
            espacio entre trastes; muy usado para punteo.
          </li>
        </ul>
        <p>
          La excepción es el <strong>barítono</strong> (unos 76&nbsp;cm), que
          se afina Re Sol Si Mi.
        </p>

        <h2>Problemas comunes</h2>
        <p>
          <strong>El ukelele no mantiene la afinación.</strong> Si las cuerdas
          son nuevas, es lo esperado; se estabilizan en una semana.
        </p>
        <p>
          <strong>Las cuerdas marcan 0 pero los acordes suenan mal.</strong>{" "}
          Compara la nota al aire con la del traste 12 de cada cuerda. Muchos
          ukeleles económicos tienen problemas de entonación que ninguna
          afinación puede corregir.
        </p>

        <p>
          También disponibles: el{" "}
          <Link href="/es">afinador de guitarra</Link>, el{" "}
          <Link href="/es/afinador-de-bajo">afinador de bajo</Link> y el{" "}
          <Link href="/es/afinador-de-violin">afinador de violín</Link>.
        </p>
      </TunerPageLayout>
    </>
  );
}
