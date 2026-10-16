import { Metadata } from "next";
import Link from "next/link";
import TunerPageLayout from "@/components/TunerPageLayout";
import { languageAlternates } from "@/lib/i18n/pages";
import { otherPagesFor } from "@/lib/i18n/content";

const PATH = "/es/afinador-de-bajo";

export const metadata: Metadata = {
  title: "Afinador de bajo online gratis",
  description:
    "Afinador de bajo online y gratis. Afina tu bajo de 4 cuerdas (Mi La Re Sol) con el micrófono, aquí mismo. Preciso hasta el Mi grave de 41 Hz, sin descargas.",
  alternates: { canonical: PATH, languages: languageAlternates(PATH) },
  openGraph: {
    locale: "es_ES",
    title: "Afinador de bajo online gratis",
    description:
      "Afina tu bajo con el micrófono de tu móvil o computadora. Gratis y sin descargas.",
  },
};

export default function AfinadorBajoPage() {
  const webAppJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Afinador de bajo - GuitarTunePro",
    url: `https://www.guitartunepro.com${PATH}`,
    inLanguage: "es",
    applicationCategory: "MultimediaApplication",
    operatingSystem: "Any",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    description:
      "Afinador de bajo online y gratis. Afina tu bajo de 4 cuerdas (Mi La Re Sol).",
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
        title="Afinador de bajo"
        description="Afina tu bajo de 4 cuerdas (Mi La Re Sol) con el micrófono. El afinador ya está configurado para bajo: pulsa Activar micrófono y toca una cuerda."
        canonicalPath={PATH}
        initialGuitarType="bass"
        otherTuners={otherPagesFor(PATH, "es")}
        faqs={[
          {
            question: "¿Cuál es la afinación estándar del bajo?",
            answer:
              "Mi La Re Sol, de la cuerda más grave a la más aguda (en cifrado americano, E A D G). Son las mismas notas que las cuatro cuerdas graves de la guitarra, pero una octava más abajo: Mi1, La1, Re2 y Sol2.",
          },
          {
            question: "¿Por qué al móvil le cuesta leer el Mi grave?",
            answer:
              "El Mi grave del bajo vibra a 41.20 Hz, y los micrófonos de móviles y portátiles están pensados para la voz: captan muy poco por debajo de unos 80 Hz. El afinador se apoya en los armónicos de la cuerda, pero obtendrás una lectura mucho más estable si pulsas con firmeza cerca de la pastilla del mástil y apagas las demás cuerdas con la mano.",
          },
          {
            question: "¿Puedo afinar con el bajo conectado al amplificador?",
            answer:
              "Este afinador usa el micrófono del dispositivo, así que es mejor afinar con el amplificador apagado o muy bajo. El zumbido y las reflexiones de la sala añaden frecuencias que confunden la detección de las notas graves.",
          },
          {
            question: "¿Sirve para un bajo de 5 cuerdas?",
            answer:
              "En el panel Instrumento, debajo del afinador, puedes elegir Bajo de 5 cuerdas, que añade un Si grave (Si0) por debajo del Mi. Es una nota tan grave que muchos micrófonos apenas la captan; pulsa con fuerza y acerca el móvil al instrumento.",
          },
          {
            question: "¿Cada cuánto debo afinar el bajo?",
            answer:
              "Cada vez que vayas a tocar. Las cuerdas de bajo son gruesas y aguantan bien la afinación, pero los cambios de temperatura y los golpes en las clavijas al transportarlo la mueven lo suficiente para notarse junto a otros instrumentos.",
          },
        ]}
      >
        <h2>Cómo usar este afinador de bajo</h2>
        <ol>
          <li>
            Pulsa <strong>Activar micrófono</strong> en el afinador de arriba y
            permite el acceso al micrófono.
          </li>
          <li>
            El instrumento <strong>Bajo eléctrico</strong> ya está
            seleccionado.
          </li>
          <li>
            Toca la cuarta cuerda (Mi, 41.20&nbsp;Hz) y gira la clavija hasta
            que la aguja quede en 0 cents.
          </li>
          <li>
            Sigue con La (55.00&nbsp;Hz), Re (73.42&nbsp;Hz) y Sol
            (98.00&nbsp;Hz).
          </li>
          <li>
            Haz una segunda pasada: las cuerdas de bajo tienen mucha tensión y
            el mástil cede un poco al afinar las demás.
          </li>
        </ol>
        <p>
          Pulsa con firmeza y deja que la nota suene. En las cuerdas graves la
          lectura tarda un instante en estabilizarse; lee la aguja después del
          golpe inicial, no en el ataque.
        </p>

        <h2>Por qué el bajo es difícil de afinar con un micrófono</h2>
        <p>
          El bajo es el instrumento más exigente para cualquier afinador por
          micrófono. Sus notas fundamentales están entre 41 y 98&nbsp;Hz, justo
          la zona que los micrófonos de móviles y portátiles recortan, porque
          están diseñados para la voz humana.
        </p>
        <p>
          La buena noticia es que una cuerda de bajo no suena solo en su
          fundamental: también produce armónicos al doble, triple y cuádruple
          de esa frecuencia, que el micrófono sí capta. El afinador analiza
          toda esa serie para deducir la nota. Para ayudarle:
        </p>
        <ul>
          <li>Acerca el móvil al bajo, mejor cerca del mástil.</li>
          <li>
            Pulsa con los dedos, con firmeza, y apaga las demás cuerdas con la
            otra mano.
          </li>
          <li>Afina en una sala silenciosa y con el amplificador apagado.</li>
        </ul>

        <h2>Bajo y guitarra: la misma afinación, una octava abajo</h2>
        <p>
          Las cuatro cuerdas del bajo (Mi La Re Sol) tienen los mismos nombres
          que las cuatro cuerdas graves de la guitarra, pero suenan exactamente
          una octava por debajo. Si tocas con un guitarrista, pueden comprobar
          la afinación entre los dos tocando la misma nota: deberían sonar
          &ldquo;iguales&rdquo; aunque una sea más grave, sin ningún batido ni
          vibración entre ellas.
        </p>

        <h2>Problemas comunes</h2>
        <p>
          <strong>La aguja no se estabiliza en el Mi.</strong> Acerca el
          micrófono y pulsa con más fuerza. Si sigue inestable, revisa el ruido
          de fondo: neveras, ventiladores o aire acondicionado generan
          zumbidos graves.
        </p>
        <p>
          <strong>Afinado al aire pero desafinado en los trastes
          altos.</strong> Es un problema de octavación. Compara cada cuerda al
          aire con su traste 12; si no coinciden en octava, hay que ajustar la
          posición de las selletas del puente.
        </p>

        <p>
          También disponibles: el{" "}
          <Link href="/es">afinador de guitarra</Link>, el{" "}
          <Link href="/es/afinador-de-ukelele">afinador de ukelele</Link> y el{" "}
          <Link href="/es/afinador-de-violin">afinador de violín</Link>.
        </p>
      </TunerPageLayout>
    </>
  );
}
