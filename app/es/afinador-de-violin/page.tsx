import { Metadata } from "next";
import Link from "next/link";
import TunerPageLayout from "@/components/TunerPageLayout";
import { languageAlternates } from "@/lib/i18n/pages";
import { otherPagesFor } from "@/lib/i18n/content";

const PATH = "/es/afinador-de-violin";

export const metadata: Metadata = {
  title: "Afinador de violín online gratis",
  description:
    "Afinador de violín online y gratis. Afina tu violín en Sol Re La Mi con el micrófono, aquí mismo. Para todos los tamaños, de 1/16 a 4/4, sin descargas.",
  alternates: { canonical: PATH, languages: languageAlternates(PATH) },
  openGraph: {
    locale: "es_ES",
    title: "Afinador de violín online gratis",
    description:
      "Afina tu violín con el micrófono de tu móvil o computadora. Gratis y sin descargas.",
  },
};

export default function AfinadorViolinPage() {
  const webAppJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Afinador de violín - GuitarTunePro",
    url: `https://www.guitartunepro.com${PATH}`,
    inLanguage: "es",
    applicationCategory: "MultimediaApplication",
    operatingSystem: "Any",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    description:
      "Afinador de violín online y gratis. Afina en Sol Re La Mi (G D A E).",
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
        title="Afinador de violín"
        description="Afina tu violín en Sol Re La Mi con el micrófono. El afinador ya está configurado para violín: pulsa Activar micrófono y toca una cuerda al aire, con arco o en pizzicato."
        canonicalPath={PATH}
        initialGuitarType="violin"
        chartCaption="Estas son las frecuencias exactas que busca el afinador, con La4 = 440 Hz y temperamento igual. La cuerda 1 es el Mi, la más aguda y fina."
        otherTuners={otherPagesFor(PATH, "es")}
        faqs={[
          {
            question: "¿Cuáles son las notas de las cuerdas del violín?",
            answer:
              "De la más grave a la más aguda: Sol3, Re4, La4 y Mi5 (en cifrado americano, G D A E). Cada cuerda está una quinta justa por encima de la anterior. El La es el mismo La de 440 Hz con el que afina la orquesta.",
          },
          {
            question: "¿Qué cuerda afino primero?",
            answer:
              "El La. Es la nota de referencia de toda la orquesta y, una vez afinado, sirve para comprobar las demás. Afina La, luego Re, Sol y Mi, y vuelve a revisar el La: al cambiar la tensión de una cuerda, el puente transmite un poco de esa fuerza a las otras.",
          },
          {
            question: "¿Uso las clavijas o los microafinadores?",
            answer:
              "Los microafinadores (los tornillos del cordal) para cualquier corrección pequeña, y las clavijas solo cuando la cuerda está muy desafinada o acabas de cambiarla. Las clavijas mueven mucho la nota con muy poco giro y es difícil acertar. Si un microafinador está casi al tope, desenróscalo hasta la mitad y compensa con la clavija.",
          },
          {
            question: "Mi orquesta afina en La = 442. ¿Puedo usar este afinador?",
            answer:
              "Sí. Este afinador mide con La = 440 Hz. La = 442 está unos 8 cents más alto, así que afina cada cuerda hasta que la aguja marque aproximadamente +8 en lugar de 0. Al subir todas las cuerdas lo mismo, las quintas entre ellas siguen siendo justas.",
          },
          {
            question: "¿Los violines pequeños se afinan igual?",
            answer:
              "Sí. Los violines fraccionados (1/16, 1/10, 1/8, 1/4, 1/2, 3/4) se afinan en el mismo Sol Re La Mi que un violín 4/4. Las cuerdas son más cortas y están hechas para ese tamaño, pero las notas son idénticas.",
          },
        ]}
      >
        <h2>Cómo usar este afinador de violín</h2>
        <ol>
          <li>
            Pulsa <strong>Activar micrófono</strong> en el afinador de arriba y
            permite el acceso al micrófono.
          </li>
          <li>
            El instrumento <strong>Violín</strong> ya está seleccionado.
          </li>
          <li>
            Toca el La al aire (440.00&nbsp;Hz) con un arco largo y uniforme, y
            ajusta hasta que la aguja quede en 0 cents.
          </li>
          <li>
            Afina el Re (293.66&nbsp;Hz), después el Sol (196.00&nbsp;Hz) y por
            último el Mi (659.26&nbsp;Hz).
          </li>
          <li>
            Vuelve a comprobar el La. Al tensar las otras tres cuerdas, el
            puente recibe más presión y el La puede bajar ligeramente.
          </li>
        </ol>
        <p>
          Un arco firme y constante da la lectura más clara. Si te resulta
          incómodo tocar con arco mientras miras la pantalla, toca la cuerda en{" "}
          <em>pizzicato</em>: el afinador la lee igual de bien, aunque la nota
          dura menos y quizá tengas que repetir.
        </p>

        <h2>Clavijas y microafinadores</h2>
        <p>
          El violín tiene dos formas de cambiar la afinación, y usar la
          adecuada evita muchas frustraciones.
        </p>
        <p>
          Los <strong>microafinadores</strong> son los tornillos pequeños del
          cordal. Girar en el sentido de las agujas del reloj sube la nota; al
          revés, la baja. Mueven la afinación muy poco, que es justo lo que
          necesitas para el ajuste diario. Casi todos los violines de estudio
          tienen uno en cada cuerda; muchos violinistas avanzados solo
          conservan el del Mi, porque esa cuerda de acero es demasiado sensible
          para afinarla con la clavija.
        </p>
        <p>
          Las <strong>clavijas</strong> se sujetan solo por fricción. Gíralas
          empujando suavemente <em>hacia dentro</em> del clavijero: eso es lo
          que hace que no se suelten. Si una clavija se vuelve sola, es que no
          está bien encajada; si se atasca y luego salta, necesita pasta para
          clavijas, algo que cualquier taller de luthería aplica en un minuto.
        </p>
        <p>
          Regla práctica: si el afinador marca más de unos 30 cents de
          diferencia, acércate con la clavija y termina con el microafinador.
        </p>

        <h2>Vigila el puente</h2>
        <p>
          El puente del violín no está pegado: lo sostiene solo la presión de
          las cuerdas. Cada vez que tensas una cuerda con la clavija, la
          fricción arrastra la parte de arriba del puente hacia el diapasón.
        </p>
        <p>
          Después de una sesión larga de afinación o de cambiar cuerdas, mira
          el puente de perfil. La cara que da al cordal debería quedar más o
          menos en ángulo recto con la tapa. Si se inclina hacia delante, puede
          deformarse o caerse de golpe, y eso puede dañar la tapa. Si no estás
          seguro de cómo enderezarlo, pídele a tu profesor o a un luthier que
          te enseñe.
        </p>

        <h2>Afinar por quintas</h2>
        <p>
          Con el La afinado, los violinistas experimentados comprueban el resto
          tocando dos cuerdas al aire a la vez (una <em>doble cuerda</em>) y
          escuchando la quinta. Cuando está justa, suena limpia y estable;
          cuando una cuerda está ligeramente desafinada, se oye una ondulación
          o &ldquo;batido&rdquo;. Cuanto más rápido es el batido, más
          desafinada está.
        </p>
        <p>
          Vale la pena aprenderlo junto con el afinador: el afinador te acerca
          y te enseña cómo suena &ldquo;afinado&rdquo;, y las dobles cuerdas te
          permiten afinar en silencio en el ensayo.
        </p>

        <h2>Problemas comunes</h2>
        <p>
          <strong>La cuerda Mi se sube o se rompe.</strong> Es una cuerda fina
          de acero con mucha tensión. Afínala solo con el microafinador y
          acércate a la nota desde abajo.
        </p>
        <p>
          <strong>La aguja salta entre dos notas.</strong> El afinador está
          captando un armónico. Toca más cerca del diapasón con algo menos de
          presión, o pasa a pizzicato.
        </p>
        <p>
          <strong>Todo baja de un día para otro.</strong> Normal con cuerdas
          nuevas: las de núcleo sintético tardan varios días en estabilizarse.
          Si no son nuevas, revisa la habitación; la temperatura y la humedad
          afectan mucho a un instrumento de madera.
        </p>

        <p>
          También disponibles: el{" "}
          <Link href="/es">afinador de guitarra</Link>, el{" "}
          <Link href="/es/afinador-de-ukelele">afinador de ukelele</Link> y el{" "}
          <Link href="/es/afinador-de-bajo">afinador de bajo</Link>.
        </p>
      </TunerPageLayout>
    </>
  );
}
