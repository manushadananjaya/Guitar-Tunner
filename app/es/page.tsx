import { Metadata } from "next";
import Link from "next/link";
import TunerPageLayout from "@/components/TunerPageLayout";
import { languageAlternates, otherEsPagesFor } from "@/lib/i18n/esPages";

export const metadata: Metadata = {
  title: "Afinador de guitarra online gratis",
  description:
    "Afinador de guitarra online y gratis. Afina tu guitarra con el micrófono, aquí mismo: afinación estándar, Drop D, medio tono abajo y más. Sin descargas.",
  alternates: { canonical: "/es", languages: languageAlternates("/es") },
  openGraph: {
    title: "Afinador de guitarra online gratis",
    description:
      "Afina tu guitarra con el micrófono de tu móvil o computadora. Gratis y sin descargas.",
  },
};

export default function AfinadorGuitarraPage() {
  const webAppJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Afinador de guitarra - GuitarTunePro",
    url: "https://www.guitartunepro.com/es",
    inLanguage: "es",
    applicationCategory: "MultimediaApplication",
    operatingSystem: "Any",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    description:
      "Afinador de guitarra online y gratis. Afina con el micrófono, sin descargas.",
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
        title="Afinador de guitarra"
        description="Afina tu guitarra con el micrófono, directamente en esta página. Pulsa Activar micrófono y toca una cuerda: el afinador detecta cuál es y te dice hacia dónde girar la clavija."
        canonicalPath="/es"
        otherTuners={otherEsPagesFor("/es")}
        faqs={[
          {
            question: "¿Cuáles son las notas de la guitarra en afinación estándar?",
            answer:
              "De la sexta cuerda (la más gruesa) a la primera (la más fina): Mi, La, Re, Sol, Si, Mi. En cifrado americano, E A D G B E. Las frecuencias son 82.41, 110.00, 146.83, 196.00, 246.94 y 329.63 Hz.",
          },
          {
            question: "¿El afinador es gratis? ¿Tengo que instalar algo?",
            answer:
              "Es completamente gratis y funciona en el navegador, tanto en el móvil como en la computadora. Solo tienes que permitir el acceso al micrófono cuando el navegador lo pida. El audio se analiza en tu dispositivo y no se envía a ningún servidor.",
          },
          {
            question: "¿Sirve para guitarra acústica, clásica y eléctrica?",
            answer:
              "Sí. Las tres usan la misma afinación estándar. Con la eléctrica, afina con el amplificador apagado o bajo y toca cerca del micrófono del dispositivo; el afinador escucha el sonido acústico de las cuerdas.",
          },
          {
            question: "¿Qué significan los cents?",
            answer:
              "Un cent es una centésima de semitono. Si la aguja marca −20, la cuerda está 20 cents por debajo de la nota: tensa la clavija. Si marca +20, está alta: aflójala. Entre −5 y +5 cents la cuerda se considera afinada.",
          },
          {
            question: "¿Por qué se me desafina la guitarra tan rápido?",
            answer:
              "Lo más habitual son las cuerdas nuevas, que se estiran durante los primeros días, y los cambios de temperatura o humedad. Estira suavemente cada cuerda nueva a lo largo y vuelve a afinar varias veces; en pocos días se estabilizan.",
          },
        ]}
      >
        <h2>Cómo usar este afinador</h2>
        <ol>
          <li>
            Pulsa <strong>Activar micrófono</strong> en el afinador de arriba y
            permite el acceso al micrófono.
          </li>
          <li>
            La guitarra de 6 cuerdas en afinación <strong>Estándar</strong> ya
            está seleccionada.
          </li>
          <li>
            Toca la sexta cuerda (Mi grave, 82.41&nbsp;Hz) y gira la clavija
            hasta que la aguja quede en 0 cents.
          </li>
          <li>
            Sigue con La (110.00&nbsp;Hz), Re (146.83&nbsp;Hz), Sol
            (196.00&nbsp;Hz), Si (246.94&nbsp;Hz) y Mi agudo (329.63&nbsp;Hz).
          </li>
          <li>
            Haz una segunda pasada. Al tensar unas cuerdas, el mástil cede un
            poco y las primeras que afinaste se mueven.
          </li>
        </ol>
        <p>
          No hace falta elegir la cuerda a mano: con <strong>Detectar
          cuerda</strong> activado, el afinador reconoce cuál estás tocando.
          Si prefieres fijarla, toca su clavija en el dibujo del clavijero.
        </p>

        <h2>Do, Re, Mi y cifrado americano</h2>
        <p>
          Este afinador muestra las notas en el sistema que se usa en casi todo
          el mundo hispanohablante: Do, Re, Mi, Fa, Sol, La, Si. Pero muchas
          tablaturas, cancioneros y diagramas de acordes usan el{" "}
          <strong>cifrado americano</strong>, con letras. La equivalencia es
          siempre la misma:
        </p>
        <ul>
          <li>
            <strong>C</strong> = Do · <strong>D</strong> = Re ·{" "}
            <strong>E</strong> = Mi · <strong>F</strong> = Fa
          </li>
          <li>
            <strong>G</strong> = Sol · <strong>A</strong> = La ·{" "}
            <strong>B</strong> = Si
          </li>
        </ul>
        <p>
          Por eso la afinación estándar Mi La Re Sol Si Mi aparece escrita como
          E A D G B E. El número que acompaña a la nota en la tabla de arriba
          (Mi2, La2…) indica la octava: el Mi grave de la sexta cuerda es Mi2 y
          el Mi agudo de la primera es Mi4, dos octavas más arriba.
        </p>

        <h2>Hacia dónde girar la clavija</h2>
        <p>
          Tensar la cuerda sube la nota y aflojarla la baja. Según el lado del
          clavijero en el que esté la clavija, eso puede ser girar en un
          sentido u otro, así que fíjate en la aguja después de un giro pequeño.
        </p>
        <p>
          Un truco de luthier: <strong>afina siempre subiendo hacia la
          nota</strong>. Si la cuerda está alta, bájala un poco por debajo y
          vuelve a subir hasta 0 cents. Así el engranaje queda tensado en la
          dirección correcta y la cuerda se mantiene afinada más tiempo.
        </p>

        <h2>Otras afinaciones</h2>
        <p>
          En el panel <strong>Afinación</strong>, debajo del afinador, puedes
          cambiar a otras afinaciones habituales:
        </p>
        <ul>
          <li>
            <strong>Drop D</strong> — Re La Re Sol Si Mi. Solo baja la sexta
            cuerda un tono; muy usada en rock y metal.
          </li>
          <li>
            <strong>Medio tono abajo</strong> — todas las cuerdas un semitono
            más graves (Mi♭ La♭ Re♭ Sol♭ Si♭ Mi♭), como afinaban Jimi Hendrix o
            Stevie Ray Vaughan. El afinador las muestra con sostenidos, que son
            las mismas notas: Re♯ Sol♯ Do♯ Fa♯ La♯ Re♯.
          </li>
          <li>
            <strong>Sol abierto</strong> — Re Sol Re Sol Si Re. Al tocar al
            aire suena un acorde de Sol mayor; ideal para slide.
          </li>
          <li>
            <strong>DADGAD</strong> — Re La Re Sol La Re, muy usada en música
            celta y fingerstyle.
          </li>
        </ul>

        <h2>Problemas comunes</h2>
        <p>
          <strong>La aguja salta de un lado a otro.</strong> Suele ser ruido
          de fondo o varias cuerdas sonando a la vez. Toca una sola cuerda,
          apaga las demás con la mano y acércate al micrófono.
        </p>
        <p>
          <strong>Marca la nota una octava más alta.</strong> El afinador está
          captando un armónico. Pulsa la cuerda sobre la boca de la guitarra,
          no junto al puente, y déjala sonar.
        </p>
        <p>
          <strong>Todas las cuerdas marcan 0 pero los acordes suenan
          raros.</strong> Puede ser un problema de octavación (entonación):
          compara la nota al aire con la del traste 12 de cada cuerda. Si la
          del traste 12 no está exactamente una octava más arriba, la guitarra
          necesita un ajuste.
        </p>

        <p>
          También disponibles: el{" "}
          <Link href="/es/afinador-de-bajo">afinador de bajo</Link>, el{" "}
          <Link href="/es/afinador-de-ukelele">afinador de ukelele</Link> y el{" "}
          <Link href="/es/afinador-de-violin">afinador de violín</Link>.
        </p>
      </TunerPageLayout>
    </>
  );
}
