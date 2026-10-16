import type { LanguageContent } from "./types";

/** Brazilian Portuguese: solfège note names (Dó Ré Mi), cifra letters where
 *  players use them, decimal comma. "Violão" is the acoustic guitar and
 *  "guitarra" the electric — Brazilian searches use both. */
export const pt: LanguageContent = {
  labels: {
    "/": "Afinador de violão",
    "/drop-d-tuner": "Afinador Drop D",
    "/drop-c-tuner": "Afinador Drop C",
    "/dadgad-tuner": "Afinador DADGAD",
    "/open-g-tuner": "Afinador em Sol aberto",
    "/open-d-tuner": "Afinador em Ré aberto",
    "/open-e-tuner": "Afinador em Mi aberto",
    "/open-c-tuner": "Afinador em Dó aberto",
    "/open-a-tuner": "Afinador em Lá aberto",
    "/half-step-down-tuner": "Afinador meio tom abaixo",
    "/full-step-down-tuner": "Afinador um tom abaixo",
    "/432-hz-tuner": "Afinador 432 Hz",
    "/bass-tuner": "Afinador de baixo",
    "/5-string-bass-tuner": "Afinador de baixo de 5 cordas",
    "/ukulele-tuner": "Afinador de ukulele",
    "/baritone-ukulele-tuner": "Afinador de ukulele barítono",
    "/7-string-guitar-tuner": "Afinador de guitarra de 7 cordas",
    "/12-string-guitar-tuner": "Afinador de violão de 12 cordas",
    "/mandolin-tuner": "Afinador de bandolim",
    "/banjo-tuner": "Afinador de banjo",
    "/violin-tuner": "Afinador de violino",
    "/viola-tuner": "Afinador de viola de arco",
    "/cello-tuner": "Afinador de violoncelo",
  },
  pages: {
    "/": {
      metaTitle: "Afinador de violão e guitarra online grátis",
      metaDescription:
        "Afinador de violão e guitarra online e grátis. Afine pelo microfone, aqui mesmo: afinação padrão, Drop D, meio tom abaixo e mais. Sem baixar nada.",
      title: "Afinador de violão e guitarra",
      intro:
        "Afine seu violão ou guitarra pelo microfone, direto nesta página. Toque em Ativar microfone e toque uma corda: o afinador descobre qual é e mostra para onde girar a tarraxa.",
      sections: [
        {
          heading: "Dó, Ré, Mi e cifra",
          body: [
            "O afinador mostra as notas como se aprende no Brasil: Dó, Ré, Mi, Fá, Sol, Lá, Si. Já as **cifras** das revistinhas e sites de música usam letras. A equivalência é sempre a mesma:",
            {
              list: [
                "**C** = Dó · **D** = Ré · **E** = Mi · **F** = Fá",
                "**G** = Sol · **A** = Lá · **B** = Si",
              ],
            },
            "Por isso a afinação padrão Mi Lá Ré Sol Si Mi aparece escrita como **E A D G B E**. O número depois da nota no quadro (Mi2, Lá2…) indica a oitava: o Mi grave da sexta corda é Mi2 e o Mi agudo da primeira é Mi4.",
          ],
        },
        {
          heading: "Para que lado girar a tarraxa",
          body: [
            "Apertar a corda sobe a nota; afrouxar desce. Dependendo do lado da mão do instrumento, isso pode ser girar num sentido ou no outro — confira o ponteiro depois de um giro pequeno.",
            "Dica de luthier: **afine sempre subindo até a nota**. Se a corda passou do ponto, desça um pouco abaixo e suba de novo até 0 cents. Assim a engrenagem fica tensionada no sentido certo e a afinação dura mais.",
          ],
        },
        {
          heading: "Problemas comuns",
          body: [
            "**O ponteiro pula de um lado para o outro.** Normalmente é barulho de fundo ou várias cordas soando juntas. Toque uma corda só, abafe as outras e chegue mais perto do microfone.",
            "**Todas as cordas marcam 0, mas os acordes soam estranhos.** Pode ser problema de oitavas (regulagem): compare a corda solta com a casa 12. Se a nota da casa 12 não for exatamente uma oitava acima, o instrumento precisa de regulagem.",
          ],
        },
      ],
      faqs: [
        {
          question: "Quais são as notas do violão na afinação padrão?",
          answer:
            "Da sexta corda (a mais grossa) para a primeira (a mais fina): Mi, Lá, Ré, Sol, Si, Mi — em cifra, E A D G B E. As frequências são 82,41; 110,00; 146,83; 196,00; 246,94 e 329,63 Hz.",
        },
        {
          question: "O afinador é grátis? Preciso instalar alguma coisa?",
          answer:
            "É totalmente grátis e funciona no navegador, no celular ou no computador. Basta permitir o acesso ao microfone. O áudio é analisado no seu aparelho e não é enviado para nenhum servidor.",
        },
        {
          question: "Serve para violão de nylon, de aço e guitarra?",
          answer:
            "Sim. Os três usam a mesma afinação padrão. Na guitarra, afine com o amplificador desligado ou baixo e toque perto do microfone do aparelho.",
        },
        {
          question: "O que são cents?",
          answer:
            "Um cent é um centésimo de semitom. Se o ponteiro marca −20, a corda está 20 cents abaixo da nota: aperte a tarraxa. Se marca +20, está alta: afrouxe. Entre −5 e +5 a corda é considerada afinada.",
        },
      ],
    },
    "/drop-d-tuner": {
      metaTitle: "Afinador Drop D online grátis",
      metaDescription:
        "Afine seu violão ou guitarra em Drop D (Ré Lá Ré Sol Si Mi) pelo microfone. Só a sexta corda muda. Grátis e sem baixar nada.",
      title: "Afinador Drop D",
      intro:
        "Afine em Drop D pelo microfone: o afinador já está em Ré Lá Ré Sol Si Mi. Você só precisa baixar a sexta corda um tom.",
      sections: [
        {
          heading: "O que é Drop D",
          body: [
            "Drop D é a afinação padrão com **a sexta corda um tom abaixo**, de Mi para Ré. As outras cinco cordas não mudam. É a afinação alternativa mais usada do mundo porque se entra e se sai dela em segundos.",
            "Com a sexta em Ré, as três cordas graves soltas formam um power chord de Ré, e qualquer power chord passa a ser feito com **um dedo só**, pestanando as três cordas graves na mesma casa. Por isso ela está em tanto rock, grunge e metal.",
          ],
        },
        {
          heading: "Como conferir de ouvido",
          body: [
            "Toque o harmônico da casa 12 da sexta corda e compare com a quarta corda solta: as duas são Ré e devem soar iguais, sem batimento.",
            "Para voltar à afinação padrão, suba a sexta corda até Mi (82,41 Hz) com o afinador.",
          ],
        },
      ],
      faqs: [
        {
          question: "Preciso de cordas novas para Drop D?",
          answer:
            "Não. Baixar uma corda só um tom mantém a tensão dentro do normal. Se a sexta ficar frouxa ou trastejando, uma corda um pouco mais grossa resolve.",
        },
        {
          question: "Os acordes mudam em Drop D?",
          answer:
            "Só os que usam a sexta corda. Acordes feitos nas cinco cordas agudas, como Lá, Ré ou Dó sem baixo na sexta, continuam iguais.",
        },
        {
          question: "Qual a diferença para o Drop C?",
          answer:
            "Drop C é o mesmo padrão um tom abaixo: Dó Sol Dó Fá Lá Ré. Todas as cordas descem um tom e a sexta desce mais um. Soa mais pesado e costuma pedir cordas mais grossas.",
        },
      ],
    },
    "/drop-c-tuner": {
      metaTitle: "Afinador Drop C online grátis",
      metaDescription:
        "Afine sua guitarra em Drop C (Dó Sol Dó Fá Lá Ré) pelo microfone. Afinador online grátis, com a frequência exata de cada corda.",
      title: "Afinador Drop C",
      intro:
        "Afine em Drop C pelo microfone: o afinador já está em Dó Sol Dó Fá Lá Ré. Toque uma corda e siga o ponteiro.",
      sections: [
        {
          heading: "O que é Drop C",
          body: [
            "Drop C é o Drop D um tom abaixo: **todas as cordas descem um tom** em relação à afinação padrão e a sexta desce **mais um tom**, até Dó (65,41 Hz). As relações entre as cordas são as mesmas do Drop D, então todos os shapes de Drop D funcionam — só soam um tom mais graves.",
            "É a afinação típica do metalcore e do hardcore: power chords de um dedo e um grave que preenche tudo.",
          ],
        },
        {
          heading: "Cordas e regulagem",
          body: [
            "Baixar as seis cordas um tom reduz bastante a tensão. Com um jogo 0.10 comum, a sexta fica frouxa e trasteja. O normal é passar para **0.11–0.56 ou 0.12–0.56**.",
            {
              list: [
                "Depois de trocar o calibre, confira o **tensor**: com menos tensão, o braço fica mais reto e pode trastejar.",
                "Confira as **oitavas** (casa 12 contra a corda solta).",
                "Com ponte flutuante, ajuste as molas: com menos tensão, a ponte inclina.",
              ],
            },
          ],
        },
      ],
      faqs: [
        {
          question: "Dá para tocar em Drop C com cordas normais?",
          answer:
            "Dá, mas a sexta corda vai ficar frouxa, trastejar e desafinar quando você tocar com força. Para usar sempre, vale um calibre mais grosso.",
        },
        {
          question: "Drop C é o mesmo que afinar em Dó?",
          answer:
            "Não. A afinação em Dó (Dó Fá Si♭ Mi♭ Sol Dó) desce todas as cordas dois tons. No Drop C só a sexta chega a Dó.",
        },
        {
          question: "Por que o afinador demora na sexta corda?",
          answer:
            "O Dó grave vibra a 65,41 Hz, perto do limite dos microfones de celular e notebook. Toque com firmeza, aproxime o celular e abafe as outras cordas.",
        },
      ],
    },
    "/dadgad-tuner": {
      metaTitle: "Afinador DADGAD online grátis",
      metaDescription:
        "Afine seu violão em DADGAD (Ré Lá Ré Sol Lá Ré) pelo microfone. A afinação celta, com as frequências exatas de cada corda.",
      title: "Afinador DADGAD",
      intro:
        "Afine em DADGAD pelo microfone: o afinador já está em Ré Lá Ré Sol Lá Ré. Só três cordas mudam.",
      sections: [
        {
          heading: "Da afinação padrão para DADGAD",
          body: [
            "A partir da afinação padrão, basta **baixar três cordas um tom**: a sexta de Mi para Ré, a segunda de Si para Lá e a primeira de Mi para Ré.",
            "Soltas, as cordas formam um Ré suspenso (Dsus4): nem maior nem menor. Essa ambiguidade dá ao DADGAD seu som aberto e modal.",
          ],
        },
        {
          heading: "Onde se usa",
          body: [
            "É a afinação de referência da **música celta** no violão e do fingerstyle. As cordas soltas funcionam como bordão sob a melodia.",
            "Também aparece no rock: «Kashmir», do Led Zeppelin, é em DADGAD.",
          ],
        },
      ],
      faqs: [
        {
          question: "Preciso de cordas especiais?",
          answer:
            "Não. Baixar três cordas um tom reduz um pouco a tensão, mas qualquer jogo comum funciona.",
        },
        {
          question: "Que acordes funcionam bem em DADGAD?",
          answer:
            "Os que giram em torno de Ré e Sol, com shapes que deixam as cordas soltas soarem. Com capotraste na casa 2, tudo sobe para Mi.",
        },
        {
          question: "Como volto para a afinação padrão?",
          answer:
            "Suba a sexta e a primeira para Mi e a segunda para Si. No painel Afinação do afinador, escolha Padrão e siga o ponteiro.",
        },
      ],
    },
    "/open-g-tuner": {
      metaTitle: "Afinador em Sol aberto (Open G) grátis",
      metaDescription:
        "Afine seu violão ou guitarra em Sol aberto (Ré Sol Ré Sol Si Ré) pelo microfone. A afinação do slide e do blues, com frequências exatas.",
      title: "Afinador em Sol aberto (Open G)",
      intro:
        "Afine em Sol aberto pelo microfone: o afinador já está em Ré Sol Ré Sol Si Ré. Soltas, as cordas tocam um acorde de Sol maior.",
      sections: [
        {
          heading: "Da afinação padrão para Sol aberto",
          body: [
            "**Baixe três cordas um tom**: a sexta de Mi para Ré, a quinta de Lá para Sol e a primeira de Mi para Ré. Quarta (Ré), terceira (Sol) e segunda (Si) ficam iguais.",
            "Como a tensão diminui em vez de aumentar, é uma afinação segura para qualquer violão ou guitarra.",
          ],
        },
        {
          heading: "Por que é tão usada",
          body: [
            "Com as seis cordas formando um acorde maior, **uma pestana reta em qualquer casa é outro acorde maior**: casa 5 para Dó, casa 7 para Ré. Isso a torna perfeita para o **slide**.",
            "É a afinação do blues do Delta e de muitos riffs de Keith Richards, que ainda tira a sexta corda e toca com cinco.",
          ],
        },
      ],
      faqs: [
        {
          question: "Sol aberto faz mal ao instrumento?",
          answer:
            "Não. Só se afrouxam cordas, então a tensão total diminui.",
        },
        {
          question: "Qual a diferença entre Sol aberto e Ré aberto?",
          answer:
            "Sol aberto (Ré Sol Ré Sol Si Ré) forma Sol maior; Ré aberto (Ré Lá Ré Fá♯ Lá Ré) forma Ré maior, mais grave e profundo.",
        },
        {
          question: "Como faço um acorde menor em Sol aberto?",
          answer:
            "Desça meio tom a terça do acorde, que fica na segunda corda: com pestana na casa 5 (Dó), toque a segunda corda na casa 4 para Dó menor.",
        },
      ],
    },
    "/open-d-tuner": {
      metaTitle: "Afinador em Ré aberto (Open D) grátis",
      metaDescription:
        "Afine seu violão em Ré aberto (Ré Lá Ré Fá♯ Lá Ré) pelo microfone. Afinação de slide e fingerstyle, com frequências exatas.",
      title: "Afinador em Ré aberto (Open D)",
      intro:
        "Afine em Ré aberto pelo microfone: o afinador já está em Ré Lá Ré Fá♯ Lá Ré. Soltas, as cordas tocam Ré maior.",
      sections: [
        {
          heading: "Da afinação padrão para Ré aberto",
          body: [
            {
              list: [
                "Sexta: de Mi para **Ré** (um tom abaixo).",
                "Terceira: de Sol para **Fá♯** (meio tom abaixo).",
                "Segunda: de Si para **Lá** (um tom abaixo).",
                "Primeira: de Mi para **Ré** (um tom abaixo).",
              ],
            },
            "A quinta (Lá) e a quarta (Ré) não mudam.",
          ],
        },
        {
          heading: "Um som grande e grave",
          body: [
            "Com dois Ré graves, Ré aberto soa amplo e ressonante. É a afinação clássica do slide no blues (também chamada **Vestapol**) e uma das preferidas do fingerstyle.",
            "Como no Sol aberto, a pestana reta dá acordes maiores: casa 5 para Sol, casa 7 para Lá.",
          ],
        },
      ],
      faqs: [
        {
          question: "Ré aberto e Mi aberto são a mesma afinação?",
          answer:
            "Têm o mesmo formato, mas Mi aberto é um tom acima. Muita gente prefere Ré aberto com capotraste na casa 2 a aumentar a tensão.",
        },
        {
          question: "Preciso de cordas mais grossas?",
          answer:
            "Não. Ré aberto diminui a tensão de quatro cordas. Para slide, um calibre um pouco mais grosso ajuda.",
        },
        {
          question: "Qual a diferença para o DADGAD?",
          answer:
            "Só a terceira corda: Fá♯ em Ré aberto (acorde maior), Sol em DADGAD (acorde suspenso).",
        },
      ],
    },
    "/open-e-tuner": {
      metaTitle: "Afinador em Mi aberto (Open E) grátis",
      metaDescription:
        "Afine sua guitarra em Mi aberto (Mi Si Mi Sol♯ Si Mi) pelo microfone. Afinação de slide, com as frequências exatas de cada corda.",
      title: "Afinador em Mi aberto (Open E)",
      intro:
        "Afine em Mi aberto pelo microfone: o afinador já está em Mi Si Mi Sol♯ Si Mi. Soltas, as cordas tocam Mi maior.",
      sections: [
        {
          heading: "Da afinação padrão para Mi aberto",
          body: [
            "Mi aberto **sobe** três cordas: a quinta de Lá para **Si** (um tom), a quarta de Ré para **Mi** (um tom) e a terceira de Sol para **Sol♯** (meio tom).",
            "Subir cordas aumenta a tensão no braço. Suba devagar, de olho no ponteiro, sem passar da nota.",
          ],
        },
        {
          heading: "Mi aberto ou Ré aberto com capotraste",
          body: [
            "O formato é o mesmo do Ré aberto, um tom acima. Muitos guitarristas afinam em **Ré aberto e colocam capotraste na casa 2**: soa em Mi sem forçar o instrumento.",
            "Quem usa Mi aberto direto costuma tocar guitarra com slide: é o som de Duane Allman e Derek Trucks.",
          ],
        },
      ],
      faqs: [
        {
          question: "Mi aberto é perigoso para o violão?",
          answer:
            "Com cordas normais costuma ir bem, mas aumenta a tensão. Em violões antigos ou com cordas grossas, prefira Ré aberto com capotraste na casa 2.",
        },
        {
          question: "Por que a terceira corda arrebenta?",
          answer:
            "Subindo de Sol para Sol♯ ela trabalha mais perto do limite. Suba devagar e verifique se o rastilho não está pinçando a corda.",
        },
        {
          question: "Que acordes a pestana reta dá?",
          answer:
            "Acordes maiores: casa 5 para Lá e casa 7 para Si. Com as cordas soltas (Mi), cobrem o blues em Mi.",
        },
      ],
    },
    "/open-c-tuner": {
      metaTitle: "Afinador em Dó aberto (Open C) grátis",
      metaDescription:
        "Afine seu violão em Dó aberto (Dó Sol Dó Sol Dó Mi) pelo microfone. A afinação aberta mais grave, com frequências exatas.",
      title: "Afinador em Dó aberto (Open C)",
      intro:
        "Afine em Dó aberto pelo microfone: o afinador já está em Dó Sol Dó Sol Dó Mi. Soltas, as cordas tocam um Dó maior bem grave.",
      sections: [
        {
          heading: "Da afinação padrão para Dó aberto",
          body: [
            {
              list: [
                "Sexta: de Mi para **Dó** (dois tons abaixo).",
                "Quinta: de Lá para **Sol** (um tom abaixo).",
                "Quarta: de Ré para **Dó** (um tom abaixo).",
                "Terceira: **Sol**, sem mudança.",
                "Segunda: de Si para **Dó** (meio tom acima).",
                "Primeira: **Mi**, sem mudança.",
              ],
            },
            "A sexta desce até 65,41 Hz e fica bem frouxa com um jogo comum; para usar sempre, vale uma sexta mais grossa.",
          ],
        },
        {
          heading: "Um som de piano",
          body: [
            "Com três Dó e dois Sol, o acorde solto é enorme. Dó aberto é muito usado no fingerstyle e em peças instrumentais em que as cordas soltas fazem bordão.",
            "Os shapes de acordes são novos para quase todo mundo: é uma afinação para explorar.",
          ],
        },
      ],
      faqs: [
        {
          question: "A sexta corda trasteja em Dó aberto?",
          answer:
            "Com um jogo comum é normal, porque ela desce dois tons. Toque mais leve ou use uma corda mais grossa.",
        },
        {
          question: "O afinador lê bem o Dó grave?",
          answer:
            "A 65,41 Hz está perto do limite do microfone do celular. Toque com firmeza e aproxime o celular da boca do violão.",
        },
        {
          question: "Qual a diferença para o Drop C?",
          answer:
            "No Drop C as cinco cordas agudas mantêm os intervalos da afinação padrão; no Dó aberto as seis formam Dó maior.",
        },
      ],
    },
    "/open-a-tuner": {
      metaTitle: "Afinador em Lá aberto (Open A) grátis",
      metaDescription:
        "Afine sua guitarra em Lá aberto (Mi Lá Mi Lá Dó♯ Mi) pelo microfone. Afinação de slide e blues, com frequências exatas.",
      title: "Afinador em Lá aberto (Open A)",
      intro:
        "Afine em Lá aberto pelo microfone: o afinador já está em Mi Lá Mi Lá Dó♯ Mi. Soltas, as cordas tocam Lá maior.",
      sections: [
        {
          heading: "Da afinação padrão para Lá aberto",
          body: [
            "Lá aberto **sobe** três cordas um tom: a quarta de Ré para **Mi**, a terceira de Sol para **Lá** e a segunda de Si para **Dó♯**.",
            "É o mesmo formato do Sol aberto, um tom acima. Muita gente prefere **Sol aberto com capotraste na casa 2**, que soa igual sem aumentar a tensão.",
          ],
        },
        {
          heading: "O Lá do blues",
          body: [
            "Lá é um dos tons mais comuns do blues, e Lá aberto permite tocar slide nele com as cordas soltas soando. Pestana reta na casa 5 dá Ré e na casa 7 dá Mi: os três acordes do blues em Lá.",
          ],
        },
      ],
      faqs: [
        {
          question: "Lá aberto força demais o braço?",
          answer:
            "Aumenta a tensão de três cordas. Com cordas leves costuma ir bem; com cordas grossas, prefira Sol aberto com capotraste na casa 2.",
        },
        {
          question: "Qual corda costuma arrebentar?",
          answer:
            "A segunda, subindo de Si para Dó♯. Suba devagar e sem passar da nota.",
        },
        {
          question: "Os riffs de Sol aberto funcionam?",
          answer:
            "Sim, todos os shapes de Sol aberto funcionam em Lá aberto, só soam um tom acima.",
        },
      ],
    },
    "/half-step-down-tuner": {
      metaTitle: "Afinador meio tom abaixo (Mi♭) grátis",
      metaDescription:
        "Afine sua guitarra meio tom abaixo (Mi♭ Lá♭ Ré♭ Sol♭ Si♭ Mi♭) pelo microfone. Como Hendrix e SRV. Online e grátis.",
      title: "Afinador meio tom abaixo",
      intro:
        "Afine meio tom abaixo pelo microfone: o afinador já está configurado. Na tela as notas aparecem com sustenidos (Ré♯ Sol♯ Dó♯ Fá♯ Lá♯ Ré♯), que são as mesmas que Mi♭ Lá♭ Ré♭ Sol♭ Si♭ Mi♭.",
      sections: [
        {
          heading: "O que muda",
          body: [
            "Todas as cordas descem **meio tom**. Os intervalos entre as cordas são os da afinação padrão, então **todos os acordes e escalas são iguais**, só soam meio tom mais graves.",
            "A tensão cai um pouco: bends ficam mais fáceis e o som, mais encorpado. É a afinação de Jimi Hendrix, Stevie Ray Vaughan, Van Halen e Guns N’ Roses.",
          ],
        },
        {
          heading: "Para quem canta",
          body: [
            "Descer meio tom também ajuda a voz: uma música um pouco alta fica confortável sem mudar nenhum acorde.",
            "Para tocar com alguém na afinação padrão, um capotraste na casa 1 resolve.",
          ],
        },
      ],
      faqs: [
        {
          question: "Por que o afinador mostra Ré♯ e não Mi♭?",
          answer:
            "São a mesma nota com dois nomes. O afinador usa sustenidos; as cifras de músicas meio tom abaixo costumam usar bemóis.",
        },
        {
          question: "Preciso de cordas diferentes?",
          answer:
            "Não. Meio tom a menos de tensão funciona com qualquer jogo. Alguns sobem um calibre para manter a sensação de tensão.",
        },
        {
          question: "Como volto para a afinação padrão?",
          answer:
            "Suba todas as cordas meio tom. No painel Afinação, escolha Padrão e siga o ponteiro.",
        },
      ],
    },
    "/full-step-down-tuner": {
      metaTitle: "Afinador um tom abaixo (Ré padrão)",
      metaDescription:
        "Afine sua guitarra um tom abaixo (Ré Sol Dó Fá Lá Ré) pelo microfone. Mais peso sem aprender shapes novos. Online e grátis.",
      title: "Afinador um tom abaixo",
      intro:
        "Afine um tom abaixo (Ré padrão) pelo microfone: o afinador já está em Ré Sol Dó Fá Lá Ré.",
      sections: [
        {
          heading: "O que muda",
          body: [
            "Todas as cordas descem **um tom inteiro**: Mi vira Ré, Lá vira Sol, Ré vira Dó, Sol vira Fá, Si vira Lá e Mi vira Ré. Os intervalos não mudam, então **acordes e escalas são os mesmos**.",
            "É comum no grunge, no stoner e no metal, e também entre cantores que querem um tom mais confortável.",
          ],
        },
        {
          heading: "Cordas e tensão",
          body: [
            "Um tom a menos de tensão faz diferença. Com 0.09 ou 0.10 as cordas podem ficar frouxas; muita gente passa para **0.11 ou 0.12** nessa afinação.",
            "Depois de trocar o calibre, confira o tensor e as oitavas.",
          ],
        },
      ],
      faqs: [
        {
          question: "É o mesmo que Drop D?",
          answer:
            "Não. No Drop D só a sexta desce. Um tom abaixo, descem as seis — a sexta também fica em Ré, mas as outras mudam.",
        },
        {
          question: "Como toco com alguém na afinação padrão?",
          answer: "Coloque o capotraste na casa 2.",
        },
        {
          question: "Por que o afinador marca Dó e Fá na quarta e na terceira?",
          answer:
            "Porque um tom abaixo Ré vira Dó e Sol vira Fá. Está certo: a afinação completa é Ré Sol Dó Fá Lá Ré.",
        },
      ],
    },
    "/432-hz-tuner": {
      metaTitle: "Afinador 432 Hz online grátis",
      metaDescription:
        "Afine seu violão ou guitarra em Lá = 432 Hz pelo microfone. Todas as cordas são recalculadas automaticamente. Grátis e online.",
      title: "Afinador 432 Hz",
      intro:
        "Afine em Lá = 432 Hz pelo microfone. O afinador já está em 432: toque uma corda e siga o ponteiro — todos os alvos já foram recalculados.",
      sections: [
        {
          heading: "O que é afinar em 432 Hz",
          body: [
            "O diapasão padrão fixa o Lá4 em 440 Hz. Em 432 Hz, **todas as notas descem na mesma proporção**, cerca de 31,8 cents (quase um terço de semitom). Os intervalos não mudam: acordes, escalas e cifras funcionam igual.",
            "No violão, o Mi grave passa de 82,41 Hz para 80,91 Hz e o Mi agudo de 329,63 Hz para 323,63 Hz. A tensão das cordas cai cerca de 3,6%.",
          ],
        },
        {
          heading: "O que se sabe e o que não se sabe",
          body: [
            "Muitos músicos acham o som em 432 Hz mais quente, e essa é uma preferência válida. As afirmações de que é mais saudável ou mais natural não se confirmaram em testes cegos: a maioria das pessoas não distingue 432 de 440 sem referência.",
            "Lembre que, em 432, você vai soar **desafinado em relação a gravações e músicos em 440**.",
            "No painel de ajustes você pode escolher qualquer diapasão entre 415 e 466 Hz, como 442 para orquestras.",
          ],
        },
      ],
      faqs: [
        {
          question: "Serve para baixo, ukulele ou violino?",
          answer:
            "Sim. Escolha o instrumento no painel de ajustes; o diapasão fica em 432 e todas as cordas são recalculadas.",
        },
        {
          question: "432 Hz é melhor que 440 Hz?",
          answer:
            "É questão de gosto. Não há provas sólidas de benefícios à saúde; se você gosta do som um pouco mais grave, já é motivo suficiente.",
        },
        {
          question: "Quanto preciso girar as tarraxas?",
          answer:
            "Vindo de 440, cada corda está uns 32 cents alta: um giro pequeno.",
        },
      ],
    },
    "/bass-tuner": {
      metaTitle: "Afinador de baixo online grátis",
      metaDescription:
        "Afinador de baixo online e grátis. Afine seu baixo de 4 cordas (Mi Lá Ré Sol) pelo microfone, aqui mesmo. Preciso até o Mi grave de 41 Hz.",
      title: "Afinador de baixo",
      intro:
        "Afine seu baixo de 4 cordas (Mi Lá Ré Sol) pelo microfone. O afinador já está configurado para baixo: toque em Ativar microfone e toque uma corda.",
      sections: [
        {
          heading: "Por que o baixo é difícil para o microfone",
          body: [
            "As notas do baixo ficam entre 41 e 98 Hz, justamente a faixa que os microfones de celular e notebook cortam, porque foram feitos para a voz.",
            "Mas a corda do baixo não soa só na fundamental: ela produz harmônicos no dobro, no triplo e no quádruplo da frequência, e esses o microfone capta. O afinador usa essa série e traz a leitura de volta para a oitava certa. Para ajudar:",
            {
              list: [
                "Aproxime o celular do baixo.",
                "Toque com firmeza perto do captador do braço e abafe as outras cordas.",
                "Afine com o amplificador desligado, num lugar silencioso.",
              ],
            },
          ],
        },
        {
          heading: "Baixo e violão: a mesma afinação, uma oitava abaixo",
          body: [
            "As quatro cordas do baixo (Mi Lá Ré Sol) têm os mesmos nomes das quatro cordas graves do violão, mas soam exatamente uma oitava abaixo. Tocando com um violonista, vocês podem conferir a afinação tocando a mesma nota: devem soar «iguais», sem batimento.",
          ],
        },
      ],
      faqs: [
        {
          question: "Qual é a afinação padrão do baixo?",
          answer:
            "Mi Lá Ré Sol, da corda mais grave para a mais aguda (em cifra, E A D G): Mi1, Lá1, Ré2 e Sol2.",
        },
        {
          question: "Posso afinar com o baixo ligado no amplificador?",
          answer:
            "Este afinador usa o microfone do aparelho, então é melhor afinar com o amplificador desligado ou baixo. Ruído e zumbido confundem a leitura dos graves.",
        },
        {
          question: "Serve para baixo de 5 cordas?",
          answer:
            "Sim: no painel Instrumento, escolha Baixo de 5 cordas, que acrescenta um Si grave abaixo do Mi. Também existe uma página própria para ele.",
        },
      ],
    },
    "/5-string-bass-tuner": {
      metaTitle: "Afinador de baixo de 5 cordas grátis",
      metaDescription:
        "Afine seu baixo de 5 cordas (Si Mi Lá Ré Sol) pelo microfone, incluindo o Si grave de 30,87 Hz. Online, grátis e sem baixar nada.",
      title: "Afinador de baixo de 5 cordas",
      intro:
        "Afine seu baixo de 5 cordas pelo microfone: o afinador já está em Si Mi Lá Ré Sol. Toque com firmeza e siga o ponteiro.",
      sections: [
        {
          heading: "O Si grave",
          body: [
            "O baixo de 5 cordas acrescenta um **Si grave (Si0, 30,87 Hz)** abaixo do Mi. É uma nota tão grave que os microfones de celular quase não captam a fundamental.",
            "Este afinador resolve isso ouvindo também os harmônicos da corda e trazendo a leitura de volta para a oitava certa. Toque com firmeza perto do captador do braço, abafe as outras cordas e aproxime o celular.",
          ],
        },
        {
          heading: "Cordas e escala",
          body: [
            "Para o Si ter tensão suficiente, usam-se cordas de calibre 0.125 a 0.135 e, muitas vezes, baixos de **escala 35 polegadas**. Num baixo de escala curta, o Si pode ficar frouxo e sem definição mesmo marcando 0 cents.",
          ],
        },
      ],
      faqs: [
        {
          question: "Por que o ponteiro demora a estabilizar no Si?",
          answer:
            "Um ciclo do Si grave dura 32 milissegundos, e o afinador precisa de vários ciclos. Deixe a nota soar e leia o ponteiro depois do ataque.",
        },
        {
          question: "As outras cordas são iguais às do baixo de 4?",
          answer: "Sim: Mi, Lá, Ré e Sol têm as mesmas frequências.",
        },
        {
          question: "Existe baixo de 5 cordas com Dó agudo?",
          answer:
            "Sim, alguns baixistas usam Mi Lá Ré Sol Dó. Este afinador está configurado para a versão com Si grave, a mais comum.",
        },
      ],
    },
    "/ukulele-tuner": {
      metaTitle: "Afinador de ukulele online grátis",
      metaDescription:
        "Afinador de ukulele online e grátis. Afine em Sol Dó Mi Lá pelo microfone, aqui mesmo. Para soprano, concerto e tenor.",
      title: "Afinador de ukulele",
      intro:
        "Afine seu ukulele em Sol Dó Mi Lá pelo microfone. O afinador já está configurado para ukulele: toque em Ativar microfone e toque uma corda.",
      chartCaption:
        "Estas são as frequências exatas que o afinador procura, com Lá4 = 440 Hz. Repare que a corda 4 (Sol) não é a mais grave: a afinação do ukulele é reentrante e o Sol fica acima do Dó e do Mi.",
      sections: [
        {
          heading: "A afinação reentrante",
          body: [
            "O que mais confunde quem vem do violão é que **as cordas não vão do grave para o agudo**. As notas são Sol4 (392 Hz), Dó4 (262 Hz), Mi4 (330 Hz) e Lá4 (440 Hz): a quarta corda é a segunda mais aguda.",
            "Isso se chama **afinação reentrante**. Como as quatro cordas cabem numa oitava, os acordes não têm baixo marcado — daí o som brilhante e leve do ukulele.",
          ],
        },
        {
          heading: "Ukulele não é cavaquinho",
          body: [
            "Os dois são parecidos no tamanho, mas o **cavaquinho** usa cordas de aço e se afina normalmente em **Ré Sol Si Ré**. Este afinador está configurado para o ukulele (Sol Dó Mi Lá) em nylon.",
            "Os tamanhos soprano, concerto e tenor usam Sol Dó Mi Lá. O **barítono** é diferente: Ré Sol Si Mi, e tem página própria.",
          ],
        },
      ],
      faqs: [
        {
          question: "Por que a quarta corda soa mais aguda que a terceira?",
          answer:
            "Porque a afinação é reentrante: o Sol fica acima do Dó e do Mi. É de propósito e faz parte do som do ukulele.",
        },
        {
          question: "O que é ukulele com Sol grave (low G)?",
          answer:
            "É afinar a quarta corda uma oitava abaixo, em Sol3 (196 Hz). Precisa de uma corda própria para Sol grave.",
        },
        {
          question: "Por que meu ukulele novo desafina toda hora?",
          answer:
            "Cordas de nylon esticam muito nos primeiros dias. Estique cada corda suavemente e reafine algumas vezes; em uma semana estabiliza.",
        },
      ],
    },
    "/baritone-ukulele-tuner": {
      metaTitle: "Afinador de ukulele barítono grátis",
      metaDescription:
        "Afine seu ukulele barítono em Ré Sol Si Mi pelo microfone, aqui mesmo. Online, grátis e sem baixar nada.",
      title: "Afinador de ukulele barítono",
      intro:
        "Afine seu ukulele barítono pelo microfone: o afinador já está em Ré Sol Si Mi, como as quatro cordas agudas do violão.",
      chartCaption:
        "Estas são as frequências exatas que o afinador procura, com Lá4 = 440 Hz. Ao contrário do ukulele padrão, o barítono vai em ordem: a corda 4 (Ré) é a mais grave e a corda 1 (Mi) a mais aguda.",
      sections: [
        {
          heading: "Barítono e ukulele padrão",
          body: [
            "Soprano, concerto e tenor se afinam em **Sol Dó Mi Lá**, com o Sol agudo. O barítono, o maior (cerca de 76 cm), se afina em **Ré Sol Si Mi**, do grave para o agudo, como um violão.",
            "Os shapes são os mesmos do ukulele padrão, mas soam uma quarta abaixo: o shape de Dó do soprano vira Sol no barítono.",
          ],
        },
        {
          heading: "Vindo do violão",
          body: [
            "O barítono tem a afinação das quatro cordas agudas do violão, então **os acordes do violão nessas cordas mantêm o nome**.",
            "As cordas Ré e Sol costumam ser revestidas de metal: é normal e dá mais corpo aos graves.",
          ],
        },
      ],
      faqs: [
        {
          question: "Posso afinar o barítono em Sol Dó Mi Lá?",
          answer:
            "Só com cordas feitas para isso. Com cordas normais de barítono, a tensão ficaria alta demais.",
        },
        {
          question: "A afinação é reentrante?",
          answer: "Não. A afinação padrão do barítono é linear, com Ré3 na quarta corda.",
        },
        {
          question: "O afinador marca o Ré uma oitava acima?",
          answer:
            "Está captando um harmônico. Toque sobre a boca do instrumento e deixe a corda soar.",
        },
      ],
    },
    "/7-string-guitar-tuner": {
      metaTitle: "Afinador de guitarra de 7 cordas grátis",
      metaDescription:
        "Afine sua guitarra ou violão de 7 cordas (Si Mi Lá Ré Sol Si Mi) pelo microfone, com o Si grave. Online e grátis.",
      title: "Afinador de guitarra de 7 cordas",
      intro:
        "Afine sua guitarra de 7 cordas pelo microfone: o afinador já está em Si Mi Lá Ré Sol Si Mi.",
      sections: [
        {
          heading: "A sétima corda",
          body: [
            "A guitarra de 7 cordas acrescenta um **Si grave (Si1, 61,74 Hz)** abaixo do Mi. As outras seis cordas são afinadas exatamente como numa guitarra comum.",
            "O Si fica uma quarta abaixo do Mi, o mesmo intervalo entre quase todas as cordas, então as escalas se estendem naturalmente.",
          ],
        },
        {
          heading: "E o violão 7 cordas do choro?",
          body: [
            "No Brasil, o **violão de 7 cordas** do choro e do samba tradicionalmente tem a sétima corda afinada em **Dó grave** (Dó2), não em Si — é o som das baixarias de Dino 7 Cordas. Muitos violonistas também usam Si.",
            "Este afinador está configurado em Si. Para afinar em Dó, desça a sétima corda até o display mostrar Dó; a referência é a quinta casa da sétima corda em Dó, que deve soar igual ao Fá da sexta corda na casa 1.",
          ],
        },
      ],
      faqs: [
        {
          question: "As seis cordas agudas mudam?",
          answer: "Não. Mi Lá Ré Sol Si Mi, como em qualquer guitarra de 6 cordas.",
        },
        {
          question: "Que calibre usar na sétima corda?",
          answer:
            "Normalmente entre 0.056 e 0.064 para Si em escala comum. No violão de 7 de nylon, existem jogos próprios para Dó ou Si.",
        },
        {
          question: "Qual variação é comum no metal?",
          answer:
            "O Drop A (Lá Mi Lá Ré Sol Si Mi), baixando a sétima corda um tom.",
        },
      ],
    },
    "/12-string-guitar-tuner": {
      metaTitle: "Afinador de violão de 12 cordas grátis",
      metaDescription:
        "Afine seu violão de 12 cordas pelo microfone: seis pares, quatro em oitavas e dois em uníssono. Online, grátis e sem baixar nada.",
      title: "Afinador de violão de 12 cordas",
      intro:
        "Afine seu violão de 12 cordas pelo microfone: o afinador já está configurado com os seis pares de cordas.",
      chartCaption:
        "Estas são as frequências exatas que o afinador procura, com Lá4 = 440 Hz. Cada linha é um par de cordas. Os quatro pares graves levam uma corda uma oitava acima; os dois agudos (Si e Mi) são em uníssono.",
      sections: [
        {
          heading: "Como se afina um 12 cordas",
          body: [
            "As doze cordas formam **seis pares** com as notas da afinação padrão. Nos pares de Mi, Lá, Ré e Sol, a segunda corda é **uma oitava acima**; em Si e Mi, as duas são **iguais (uníssono)**.",
            "Afine **cada corda separadamente**: abafe o par com um dedo e toque só uma. Com as duas soando, o afinador ouve duas notas e o ponteiro não para.",
          ],
        },
        {
          heading: "Tensão e braço",
          body: [
            "Doze cordas puxam o braço com quase o dobro da força. Por isso muitos violonistas afinam o 12 cordas **meio tom ou um tom abaixo** e usam capotraste — uma boa ideia em violões antigos.",
            "No fim, toque cada par junto: se ouvir um batimento rápido, uma das cordas ainda está desafinada.",
          ],
        },
      ],
      faqs: [
        {
          question: "Por que os pares de Si e Mi não são em oitava?",
          answer:
            "Uma corda uma oitava acima do Mi agudo ficaria no limite de arrebentar. Por isso são cordas iguais.",
        },
        {
          question: "Em que ordem afino as doze cordas?",
          answer:
            "Primeiro a corda principal de cada par, do grave para o agudo; depois as de oitava ou uníssono. Termine com uma segunda passada.",
        },
        {
          question: "Posso usar afinações alternativas?",
          answer:
            "Sim, com cuidado: subir cordas num 12 cordas aumenta muito a tensão. Afinações que descem cordas são as mais seguras.",
        },
      ],
    },
    "/mandolin-tuner": {
      metaTitle: "Afinador de bandolim online grátis",
      metaDescription:
        "Afine seu bandolim em Sol Ré Lá Mi pelo microfone: as oito cordas, par por par. Online, grátis e sem baixar nada.",
      title: "Afinador de bandolim",
      intro:
        "Afine seu bandolim pelo microfone: o afinador já está em Sol Ré Lá Mi. Afine cada corda do par separadamente.",
      chartCaption:
        "Estas são as frequências exatas que o afinador procura, com Lá4 = 440 Hz. Cada linha é um par de cordas em uníssono, então as duas têm o mesmo alvo.",
      sections: [
        {
          heading: "Quatro pares em uníssono",
          body: [
            "O bandolim tem **oito cordas em quatro pares**, e as duas cordas de cada par são afinadas na mesma nota: Sol3, Ré4, Lá4 e Mi5 — as mesmas notas do violino.",
            "**Afine uma corda por vez**: encoste um dedo no par para abafá-lo. Com as duas soando, o afinador ouve duas notas quase iguais e o ponteiro oscila.",
          ],
        },
        {
          heading: "O bandolim no choro",
          body: [
            "No Brasil, o bandolim é a voz do **choro**, de Jacob do Bandolim a Hamilton de Holanda. No choro, a afinação precisa ser muito justa, porque o bandolim dobra melodias com a flauta e o cavaquinho.",
            "O cavalete da maioria dos bandolins não é colado: é preso pela pressão das cordas. Troque as cordas uma por vez para ele não sair do lugar, e confira se a casa 12 soa exatamente uma oitava acima da corda solta.",
          ],
        },
      ],
      faqs: [
        {
          question: "Como sei se as duas cordas do par estão iguais?",
          answer:
            "Toque as duas juntas: soando limpo e estável, estão iguais. Se ouvir uma ondulação, uma está desafinada.",
        },
        {
          question: "Serve para bandolim de 10 cordas?",
          answer:
            "As quatro primeiras ordens sim (Sol Ré Lá Mi). O par extra grave, normalmente em Dó, não está no afinador: desça até o display mostrar Dó.",
        },
        {
          question: "Por que as cordas Mi arrebentam?",
          answer:
            "São finas e muito tensas. Suba devagar, chegando à nota por baixo, e confira se o rastilho e o cavalete não têm cantos vivos.",
        },
      ],
    },
    "/banjo-tuner": {
      metaTitle: "Afinador de banjo de 5 cordas grátis",
      metaDescription:
        "Afine seu banjo de 5 cordas em Sol aberto (Sol Ré Sol Si Ré) pelo microfone, incluindo a quinta corda curta. Online e grátis.",
      title: "Afinador de banjo",
      intro:
        "Afine seu banjo de 5 cordas pelo microfone: o afinador já está em Sol aberto (Sol Ré Sol Si Ré), com a quinta corda aguda.",
      chartCaption:
        "Estas são as frequências exatas que o afinador procura, com Lá4 = 440 Hz. A corda 5 (a curta, com a tarraxa no meio do braço) não é a mais grave: é um Sol4 agudo.",
      sections: [
        {
          heading: "A quinta corda",
          body: [
            "O banjo de 5 cordas tem uma **corda curta** que começa na casa 5 e é afinada em **Sol4**, mais aguda que todas as outras cordas soltas. Ela funciona como bordão: nos arpejos do bluegrass, o polegar volta a ela o tempo todo.",
            "A tarraxa fica na lateral do braço e é fácil mexer nela sem querer. Confira sempre que tirar o banjo do case.",
          ],
        },
        {
          heading: "Banjo de 5 cordas e banjo brasileiro",
          body: [
            "No samba e no pagode é comum o **banjo de 4 cordas afinado como cavaquinho** (Ré Sol Si Ré). Este afinador está configurado para o banjo americano de 5 cordas em Sol aberto.",
            {
              list: [
                "**Dó duplo** (Sol Dó Sol Dó Ré): desça a quarta e a segunda corda um tom.",
                "**Sol modal** (Sol Ré Sol Dó Ré): suba a segunda de Si para Dó.",
              ],
            },
          ],
        },
      ],
      faqs: [
        {
          question: "Como uso capotraste com a quinta corda?",
          answer:
            "A quinta precisa subir o mesmo tanto: com capotraste na casa 2 (Lá), afine a quinta em Lá4. Muitos banjos têm pequenos pinos para prendê-la.",
        },
        {
          question: "Serve para banjo de samba?",
          answer:
            "O banjo de samba se afina como cavaquinho (Ré Sol Si Ré), que não está entre os instrumentos do afinador. A tela mostra o nome de qualquer nota que você tocar.",
        },
        {
          question: "Solto está afinado, mas nas casas não?",
          answer:
            "O cavalete do banjo não é fixo e pode se mover. Na posição certa, a casa 12 soa exatamente uma oitava acima da corda solta.",
        },
      ],
    },
    "/violin-tuner": {
      metaTitle: "Afinador de violino online grátis",
      metaDescription:
        "Afinador de violino online e grátis. Afine em Sol Ré Lá Mi pelo microfone, aqui mesmo. Para todos os tamanhos, de 1/16 a 4/4.",
      title: "Afinador de violino",
      intro:
        "Afine seu violino em Sol Ré Lá Mi pelo microfone. O afinador já está configurado: toque uma corda solta, com arco ou em pizzicato.",
      sections: [
        {
          heading: "Cravelhas e microafinadores",
          body: [
            "Os **microafinadores** são os parafusos do estandarte. No sentido horário a nota sobe; no anti-horário, desce. Eles mexem pouco na afinação — perfeito para o ajuste do dia a dia.",
            "As **cravelhas** se prendem só por atrito. Gire empurrando-as levemente **para dentro** da caixa: é isso que as segura. Regra prática: se o afinador mostra mais de uns 30 cents de diferença, chegue perto com a cravelha e termine com o microafinador.",
          ],
        },
        {
          heading: "Cuidado com o cavalete",
          body: [
            "O cavalete não é colado: só a pressão das cordas o segura. Cada vez que você aperta uma corda pela cravelha, o atrito puxa o topo do cavalete para o espelho.",
            "Depois de trocar cordas, olhe o cavalete de lado: a face voltada para o estandarte deve ficar mais ou menos perpendicular ao tampo. Se estiver inclinado, peça ajuda ao professor ou a um luthier.",
          ],
        },
      ],
      faqs: [
        {
          question: "Qual corda afino primeiro?",
          answer:
            "O Lá: é a referência da orquestra. Depois Ré, Sol e Mi, e confira o Lá de novo.",
        },
        {
          question: "Minha orquestra afina em Lá = 442. Posso usar?",
          answer:
            "Sim. Mude o diapasão para 442 no painel de ajustes, ou afine cada corda uns 8 cents acima de 0.",
        },
        {
          question: "Violinos menores se afinam igual?",
          answer:
            "Sim. Os tamanhos 1/16, 1/8, 1/4, 1/2 e 3/4 usam o mesmo Sol Ré Lá Mi do violino 4/4.",
        },
      ],
    },
    "/viola-tuner": {
      metaTitle: "Afinador de viola de arco online grátis",
      metaDescription:
        "Afine sua viola de arco em Dó Sol Ré Lá pelo microfone, aqui mesmo. Para todos os tamanhos. Online e grátis.",
      title: "Afinador de viola de arco",
      intro:
        "Afine sua viola de arco pelo microfone: o afinador já está em Dó Sol Ré Lá. Comece pelo Lá e siga o ponteiro.",
      sections: [
        {
          heading: "Viola de arco, não viola caipira",
          body: [
            "Esta página é para a **viola de arco** da orquestra, irmã do violino. A **viola caipira**, de dez cordas, tem afinações próprias (cebolão, rio abaixo…) e não está configurada neste afinador.",
            {
              list: [
                "**Violino**: Sol3 Ré4 Lá4 Mi5.",
                "**Viola**: Dó3 Sol3 Ré4 Lá4, uma quinta abaixo do violino.",
                "**Violoncelo**: Dó2 Sol2 Ré3 Lá3, uma oitava abaixo da viola.",
              ],
            },
          ],
        },
        {
          heading: "A corda Dó",
          body: [
            "A viola compartilha Sol, Ré e Lá com o violino e acrescenta um **Dó grave** (130,81 Hz). É essa corda que dá a voz escura e quente da viola, e também a que mais demora a estabilizar depois da troca.",
            "Use os microafinadores para correções pequenas e as cravelhas só para grandes mudanças. Depois, confira se o cavalete continua perpendicular ao tampo.",
          ],
        },
      ],
      faqs: [
        {
          question: "Posso usar um afinador de violino na viola?",
          answer:
            "Para Sol, Ré e Lá sim, mas um afinador de violino procura um Mi5 e não tem Dó3.",
        },
        {
          question: "Por que o afinador custa a ler o Dó?",
          answer:
            "É a nota mais grave do instrumento. Toque com arco firme e lento, ou em pizzicato, e aproxime o celular.",
        },
        {
          question: "Minha orquestra afina em Lá = 442. E agora?",
          answer:
            "Mude o diapasão para 442 no painel de ajustes, ou afine cada corda uns 8 cents acima de 0.",
        },
      ],
    },
    "/cello-tuner": {
      metaTitle: "Afinador de violoncelo online grátis",
      metaDescription:
        "Afine seu violoncelo em Dó Sol Ré Lá pelo microfone, incluindo o Dó grave de 65,41 Hz. Online, grátis e sem baixar nada.",
      title: "Afinador de violoncelo",
      intro:
        "Afine seu violoncelo pelo microfone: o afinador já está em Dó Sol Ré Lá. Comece pelo Lá e siga o ponteiro.",
      chartCaption:
        "Estas são as frequências exatas que o afinador procura, com Lá4 = 440 Hz. A corda 1 é o Lá3 (220 Hz), uma oitava abaixo do Lá da orquestra.",
      sections: [
        {
          heading: "Onde colocar o celular",
          body: [
            "O Dó grave do violoncelo vibra a **65,41 Hz** e o Sol a 98 Hz, perto do limite dos microfones de celular. Coloque o celular na estante ou no chão, perto do corpo do instrumento.",
            "Toque com arco longo, lento e firme perto do espelho. Se o afinador mostrar Sol quando você toca o Dó, ele está captando um harmônico: aproxime o celular e suavize o arco.",
          ],
        },
        {
          heading: "Cravelhas, microafinadores e espigão",
          body: [
            "Use os **microafinadores** no dia a dia; muitos violoncelos têm nas quatro cordas. As cravelhas, só para grandes mudanças, com pressão firme para dentro.",
            "Ajuste o espigão e sente-se na posição antes de afinar: se você afinar torto e depois se ajeitar, é fácil esbarrar numa cravelha.",
          ],
        },
      ],
      faqs: [
        {
          question: "Por que o afinador mostra Lá3 e não Lá4?",
          answer:
            "Porque a corda Lá do violoncelo é Lá3, a 220 Hz: uma oitava abaixo do Lá de 440 Hz da orquestra.",
        },
        {
          question: "Violoncelos menores se afinam igual?",
          answer: "Sim. Os tamanhos 7/8, 3/4, 1/2, 1/4 e 1/8 usam o mesmo Dó Sol Ré Lá.",
        },
        {
          question: "O violoncelo desafina quando sai do case?",
          answer:
            "Normalmente é a temperatura. Deixe-o alguns minutos fora do case antes de afinar.",
        },
      ],
    },
  },
};
