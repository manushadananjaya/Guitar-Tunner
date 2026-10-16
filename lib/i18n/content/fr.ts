import type { LanguageContent } from "./types";

/** French: solfège note names (Do Ré Mi), decimal comma, "vous", and a
 *  non-breaking space before : ; ? ! and inside « » as French typography
 *  requires. */
export const fr: LanguageContent = {
  labels: {
    "/": "Accordeur de guitare",
    "/drop-d-tuner": "Accordeur Drop D",
    "/drop-c-tuner": "Accordeur Drop C",
    "/dadgad-tuner": "Accordeur DADGAD",
    "/open-g-tuner": "Accordeur open G",
    "/open-d-tuner": "Accordeur open D",
    "/open-e-tuner": "Accordeur open E",
    "/open-c-tuner": "Accordeur open C",
    "/open-a-tuner": "Accordeur open A",
    "/half-step-down-tuner": "Accordeur un demi-ton plus bas",
    "/full-step-down-tuner": "Accordeur un ton plus bas",
    "/432-hz-tuner": "Accordeur 432 Hz",
    "/bass-tuner": "Accordeur de basse",
    "/5-string-bass-tuner": "Accordeur de basse 5 cordes",
    "/ukulele-tuner": "Accordeur de ukulélé",
    "/baritone-ukulele-tuner": "Accordeur de ukulélé baryton",
    "/7-string-guitar-tuner": "Accordeur de guitare 7 cordes",
    "/12-string-guitar-tuner": "Accordeur de guitare 12 cordes",
    "/mandolin-tuner": "Accordeur de mandoline",
    "/banjo-tuner": "Accordeur de banjo",
    "/violin-tuner": "Accordeur de violon",
    "/viola-tuner": "Accordeur d’alto",
    "/cello-tuner": "Accordeur de violoncelle",
  },
  pages: {
    "/": {
      metaTitle: "Accordeur de guitare en ligne gratuit",
      metaDescription:
        "Accordeur de guitare en ligne et gratuit. Accordez avec le micro, directement ici : accordage standard, Drop D, un demi-ton plus bas et plus. Sans téléchargement.",
      title: "Accordeur de guitare",
      intro:
        "Accordez votre guitare avec le micro, directement sur cette page. Appuyez sur Activer le micro et jouez une corde : l’accordeur reconnaît laquelle et indique dans quel sens tourner la mécanique.",
      sections: [
        {
          heading: "Do, Ré, Mi et notation anglo-saxonne",
          body: [
            "L’accordeur affiche les notes comme on les apprend en France : Do, Ré, Mi, Fa, Sol, La, Si. Mais les grilles d’accords et les tablatures utilisent souvent la **notation anglo-saxonne**, avec des lettres :",
            {
              list: [
                "**C** = Do · **D** = Ré · **E** = Mi · **F** = Fa",
                "**G** = Sol · **A** = La · **B** = Si",
              ],
            },
            "L’accordage standard Mi La Ré Sol Si Mi s’écrit donc **E A D G B E**. Le chiffre après la note dans le tableau (Mi2, La2…) indique l’octave : le Mi grave de la 6e corde est Mi2, le Mi aigu de la 1re corde Mi4.",
          ],
        },
        {
          heading: "Dans quel sens tourner la mécanique",
          body: [
            "Tendre la corde fait monter la note, la détendre la fait descendre. Selon le côté de la tête, cela peut correspondre à un sens ou à l’autre : vérifiez l’aiguille après un petit quart de tour.",
            "Astuce de luthier : **accordez toujours en montant vers la note**. Si la corde est trop haute, descendez un peu en dessous puis remontez jusqu’à 0 cent. L’engrenage reste en tension dans le bon sens et l’accord tient plus longtemps.",
          ],
        },
        {
          heading: "Problèmes courants",
          body: [
            "**L’aiguille saute dans tous les sens.** C’est souvent du bruit de fond ou plusieurs cordes qui sonnent ensemble. Jouez une seule corde, étouffez les autres et rapprochez-vous du micro.",
            "**Toutes les cordes sont à 0, mais les accords sonnent faux.** C’est peut-être un problème d’octaves (réglage) : comparez la corde à vide avec la case 12. Si la case 12 n’est pas exactement à l’octave, la guitare a besoin d’un réglage.",
          ],
        },
      ],
      faqs: [
        {
          question: "Quelles sont les notes de la guitare en accordage standard ?",
          answer:
            "De la 6e corde (la plus grosse) à la 1re (la plus fine) : Mi, La, Ré, Sol, Si, Mi — en notation anglo-saxonne, E A D G B E. Les fréquences sont 82,41 ; 110,00 ; 146,83 ; 196,00 ; 246,94 et 329,63 Hz.",
        },
        {
          question: "L’accordeur est-il gratuit ? Faut-il installer quelque chose ?",
          answer:
            "Il est entièrement gratuit et fonctionne dans le navigateur, sur mobile comme sur ordinateur. Il suffit d’autoriser le micro. Le son est analysé sur votre appareil et n’est envoyé à aucun serveur.",
        },
        {
          question: "Fonctionne-t-il pour guitare classique, folk et électrique ?",
          answer:
            "Oui, les trois utilisent le même accordage standard. Pour l’électrique, accordez ampli éteint ou bas, près du micro de l’appareil.",
        },
        {
          question: "Que sont les cents ?",
          answer:
            "Un cent est un centième de demi-ton. Si l’aiguille indique −20, la corde est 20 cents trop basse : tendez-la. À +20, elle est trop haute : détendez-la. Entre −5 et +5, la corde est considérée comme juste.",
        },
      ],
    },
    "/drop-d-tuner": {
      metaTitle: "Accordeur Drop D en ligne gratuit",
      metaDescription:
        "Accordez votre guitare en Drop D (Ré La Ré Sol Si Mi) avec le micro. Seule la 6e corde change. Gratuit et sans téléchargement.",
      title: "Accordeur Drop D",
      intro:
        "Accordez en Drop D avec le micro : l’accordeur est déjà réglé sur Ré La Ré Sol Si Mi. Il suffit de descendre la 6e corde d’un ton.",
      sections: [
        {
          heading: "Qu’est-ce que le Drop D ?",
          body: [
            "Le Drop D, c’est l’accordage standard avec **la 6e corde descendue d’un ton**, de Mi à Ré. Les cinq autres cordes ne changent pas. C’est l’accordage alternatif le plus répandu, car on y entre et on en sort en quelques secondes.",
            "Avec la 6e en Ré, les trois cordes graves à vide forment un power chord de Ré, et tous les power chords se jouent **avec un seul doigt** en barrant les trois cordes graves sur la même case. D’où sa place dans le rock, le grunge et le metal.",
          ],
        },
        {
          heading: "Vérifier à l’oreille",
          body: [
            "Jouez l’harmonique de la case 12 de la 6e corde et comparez-la à la 4e corde à vide : ce sont deux Ré, ils doivent sonner identiques, sans battement.",
            "Pour revenir à l’accordage standard, remontez la 6e corde jusqu’à Mi (82,41 Hz).",
          ],
        },
      ],
      faqs: [
        {
          question: "Faut-il des cordes spéciales pour le Drop D ?",
          answer:
            "Non. Descendre une seule corde d’un ton laisse une tension normale. Si la 6e frise, un tirant un peu plus fort sur cette corde règle le problème.",
        },
        {
          question: "Les accords changent-ils en Drop D ?",
          answer:
            "Seulement ceux qui utilisent la 6e corde. Les accords joués sur les cinq cordes aiguës restent identiques.",
        },
        {
          question: "Quelle différence avec le Drop C ?",
          answer:
            "Le Drop C reprend le même schéma un ton plus bas : Do Sol Do Fa La Ré. Plus lourd, il demande souvent des cordes plus grosses.",
        },
      ],
    },
    "/drop-c-tuner": {
      metaTitle: "Accordeur Drop C en ligne gratuit",
      metaDescription:
        "Accordez votre guitare en Drop C (Do Sol Do Fa La Ré) avec le micro. Accordeur en ligne gratuit, avec la fréquence exacte de chaque corde.",
      title: "Accordeur Drop C",
      intro:
        "Accordez en Drop C avec le micro : l’accordeur est déjà réglé sur Do Sol Do Fa La Ré. Jouez une corde et suivez l’aiguille.",
      sections: [
        {
          heading: "Qu’est-ce que le Drop C ?",
          body: [
            "Le Drop C est un Drop D descendu d’un ton : **toutes les cordes descendent d’un ton** par rapport au standard, et la 6e descend **d’un ton de plus**, jusqu’à Do (65,41 Hz). Les intervalles entre cordes sont ceux du Drop D : toutes les positions du Drop D fonctionnent, un ton plus bas.",
            "C’est l’accordage typique du metalcore et du hardcore moderne.",
          ],
        },
        {
          heading: "Cordes et réglages",
          body: [
            "Descendre les six cordes d’un ton réduit beaucoup la tension. Avec un jeu de 10 standard, la 6e devient molle et frise. On passe généralement à du **11–56 ou 12–56**.",
            {
              list: [
                "Après un changement de tirant, vérifiez le **réglage de la courbure du manche** (truss rod).",
                "Contrôlez les **octaves** (case 12 contre corde à vide).",
                "Avec un vibrato flottant, rééquilibrez les ressorts : moins de tension fait basculer le chevalet.",
              ],
            },
          ],
        },
      ],
      faqs: [
        {
          question: "Peut-on jouer en Drop C avec des cordes normales ?",
          answer:
            "Oui, mais la 6e corde sera molle, frisera et se désaccordera si vous attaquez fort. Pour un usage régulier, prenez un tirant plus fort.",
        },
        {
          question: "Le Drop C, c’est accorder en Do ?",
          answer:
            "Non. L’accordage en Do (Do Fa Si♭ Mi♭ Sol Do) descend toutes les cordes de deux tons. En Drop C, seule la 6e atteint Do.",
        },
        {
          question: "Pourquoi l’accordeur hésite-t-il sur la 6e corde ?",
          answer:
            "Le Do grave vibre à 65,41 Hz, à la limite de ce que captent les micros de téléphone. Attaquez franchement, rapprochez le téléphone et étouffez les autres cordes.",
        },
      ],
    },
    "/dadgad-tuner": {
      metaTitle: "Accordeur DADGAD en ligne gratuit",
      metaDescription:
        "Accordez votre guitare en DADGAD (Ré La Ré Sol La Ré) avec le micro. L’accordage celtique, avec la fréquence exacte de chaque corde.",
      title: "Accordeur DADGAD",
      intro:
        "Accordez en DADGAD avec le micro : l’accordeur est déjà réglé sur Ré La Ré Sol La Ré. Seules trois cordes changent.",
      sections: [
        {
          heading: "Du standard au DADGAD",
          body: [
            "Depuis l’accordage standard, il suffit de **descendre trois cordes d’un ton** : la 6e de Mi à Ré, la 2e de Si à La et la 1re de Mi à Ré.",
            "À vide, les cordes forment un Ré suspendu (Dsus4), ni majeur ni mineur. C’est cette ambiguïté qui donne au DADGAD son son ouvert et modal.",
          ],
        },
        {
          heading: "Un accordage très français",
          body: [
            "C’est l’accordage de référence de la **musique celtique** à la guitare et du fingerstyle acoustique. En France, il est indissociable de **Pierre Bensusan**, qui l’utilise depuis les années 1970.",
            "On le retrouve aussi dans le rock : « Kashmir » de Led Zeppelin est en DADGAD.",
          ],
        },
      ],
      faqs: [
        {
          question: "Faut-il des cordes spéciales ?",
          answer:
            "Non. Descendre trois cordes d’un ton baisse un peu la tension, mais n’importe quel jeu convient.",
        },
        {
          question: "Quels accords sonnent bien en DADGAD ?",
          answer:
            "Ceux autour de Ré et Sol, avec des positions qui laissent sonner les cordes à vide. Avec un capodastre en case 2, tout monte en Mi.",
        },
        {
          question: "Comment revenir au standard ?",
          answer:
            "Remontez la 6e et la 1re corde à Mi et la 2e à Si. Dans le panneau Accordage, choisissez Standard et suivez l’aiguille.",
        },
      ],
    },
    "/open-g-tuner": {
      metaTitle: "Accordeur open G (open de Sol) gratuit",
      metaDescription:
        "Accordez votre guitare en open G (Ré Sol Ré Sol Si Ré) avec le micro. L’accordage du slide et du blues, avec les fréquences exactes.",
      title: "Accordeur open G (open de Sol)",
      intro:
        "Accordez en open G avec le micro : l’accordeur est déjà réglé sur Ré Sol Ré Sol Si Ré. À vide, la guitare joue un accord de Sol majeur.",
      sections: [
        {
          heading: "Du standard à l’open G",
          body: [
            "**Descendez trois cordes d’un ton** : la 6e de Mi à Ré, la 5e de La à Sol et la 1re de Mi à Ré. La 4e (Ré), la 3e (Sol) et la 2e (Si) ne changent pas.",
            "Comme la tension baisse, c’est un accordage sans risque pour toutes les guitares.",
          ],
        },
        {
          heading: "Pourquoi il est si utilisé",
          body: [
            "Les six cordes formant un accord majeur, **un barré droit sur n’importe quelle case donne un autre accord majeur** : case 5 pour Do, case 7 pour Ré. Idéal pour le **slide** (bottleneck).",
            "C’est l’accordage du blues du Delta et de nombreux riffs de Keith Richards, qui retire en plus la 6e corde pour jouer sur cinq.",
          ],
        },
      ],
      faqs: [
        {
          question: "L’open G abîme-t-il la guitare ?",
          answer: "Non. On ne fait que détendre des cordes : la tension totale baisse.",
        },
        {
          question: "Quelle différence entre open G et open D ?",
          answer:
            "L’open G (Ré Sol Ré Sol Si Ré) forme Sol majeur ; l’open D (Ré La Ré Fa♯ La Ré) forme Ré majeur, plus grave et plus profond.",
        },
        {
          question: "Comment jouer un accord mineur en open G ?",
          answer:
            "Baissez d’un demi-ton la tierce, sur la 2e corde : barré en case 5 (Do), jouez la 2e corde en case 4 pour Do mineur.",
        },
      ],
    },
    "/open-d-tuner": {
      metaTitle: "Accordeur open D (open de Ré) gratuit",
      metaDescription:
        "Accordez votre guitare en open D (Ré La Ré Fa♯ La Ré) avec le micro. Accordage de slide et de fingerstyle, avec les fréquences exactes.",
      title: "Accordeur open D (open de Ré)",
      intro:
        "Accordez en open D avec le micro : l’accordeur est déjà réglé sur Ré La Ré Fa♯ La Ré. À vide, la guitare joue Ré majeur.",
      sections: [
        {
          heading: "Du standard à l’open D",
          body: [
            {
              list: [
                "6e corde : de Mi à **Ré** (un ton plus bas).",
                "3e corde : de Sol à **Fa♯** (un demi-ton plus bas).",
                "2e corde : de Si à **La** (un ton plus bas).",
                "1re corde : de Mi à **Ré** (un ton plus bas).",
              ],
            },
            "La 5e (La) et la 4e (Ré) ne changent pas.",
          ],
        },
        {
          heading: "Un son ample et grave",
          body: [
            "Avec deux Ré graves, l’open D sonne large et résonnant. C’est l’accordage classique du slide blues (aussi appelé **Vestapol**) et un favori du fingerstyle.",
            "Comme en open G, un barré droit donne des accords majeurs : case 5 pour Sol, case 7 pour La.",
          ],
        },
      ],
      faqs: [
        {
          question: "Open D et open E, c’est le même accordage ?",
          answer:
            "Même forme, mais l’open E est un ton plus haut. Beaucoup préfèrent l’open D avec un capodastre en case 2 plutôt que d’augmenter la tension.",
        },
        {
          question: "Faut-il des cordes plus grosses ?",
          answer:
            "Non, l’open D baisse la tension de quatre cordes. Pour le slide, un tirant un peu plus fort aide.",
        },
        {
          question: "Quelle différence avec le DADGAD ?",
          answer:
            "Seulement la 3e corde : Fa♯ en open D (accord majeur), Sol en DADGAD (accord suspendu).",
        },
      ],
    },
    "/open-e-tuner": {
      metaTitle: "Accordeur open E (open de Mi) gratuit",
      metaDescription:
        "Accordez votre guitare en open E (Mi Si Mi Sol♯ Si Mi) avec le micro. L’accordage du slide électrique, avec les fréquences exactes.",
      title: "Accordeur open E (open de Mi)",
      intro:
        "Accordez en open E avec le micro : l’accordeur est déjà réglé sur Mi Si Mi Sol♯ Si Mi. À vide, la guitare joue Mi majeur.",
      sections: [
        {
          heading: "Du standard à l’open E",
          body: [
            "L’open E **monte** trois cordes : la 5e de La à **Si** (un ton), la 4e de Ré à **Mi** (un ton) et la 3e de Sol à **Sol♯** (un demi-ton).",
            "Monter des cordes augmente la tension sur le manche. Montez doucement en surveillant l’aiguille, sans dépasser la note.",
          ],
        },
        {
          heading: "Open E ou open D avec capodastre",
          body: [
            "La forme est celle de l’open D, un ton plus haut. Beaucoup de guitaristes s’accordent en **open D avec un capodastre en case 2** : le résultat sonne en Mi sans forcer l’instrument.",
            "Ceux qui jouent directement en open E le font souvent à l’électrique avec un slide : c’est le son de Duane Allman et Derek Trucks.",
          ],
        },
      ],
      faqs: [
        {
          question: "L’open E est-il dangereux pour la guitare ?",
          answer:
            "Avec des cordes normales, généralement non, mais il ajoute de la tension. Sur une guitare ancienne, préférez l’open D avec capodastre en case 2.",
        },
        {
          question: "Pourquoi la 3e corde casse-t-elle ?",
          answer:
            "En passant de Sol à Sol♯, elle travaille plus près de sa limite. Montez lentement et vérifiez que le sillet ne la pince pas.",
        },
        {
          question: "Quels accords donne un barré droit ?",
          answer: "Des accords majeurs : case 5 pour La, case 7 pour Si.",
        },
      ],
    },
    "/open-c-tuner": {
      metaTitle: "Accordeur open C (open de Do) gratuit",
      metaDescription:
        "Accordez votre guitare en open C (Do Sol Do Sol Do Mi) avec le micro. L’accordage ouvert le plus grave, avec les fréquences exactes.",
      title: "Accordeur open C (open de Do)",
      intro:
        "Accordez en open C avec le micro : l’accordeur est déjà réglé sur Do Sol Do Sol Do Mi. À vide, la guitare joue un Do majeur très grave.",
      sections: [
        {
          heading: "Du standard à l’open C",
          body: [
            {
              list: [
                "6e : de Mi à **Do** (deux tons plus bas).",
                "5e : de La à **Sol** (un ton plus bas).",
                "4e : de Ré à **Do** (un ton plus bas).",
                "3e : **Sol**, inchangée.",
                "2e : de Si à **Do** (un demi-ton plus haut).",
                "1re : **Mi**, inchangée.",
              ],
            },
            "La 6e descend à 65,41 Hz et devient très molle avec un jeu standard ; pour un usage régulier, prenez une 6e plus grosse.",
          ],
        },
        {
          heading: "Un son de piano",
          body: [
            "Avec trois Do et deux Sol, l’accord à vide est énorme. L’open C est très utilisé en fingerstyle et dans les pièces instrumentales où les cordes à vide servent de bourdon.",
            "Les positions d’accords sont nouvelles pour presque tout le monde : c’est un accordage à explorer.",
          ],
        },
      ],
      faqs: [
        {
          question: "La 6e corde frise en open C ?",
          answer:
            "C’est normal avec un jeu standard, puisqu’elle descend de deux tons. Jouez plus léger ou prenez une corde plus grosse.",
        },
        {
          question: "L’accordeur lit-il bien le Do grave ?",
          answer:
            "À 65,41 Hz, c’est la limite des micros de téléphone. Attaquez franchement et rapprochez le téléphone de la rosace.",
        },
        {
          question: "Quelle différence avec le Drop C ?",
          answer:
            "En Drop C, les cinq cordes aiguës gardent les intervalles du standard ; en open C, les six forment Do majeur.",
        },
      ],
    },
    "/open-a-tuner": {
      metaTitle: "Accordeur open A (open de La) gratuit",
      metaDescription:
        "Accordez votre guitare en open A (Mi La Mi La Do♯ Mi) avec le micro. Accordage de slide et de blues, avec les fréquences exactes.",
      title: "Accordeur open A (open de La)",
      intro:
        "Accordez en open A avec le micro : l’accordeur est déjà réglé sur Mi La Mi La Do♯ Mi. À vide, la guitare joue La majeur.",
      sections: [
        {
          heading: "Du standard à l’open A",
          body: [
            "L’open A **monte** trois cordes d’un ton : la 4e de Ré à **Mi**, la 3e de Sol à **La** et la 2e de Si à **Do♯**.",
            "C’est la forme de l’open G, un ton plus haut. Beaucoup préfèrent **l’open G avec un capodastre en case 2**, qui sonne pareil sans ajouter de tension.",
          ],
        },
        {
          heading: "Le La du blues",
          body: [
            "La est l’une des tonalités les plus courantes du blues, et l’open A permet d’y jouer du slide avec les cordes à vide. Un barré en case 5 donne Ré, en case 7 Mi : les trois accords du blues en La.",
          ],
        },
      ],
      faqs: [
        {
          question: "L’open A tend-il trop le manche ?",
          answer:
            "Il augmente la tension de trois cordes. Avec des cordes légères, ça va ; sinon, préférez l’open G avec capodastre en case 2.",
        },
        {
          question: "Quelle corde casse le plus souvent ?",
          answer: "La 2e, en montant de Si à Do♯. Montez doucement sans dépasser la note.",
        },
        {
          question: "Les riffs d’open G fonctionnent-ils ?",
          answer: "Oui, toutes les positions d’open G marchent en open A, un ton plus haut.",
        },
      ],
    },
    "/half-step-down-tuner": {
      metaTitle: "Accordeur un demi-ton plus bas (Mi♭)",
      metaDescription:
        "Accordez votre guitare un demi-ton plus bas (Mi♭ La♭ Ré♭ Sol♭ Si♭ Mi♭) avec le micro, comme Hendrix et SRV. En ligne et gratuit.",
      title: "Accordeur un demi-ton plus bas",
      intro:
        "Accordez un demi-ton plus bas avec le micro : l’accordeur est déjà réglé. L’écran affiche des dièses (Ré♯ Sol♯ Do♯ Fa♯ La♯ Ré♯), qui sont les mêmes notes que Mi♭ La♭ Ré♭ Sol♭ Si♭ Mi♭.",
      sections: [
        {
          heading: "Ce qui change",
          body: [
            "Toutes les cordes descendent **d’un demi-ton**. Les intervalles sont ceux de l’accordage standard : **tous les accords et gammes restent identiques**, ils sonnent juste un demi-ton plus bas.",
            "La tension baisse un peu : les bends sont plus faciles et le son plus épais. C’est l’accordage de Jimi Hendrix, Stevie Ray Vaughan, Van Halen et Guns N’ Roses.",
          ],
        },
        {
          heading: "Pour les chanteurs",
          body: [
            "Descendre d’un demi-ton aide aussi la voix : un morceau un peu haut devient confortable sans changer un seul accord.",
            "Pour jouer avec quelqu’un en accordage standard, un capodastre en case 1 suffit.",
          ],
        },
      ],
      faqs: [
        {
          question: "Pourquoi l’accordeur affiche-t-il Ré♯ et pas Mi♭ ?",
          answer:
            "Ce sont deux noms pour la même note (enharmonie). L’accordeur utilise des dièses ; les partitions de morceaux un demi-ton plus bas utilisent souvent des bémols.",
        },
        {
          question: "Faut-il d’autres cordes ?",
          answer:
            "Non, un demi-ton de tension en moins convient à tous les jeux. Certains montent d’un tirant pour retrouver la sensation de tension.",
        },
        {
          question: "Comment revenir au standard ?",
          answer:
            "Remontez toutes les cordes d’un demi-ton. Dans le panneau Accordage, choisissez Standard et suivez l’aiguille.",
        },
      ],
    },
    "/full-step-down-tuner": {
      metaTitle: "Accordeur un ton plus bas (Ré standard)",
      metaDescription:
        "Accordez votre guitare un ton plus bas (Ré Sol Do Fa La Ré) avec le micro. Plus de poids sans apprendre de nouvelles positions.",
      title: "Accordeur un ton plus bas",
      intro:
        "Accordez un ton plus bas (Ré standard) avec le micro : l’accordeur est déjà réglé sur Ré Sol Do Fa La Ré.",
      sections: [
        {
          heading: "Ce qui change",
          body: [
            "Toutes les cordes descendent **d’un ton entier** : Mi devient Ré, La devient Sol, Ré devient Do, Sol devient Fa, Si devient La et Mi devient Ré. Les intervalles ne changent pas : **mêmes accords, mêmes gammes**.",
            "Courant dans le grunge, le stoner et le metal, et chez les chanteurs qui cherchent une tonalité plus confortable.",
          ],
        },
        {
          heading: "Cordes et tension",
          body: [
            "Un ton de tension en moins, ça se sent. En 9 ou 10, les cordes peuvent devenir molles ; beaucoup passent en **11 ou 12** pour cet accordage.",
            "Après un changement de tirant, vérifiez la courbure du manche et les octaves.",
          ],
        },
      ],
      faqs: [
        {
          question: "C’est la même chose que le Drop D ?",
          answer:
            "Non. En Drop D seule la 6e descend. Un ton plus bas, les six descendent — la 6e est aussi en Ré, mais les autres changent.",
        },
        {
          question: "Comment jouer avec quelqu’un en standard ?",
          answer: "Placez un capodastre en case 2.",
        },
        {
          question: "Pourquoi l’accordeur affiche-t-il Do et Fa sur les 4e et 3e cordes ?",
          answer:
            "Parce qu’un ton plus bas, Ré devient Do et Sol devient Fa. C’est correct : Ré Sol Do Fa La Ré.",
        },
      ],
    },
    "/432-hz-tuner": {
      metaTitle: "Accordeur 432 Hz en ligne gratuit",
      metaDescription:
        "Accordez votre guitare en La = 432 Hz avec le micro. Toutes les cordes sont recalculées automatiquement. Gratuit, en ligne, sans téléchargement.",
      title: "Accordeur 432 Hz",
      intro:
        "Accordez en La = 432 Hz avec le micro. L’accordeur est déjà réglé sur 432 : jouez une corde et suivez l’aiguille, toutes les cibles sont recalculées.",
      sections: [
        {
          heading: "Accorder à 432 Hz, c’est quoi ?",
          body: [
            "Le diapason standard fixe le La4 à 440 Hz. À 432 Hz, **toutes les notes descendent dans la même proportion**, environ 31,8 cents (presque un tiers de demi-ton). Les intervalles ne changent pas : accords, gammes et tablatures fonctionnent pareil.",
            "Sur une guitare, le Mi grave passe de 82,41 Hz à 80,91 Hz et le Mi aigu de 329,63 Hz à 323,63 Hz. La tension baisse d’environ 3,6 %.",
          ],
        },
        {
          heading: "Ce que l’on sait, et ce que l’on ne sait pas",
          body: [
            "Beaucoup de musiciens trouvent le son à 432 Hz plus chaleureux, et c’est une préférence légitime. Les affirmations selon lesquelles il serait plus sain ou plus naturel n’ont pas résisté aux tests à l’aveugle : la plupart des gens ne distinguent pas 432 de 440 sans référence.",
            "À 432, vous serez **faux par rapport aux enregistrements et aux musiciens à 440**.",
            "Dans le panneau de réglages, vous pouvez choisir n’importe quel diapason entre 415 et 466 Hz, par exemple 442 pour l’orchestre.",
          ],
        },
      ],
      faqs: [
        {
          question: "Ça marche pour basse, ukulélé ou violon ?",
          answer:
            "Oui. Choisissez l’instrument dans le panneau de réglages ; le diapason reste à 432 et toutes les cordes sont recalculées.",
        },
        {
          question: "432 Hz est-il meilleur que 440 Hz ?",
          answer:
            "C’est une affaire de goût. Aucune preuve solide de bienfaits pour la santé ; si vous aimez le son un peu plus grave, c’est une raison suffisante.",
        },
        {
          question: "De combien tourner les mécaniques ?",
          answer: "Depuis 440, chaque corde est environ 32 cents trop haute : un petit quart de tour.",
        },
      ],
    },
    "/bass-tuner": {
      metaTitle: "Accordeur de basse en ligne gratuit",
      metaDescription:
        "Accordeur de basse en ligne et gratuit. Accordez votre basse 4 cordes (Mi La Ré Sol) avec le micro, jusqu’au Mi grave de 41 Hz.",
      title: "Accordeur de basse",
      intro:
        "Accordez votre basse 4 cordes (Mi La Ré Sol) avec le micro. L’accordeur est déjà réglé pour la basse : appuyez sur Activer le micro et jouez une corde.",
      sections: [
        {
          heading: "Pourquoi la basse est difficile pour un micro",
          body: [
            "Les fondamentales de la basse sont entre 41 et 98 Hz, justement la zone que les micros de téléphone et d’ordinateur coupent, car ils sont conçus pour la voix.",
            "Mais une corde de basse ne sonne pas que sur sa fondamentale : elle produit des harmoniques au double, au triple, au quadruple de la fréquence, que le micro capte bien. L’accordeur exploite cette série et ramène la lecture à la bonne octave. Pour l’aider :",
            {
              list: [
                "Rapprochez le téléphone de la basse.",
                "Attaquez franchement près du micro manche et étouffez les autres cordes.",
                "Accordez ampli éteint, dans une pièce calme.",
              ],
            },
          ],
        },
        {
          heading: "Basse et guitare : même accordage, une octave plus bas",
          body: [
            "Les quatre cordes de la basse (Mi La Ré Sol) portent les noms des quatre cordes graves de la guitare, mais sonnent exactement une octave plus bas. Avec un guitariste, vous pouvez vérifier l’accord en jouant la même note : elles doivent sonner « pareil », sans battement.",
          ],
        },
      ],
      faqs: [
        {
          question: "Quel est l’accordage standard de la basse ?",
          answer: "Mi La Ré Sol, du grave à l’aigu (E A D G) : Mi1, La1, Ré2 et Sol2.",
        },
        {
          question: "Puis-je accorder basse branchée sur l’ampli ?",
          answer:
            "Cet accordeur utilise le micro de l’appareil : accordez plutôt ampli éteint ou bas, le bruit et le ronflement gênent la lecture des graves.",
        },
        {
          question: "Et pour une basse 5 cordes ?",
          answer:
            "Dans le panneau Instrument, choisissez Basse 5 cordes, qui ajoute un Si grave sous le Mi. Une page dédiée existe aussi.",
        },
      ],
    },
    "/5-string-bass-tuner": {
      metaTitle: "Accordeur de basse 5 cordes gratuit",
      metaDescription:
        "Accordez votre basse 5 cordes (Si Mi La Ré Sol) avec le micro, y compris le Si grave à 30,87 Hz. En ligne, gratuit et sans téléchargement.",
      title: "Accordeur de basse 5 cordes",
      intro:
        "Accordez votre basse 5 cordes avec le micro : l’accordeur est déjà réglé sur Si Mi La Ré Sol. Attaquez franchement et suivez l’aiguille.",
      sections: [
        {
          heading: "Le Si grave",
          body: [
            "La basse 5 cordes ajoute un **Si grave (Si0, 30,87 Hz)** sous le Mi. C’est une note si grave que les micros de téléphone n’en captent presque pas la fondamentale.",
            "L’accordeur écoute donc aussi les harmoniques de la corde et ramène la lecture à la bonne octave. Attaquez franchement près du micro manche, étouffez les autres cordes et rapprochez le téléphone.",
          ],
        },
        {
          heading: "Cordes et diapason",
          body: [
            "Pour que le Si ait assez de tension, on utilise des cordes de 125 à 135 et souvent des basses en **diapason 35 pouces**. Sur une basse à diapason court, le Si peut rester mou et flou même à 0 cent.",
          ],
        },
      ],
      faqs: [
        {
          question: "Pourquoi l’aiguille met-elle du temps sur le Si ?",
          answer:
            "Une période du Si grave dure 32 millisecondes, et l’accordeur en a besoin de plusieurs. Laissez sonner la note et lisez l’aiguille après l’attaque.",
        },
        {
          question: "Les autres cordes sont-elles comme sur une 4 cordes ?",
          answer: "Oui : Mi, La, Ré et Sol ont exactement les mêmes fréquences.",
        },
        {
          question: "Existe-t-il des basses 5 cordes avec un Do aigu ?",
          answer:
            "Oui, certains bassistes utilisent Mi La Ré Sol Do. Cet accordeur est réglé sur la version avec Si grave, la plus courante.",
        },
      ],
    },
    "/ukulele-tuner": {
      metaTitle: "Accordeur de ukulélé en ligne gratuit",
      metaDescription:
        "Accordeur de ukulélé en ligne et gratuit. Accordez en Sol Do Mi La avec le micro, directement ici. Pour soprano, concert et ténor.",
      title: "Accordeur de ukulélé",
      intro:
        "Accordez votre ukulélé en Sol Do Mi La avec le micro. L’accordeur est déjà réglé pour le ukulélé : appuyez sur Activer le micro et jouez une corde.",
      chartCaption:
        "Voici les fréquences exactes que l’accordeur recherche, avec La4 = 440 Hz. La corde 4 (Sol) n’est pas la plus grave : l’accordage du ukulélé est rentrant, le Sol est au-dessus du Do et du Mi.",
      sections: [
        {
          heading: "L’accordage rentrant",
          body: [
            "Ce qui surprend le plus les guitaristes, c’est que **les cordes ne vont pas du grave à l’aigu**. Les notes sont Sol4 (392 Hz), Do4 (262 Hz), Mi4 (330 Hz) et La4 (440 Hz) : la 4e corde est la deuxième plus aiguë.",
            "On parle d’**accordage rentrant**. Les quatre cordes tenant dans une octave, les accords n’ont pas de basse marquée — d’où le son brillant et léger du ukulélé.",
          ],
        },
        {
          heading: "Les tailles",
          body: [
            "Soprano, concert et ténor s’accordent tous en **Sol Do Mi La**. Le **baryton**, le plus grand, s’accorde Ré Sol Si Mi et a sa propre page.",
            "Certains joueurs remplacent le Sol aigu par un **Sol grave** (Sol3, 196 Hz) pour un son plus plein. Il faut une corde spéciale : une corde normale descendue d’une octave serait trop molle.",
          ],
        },
      ],
      faqs: [
        {
          question: "Pourquoi la 4e corde est-elle plus aiguë que la 3e ?",
          answer:
            "Parce que l’accordage est rentrant : le Sol est au-dessus du Do et du Mi. C’est voulu et c’est ce qui fait le son du ukulélé.",
        },
        {
          question: "Pourquoi mon ukulélé neuf se désaccorde-t-il sans arrêt ?",
          answer:
            "Les cordes en nylon s’étirent beaucoup les premiers jours. Étirez-les doucement et réaccordez plusieurs fois ; en une semaine, tout se stabilise.",
        },
        {
          question: "L’accordeur affiche Sol plus haut que Do, c’est normal ?",
          answer: "Oui, c’est l’accordage rentrant. C’est la confusion la plus fréquente au ukulélé.",
        },
      ],
    },
    "/baritone-ukulele-tuner": {
      metaTitle: "Accordeur de ukulélé baryton gratuit",
      metaDescription:
        "Accordez votre ukulélé baryton en Ré Sol Si Mi avec le micro, directement ici. En ligne, gratuit et sans téléchargement.",
      title: "Accordeur de ukulélé baryton",
      intro:
        "Accordez votre ukulélé baryton avec le micro : l’accordeur est déjà réglé sur Ré Sol Si Mi, comme les quatre cordes aiguës de la guitare.",
      chartCaption:
        "Voici les fréquences exactes que l’accordeur recherche, avec La4 = 440 Hz. Contrairement au ukulélé standard, le baryton est accordé dans l’ordre : la corde 4 (Ré) est la plus grave et la corde 1 (Mi) la plus aiguë.",
      sections: [
        {
          heading: "Baryton et ukulélé standard",
          body: [
            "Soprano, concert et ténor s’accordent en **Sol Do Mi La** avec un Sol aigu. Le baryton, le plus grand (environ 76 cm), s’accorde en **Ré Sol Si Mi**, du grave à l’aigu, comme une guitare.",
            "Les positions sont les mêmes qu’au ukulélé standard, mais sonnent une quarte plus bas : la position de Do du soprano donne Sol au baryton.",
          ],
        },
        {
          heading: "Si vous venez de la guitare",
          body: [
            "Le baryton reprend l’accordage des quatre cordes aiguës de la guitare : **les accords de guitare sur ces cordes gardent leur nom**.",
            "Les cordes Ré et Sol sont souvent filées (métal) : c’est normal et cela donne du corps aux graves.",
          ],
        },
      ],
      faqs: [
        {
          question: "Peut-on accorder le baryton en Sol Do Mi La ?",
          answer:
            "Seulement avec des cordes prévues pour. Avec des cordes de baryton normales, la tension serait trop forte.",
        },
        {
          question: "L’accordage est-il rentrant ?",
          answer: "Non, l’accordage standard du baryton est linéaire, avec Ré3 en 4e corde.",
        },
        {
          question: "L’accordeur affiche le Ré une octave trop haut ?",
          answer: "Il capte une harmonique. Jouez au-dessus de la rosace et laissez sonner.",
        },
      ],
    },
    "/7-string-guitar-tuner": {
      metaTitle: "Accordeur de guitare 7 cordes gratuit",
      metaDescription:
        "Accordez votre guitare 7 cordes (Si Mi La Ré Sol Si Mi) avec le micro, Si grave compris. En ligne, gratuit et sans téléchargement.",
      title: "Accordeur de guitare 7 cordes",
      intro:
        "Accordez votre guitare 7 cordes avec le micro : l’accordeur est déjà réglé sur Si Mi La Ré Sol Si Mi.",
      sections: [
        {
          heading: "La septième corde",
          body: [
            "La guitare 7 cordes ajoute un **Si grave (Si1, 61,74 Hz)** sous le Mi. Les six autres cordes s’accordent exactement comme sur une guitare normale.",
            "Le Si est une quarte sous le Mi, le même intervalle qu’entre presque toutes les cordes : les gammes se prolongent naturellement.",
          ],
        },
        {
          heading: "Usages",
          body: [
            "C’est la guitare du **metal moderne** et du djent, mais aussi du jazz, où la septième corde permet de jouer ses propres lignes de basse.",
            "Variante courante : le **Drop A** (La Mi La Ré Sol Si Mi), en descendant la septième corde d’un ton.",
          ],
        },
      ],
      faqs: [
        {
          question: "Les six cordes aiguës changent-elles ?",
          answer: "Non : Mi La Ré Sol Si Mi, comme sur toute guitare 6 cordes.",
        },
        {
          question: "Quel tirant pour la septième corde ?",
          answer:
            "En général entre 56 et 64 pour un Si en diapason standard ; plus le diapason est long, plus la corde est tendue et précise.",
        },
        {
          question: "L’accordeur lit-il bien le Si grave ?",
          answer: "Oui, à 61,74 Hz. Si l’aiguille hésite, attaquez franchement et étouffez les autres cordes.",
        },
      ],
    },
    "/12-string-guitar-tuner": {
      metaTitle: "Accordeur de guitare 12 cordes gratuit",
      metaDescription:
        "Accordez votre guitare 12 cordes avec le micro : six chœurs, quatre à l’octave et deux à l’unisson. En ligne et gratuit.",
      title: "Accordeur de guitare 12 cordes",
      intro:
        "Accordez votre guitare 12 cordes avec le micro : l’accordeur est déjà réglé avec les six chœurs (paires de cordes).",
      chartCaption:
        "Voici les fréquences exactes que l’accordeur recherche, avec La4 = 440 Hz. Chaque ligne est un chœur de deux cordes. Les quatre graves ont une corde à l’octave supérieure ; les deux aigus (Si et Mi) sont à l’unisson.",
      sections: [
        {
          heading: "Accorder une 12 cordes",
          body: [
            "Les douze cordes forment **six chœurs** sur les notes de l’accordage standard. Pour Mi, La, Ré et Sol, la seconde corde est **à l’octave supérieure** ; pour Si et Mi, les deux cordes sont **à l’unisson**.",
            "Accordez **chaque corde séparément** : étouffez sa voisine avec un doigt. Si les deux sonnent, l’accordeur entend deux notes et l’aiguille ne se fixe pas.",
          ],
        },
        {
          heading: "Tension et manche",
          body: [
            "Douze cordes tirent sur le manche presque deux fois plus fort. Beaucoup de guitaristes accordent leur 12 cordes **un demi-ton ou un ton plus bas** et jouent avec un capodastre — une bonne idée sur une guitare ancienne.",
            "À la fin, jouez chaque chœur : un battement rapide signale qu’une des deux cordes est encore fausse.",
          ],
        },
      ],
      faqs: [
        {
          question: "Pourquoi les chœurs de Si et Mi ne sont-ils pas à l’octave ?",
          answer:
            "Une corde à l’octave du Mi aigu serait à la limite de la rupture. On utilise donc deux cordes identiques.",
        },
        {
          question: "Dans quel ordre accorder les douze cordes ?",
          answer:
            "D’abord la corde principale de chaque chœur, du grave à l’aigu, puis les cordes d’octave ou d’unisson. Terminez par un second passage.",
        },
        {
          question: "Peut-on utiliser des accordages alternatifs ?",
          answer:
            "Oui, avec prudence : monter des cordes sur une 12 cordes ajoute beaucoup de tension. Les accordages qui descendent les cordes sont les plus sûrs.",
        },
      ],
    },
    "/mandolin-tuner": {
      metaTitle: "Accordeur de mandoline en ligne gratuit",
      metaDescription:
        "Accordez votre mandoline en Sol Ré La Mi avec le micro : les huit cordes, paire par paire. En ligne, gratuit et sans téléchargement.",
      title: "Accordeur de mandoline",
      intro:
        "Accordez votre mandoline avec le micro : l’accordeur est déjà réglé sur Sol Ré La Mi. Accordez chaque corde de la paire séparément.",
      chartCaption:
        "Voici les fréquences exactes que l’accordeur recherche, avec La4 = 440 Hz. Chaque ligne est une paire de cordes à l’unisson : les deux ont la même cible.",
      sections: [
        {
          heading: "Quatre paires à l’unisson",
          body: [
            "La mandoline compte **huit cordes en quatre paires**, accordées deux à deux sur la même note : Sol3, Ré4, La4 et Mi5 — les mêmes notes que le violon.",
            "**Accordez une corde à la fois** en posant un doigt sur sa voisine. Si les deux sonnent, l’accordeur entend deux notes presque identiques et l’aiguille oscille.",
          ],
        },
        {
          heading: "Le chevalet flottant",
          body: [
            "Sur la plupart des mandolines, le chevalet n’est pas collé : seule la pression des cordes le maintient. S’il bouge, les cordes à vide peuvent être justes et les notes frettées fausses.",
            "Changez les cordes une par une pour ne pas le déplacer, et vérifiez que la case 12 sonne exactement à l’octave de la corde à vide.",
          ],
        },
      ],
      faqs: [
        {
          question: "Comment savoir si les deux cordes d’une paire sont identiques ?",
          answer:
            "Jouez-les ensemble : si le son est net et stable, elles sont justes. Une ondulation signale qu’une des deux est fausse.",
        },
        {
          question: "Et pour la mandole ?",
          answer:
            "La mandole s’accorde Do Sol Ré La, comme l’alto : utilisez l’accordeur d’alto.",
        },
        {
          question: "Pourquoi les cordes de Mi cassent-elles ?",
          answer:
            "Elles sont fines et très tendues. Montez doucement en approchant la note par en dessous et vérifiez le sillet et le chevalet.",
        },
      ],
    },
    "/banjo-tuner": {
      metaTitle: "Accordeur de banjo 5 cordes gratuit",
      metaDescription:
        "Accordez votre banjo 5 cordes en open G (Sol Ré Sol Si Ré) avec le micro, y compris la 5e corde courte. En ligne et gratuit.",
      title: "Accordeur de banjo",
      intro:
        "Accordez votre banjo 5 cordes avec le micro : l’accordeur est déjà réglé en open G (Sol Ré Sol Si Ré), avec la 5e corde aiguë.",
      chartCaption:
        "Voici les fréquences exactes que l’accordeur recherche, avec La4 = 440 Hz. La corde 5 (la courte, avec sa mécanique à mi-manche) n’est pas la plus grave : c’est un Sol4 aigu.",
      sections: [
        {
          heading: "La 5e corde",
          body: [
            "Le banjo 5 cordes possède une **corde courte** qui commence à la case 5 et s’accorde en **Sol4**, plus aiguë que toutes les autres cordes à vide. Elle sert de bourdon : dans les rolls du bluegrass, le pouce y revient sans cesse.",
            "Sa mécanique est sur le côté du manche et se dérègle facilement quand on range le banjo. Vérifiez-la à chaque sortie de l’étui.",
          ],
        },
        {
          heading: "Autres accordages du banjo",
          body: [
            {
              list: [
                "**Double C** (Sol Do Sol Do Ré) : descendez la 4e et la 2e d’un ton. Très utilisé en clawhammer.",
                "**Sol modal** (Sol Ré Sol Do Ré) : montez la 2e de Si à Do.",
                "**Open D** (Fa♯ Ré Fa♯ La Ré) : pour jouer en Ré sans capodastre.",
              ],
            },
            "L’accordeur mesure les cents par rapport à l’open G ; pour les autres, l’écran affiche le nom de la note jouée.",
          ],
        },
      ],
      faqs: [
        {
          question: "Comment utiliser un capodastre avec la 5e corde ?",
          answer:
            "La 5e doit monter d’autant : capodastre en case 2 (La), accordez la 5e en La4. Beaucoup de banjos ont de petits crochets pour la bloquer.",
        },
        {
          question: "Ça marche pour un banjo ténor 4 cordes ?",
          answer:
            "Non. Le banjo ténor s’accorde Do Sol Ré La, comme l’alto : utilisez l’accordeur d’alto.",
        },
        {
          question: "Juste à vide mais faux sur les cases ?",
          answer:
            "Le chevalet du banjo n’est pas fixe. Bien placé, la case 12 sonne exactement à l’octave de la corde à vide.",
        },
      ],
    },
    "/violin-tuner": {
      metaTitle: "Accordeur de violon en ligne gratuit",
      metaDescription:
        "Accordeur de violon en ligne et gratuit. Accordez en Sol Ré La Mi avec le micro, directement ici. Pour toutes les tailles, du 1/16 au 4/4.",
      title: "Accordeur de violon",
      intro:
        "Accordez votre violon en Sol Ré La Mi avec le micro. L’accordeur est déjà réglé : jouez une corde à vide, à l’archet ou en pizzicato.",
      sections: [
        {
          heading: "Chevilles et tendeurs",
          body: [
            "Les **tendeurs** (micro-accordeurs) sont les petites vis du cordier. Dans le sens des aiguilles d’une montre, la note monte. Ils bougent peu la note, ce qui est idéal pour l’ajustement quotidien.",
            "Les **chevilles** ne tiennent que par friction : tournez-les en les poussant légèrement **vers l’intérieur** du chevillier. Règle pratique : au-delà d’environ 30 cents d’écart, approchez avec la cheville et terminez au tendeur.",
          ],
        },
        {
          heading: "Surveillez le chevalet",
          body: [
            "Le chevalet n’est pas collé : seule la pression des cordes le tient. Chaque fois que vous tendez une corde à la cheville, la friction tire le haut du chevalet vers la touche.",
            "Après un changement de cordes, regardez-le de profil : la face côté cordier doit rester à peu près perpendiculaire à la table. S’il penche, demandez à votre professeur ou à un luthier de vous montrer comment le redresser.",
          ],
        },
      ],
      faqs: [
        {
          question: "Quelle corde accorder en premier ?",
          answer:
            "Le La : c’est la référence de l’orchestre. Puis Ré, Sol et Mi, et vérifiez de nouveau le La.",
        },
        {
          question: "Mon orchestre s’accorde à La = 442. Puis-je utiliser cet accordeur ?",
          answer:
            "Oui. Réglez le diapason sur 442 dans le panneau de réglages, ou accordez chaque corde environ 8 cents au-dessus de 0.",
        },
        {
          question: "Les violons de petite taille s’accordent-ils pareil ?",
          answer: "Oui : 1/16, 1/8, 1/4, 1/2 et 3/4 utilisent le même Sol Ré La Mi qu’un 4/4.",
        },
      ],
    },
    "/viola-tuner": {
      metaTitle: "Accordeur d’alto en ligne gratuit",
      metaDescription:
        "Accordez votre alto en Do Sol Ré La avec le micro, directement ici. Pour toutes les tailles. En ligne et gratuit.",
      title: "Accordeur d’alto",
      intro:
        "Accordez votre alto avec le micro : l’accordeur est déjà réglé sur Do Sol Ré La. Commencez par le La et suivez l’aiguille.",
      sections: [
        {
          heading: "L’alto, le violon et le violoncelle",
          body: [
            {
              list: [
                "**Violon** : Sol3 Ré4 La4 Mi5.",
                "**Alto** : Do3 Sol3 Ré4 La4, une quinte sous le violon.",
                "**Violoncelle** : Do2 Sol2 Ré3 La3, une octave sous l’alto.",
              ],
            },
            "L’alto partage Sol, Ré et La avec le violon et ajoute un **Do grave** (130,81 Hz). C’est cette corde qui donne à l’alto sa voix sombre et chaude — et la plus lente à se stabiliser après un changement.",
          ],
        },
        {
          heading: "Lire la clé d’ut",
          body: [
            "L’alto lit en **clé d’ut 3e ligne** : la note sur la ligne du milieu est le Do central (Do4). La corde de Do à vide est donc une octave sous cette ligne.",
            "Utilisez les tendeurs pour les petites corrections et les chevilles seulement pour les grands écarts, puis vérifiez que le chevalet reste perpendiculaire à la table.",
          ],
        },
      ],
      faqs: [
        {
          question: "Un accordeur de violon convient-il à l’alto ?",
          answer:
            "Pour Sol, Ré et La oui, mais il cherche un Mi5 et n’a pas de Do3. Cet accordeur est réglé sur les quatre cordes de l’alto.",
        },
        {
          question: "Pourquoi l’accordeur a-t-il du mal avec le Do ?",
          answer:
            "C’est la note la plus grave de l’instrument. Jouez avec un archet ample et lent, ou en pizzicato, et rapprochez le téléphone.",
        },
        {
          question: "Mon orchestre est à La = 442 ?",
          answer:
            "Réglez le diapason sur 442 dans le panneau de réglages, ou accordez chaque corde environ 8 cents au-dessus de 0.",
        },
      ],
    },
    "/cello-tuner": {
      metaTitle: "Accordeur de violoncelle gratuit",
      metaDescription:
        "Accordez votre violoncelle en Do Sol Ré La avec le micro, y compris le Do grave à 65,41 Hz. En ligne, gratuit et sans téléchargement.",
      title: "Accordeur de violoncelle",
      intro:
        "Accordez votre violoncelle avec le micro : l’accordeur est déjà réglé sur Do Sol Ré La. Commencez par le La et suivez l’aiguille.",
      chartCaption:
        "Voici les fréquences exactes que l’accordeur recherche, avec La4 = 440 Hz. La corde 1 est le La3 (220 Hz), une octave sous le La de l’orchestre.",
      sections: [
        {
          heading: "Où placer le téléphone",
          body: [
            "Le Do grave du violoncelle vibre à **65,41 Hz** et le Sol à 98 Hz, à la limite de ce que captent les micros de téléphone. Posez le téléphone sur le pupitre ou au sol, près de la caisse.",
            "Jouez avec un archet long, lent et appuyé près de la touche. Si l’accordeur affiche Sol quand vous jouez le Do, il capte une harmonique : rapprochez le téléphone et allégez l’archet.",
          ],
        },
        {
          heading: "Chevilles, tendeurs et pique",
          body: [
            "Utilisez les **tendeurs** au quotidien ; beaucoup de violoncelles en ont sur les quatre cordes. Les chevilles, seulement pour les grands écarts, avec une pression ferme vers l’intérieur.",
            "Réglez la pique et installez-vous avant d’accorder : en vous réinstallant après coup, il est facile de heurter une cheville.",
          ],
        },
      ],
      faqs: [
        {
          question: "Pourquoi l’accordeur affiche-t-il La3 et non La4 ?",
          answer:
            "Parce que la corde de La du violoncelle est un La3, à 220 Hz : une octave sous le La 440 de l’orchestre.",
        },
        {
          question: "Les violoncelles de petite taille s’accordent-ils pareil ?",
          answer: "Oui : 7/8, 3/4, 1/2, 1/4 et 1/8 utilisent le même Do Sol Ré La.",
        },
        {
          question: "Mon violoncelle se désaccorde en sortant de l’étui ?",
          answer:
            "C’est souvent la température. Laissez-le quelques minutes hors de l’étui avant d’accorder.",
        },
      ],
    },
  },
};
