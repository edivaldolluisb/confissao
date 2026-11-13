// Perguntas do "Manual de Confissão" (confissao/manual-de-confissao.pdf), por seção do exame.
// O manual junta o 6º com o 9º e o 7º com o 10º; aqui as perguntas de pensamento e desejo
// vão para o 9º e as de inveja e apego para o 10º.
// `acuso` só existe onde a pergunta está na forma positiva e marcar "sim" seria ambíguo.
import type { Entrada, Nota } from './exame.ts'

const atencao = (texto: string, itens?: string[]): Nota => ({ rotulo: 'Atenção', texto, itens })
const obs = (texto: string, itens?: string[]): Nota => ({ rotulo: 'Observação', texto, itens })
const exemplo = (texto: string): Nota => ({ rotulo: 'Por exemplo', texto })
const q = (texto: string, ...notas: Nota[]): Entrada => ({ texto, notas: notas.length ? notas : undefined })

const TIPO_DE_PESSOA =
  'pessoa solteira, casada, virgem, criança, prostituta, do mesmo sexo, celibatária, consagrada a Deus, portadora de necessidade especial.'

export const GRUPO_MANUAL = 'Perguntas do Manual de Confissão'

// Exame rápido: começo das perguntas que entram nele. Para pôr ou tirar uma pergunta
// do exame rápido, basta acrescentar ou apagar a linha correspondente.
export const RAPIDO = [
  // antes dos mandamentos
  'Escondi, conscientemente',
  'Cumpri a penitência',
  'Comunguei alguma vez em pecado mortal',
  // 1º
  'Alguma vez neguei ou duvidei',
  'Pratiquei ou colaborei em alguma superstição',
  'Recebi os sacramentos sem respeito',
  'Tive ódio a Deus',
  // 2º
  'Pequei por blasfêmia',
  'Jurei em assuntos falsos',
  // 3º
  'Faltei à Missa',
  'Fiquei mais de um mês sem fazer',
  'Trabalhei aos domingos',
  // 4º
  'Zombei, xinguei, maltratei ou ameacei os meus pais',
  'Não ajudei os meus pais em situações de grave necessidade material',
  'Desobedeci aos meus pais',
  'Zombei, xinguei, maltratei ou ameacei o meu cônjuge',
  'Não cumpri a grave obrigação que tenho de educar meus filhos',
  'Fui mau exemplo para os meus filhos',
  // 5º
  'Desejei o mal a alguém',
  'Ofendi alguém',
  'Alimentei pensamentos de vingança',
  'Fiz ou tentei fazer aborto',
  'Usei, por mero prazer, bebidas alcoólicas',
  'Cooperei com o pecado grave de outras pessoas',
  // 6º
  'Usei métodos contraceptivos',
  'Cometi adultério',
  'Fiz sexo sem ser casado',
  'Pequei por pornografia',
  'Pequei por masturbação',
  'Toquei, abracei ou beijei uma pessoa',
  // 7º
  'Roubei alguma coisa?',
  'Obtive algum bem ou vantagem',
  'Recusei-me a pagar alguma dívida',
  // 8º
  'Contei mentiras',
  'Caluniei alguém',
  'Falei dos pecados ou defeitos graves',
  // 9º
  'Consenti em pensamentos, desejos ou olhares',
  // 10º
  'Fiquei triste ou com raiva por ver que uma pessoa tinha algum bem material',
  'Dei mais valor aos bens materiais',
  // preceitos da Igreja
  'Recebi a Sagrada Eucaristia',
  'Cumpri o jejum e a abstinência',
  'Confessei-me pelo menos uma vez ao ano',
]

export const avisoCastidade =
  'Por caridade para com o sacerdote, diga apenas o pecado com seus agravantes e o número de vezes que você cometeu tal pecado, mas não entre em detalhes.'

export const manual: Record<string, Entrada[]> = {
  antes: [
    q('Escondi, conscientemente, algum pecado grave em minhas confissões passadas?', { texto: "Inclui ter confessado sem arrependimento verdadeiro, sem um firme propósito de correção ou sem a intenção de cumprir a penitência." }),
    {
      texto: 'Confessei, o melhor que me lembrava, o número de vezes que cometi cada pecado grave?',
      acuso: 'Não confessei o número de vezes que cometi cada pecado grave.',
    },
    {
      texto: 'Confessei com clareza os meus pecados ou fui muito genérico?',
      acuso: 'Fui muito genérico ao confessar os meus pecados.',
    },
    {
      texto: 'Cumpri a penitência que o sacerdote me deu?',
      acuso: 'Não cumpri a penitência que o sacerdote me deu.',
    },
    { texto: 'Reparei as injustiças que cometi?', acuso: 'Não reparei as injustiças que cometi.' },
    q('Comunguei alguma vez em pecado mortal?', { texto: "Quantas dessas Confissões e Comunhões sacrílegas você fez?" }),
    {
      texto: 'Estou verdadeiramente arrependido dos meus pecados e luto para não voltar a cometê-los?',
      acuso: 'Não lutei para não voltar a cometer os meus pecados.',
    },
    q('Tenho o hábito de cometer um determinado pecado mortal?'),
    q('Já me confessei deste pecado e mesmo assim continuo com o vício?'),
  ],

  m1: [
    q(
      'Deixei, por culpa própria, de conhecer as principais verdades da fé católica?',
      atencao(
        'O mínimo que devemos saber é: i) que há um só Deus em três pessoas, Pai, Filho e Espírito Santo; ii) que o Filho de Deus se fez Homem, morreu e ressuscitou para a nossa salvação; iii) e que ele virá julgar os vivos e os mortos, e dará o Inferno aos maus e o Céu aos bons. Também devemos conhecer o Pai Nosso e os sete sacramentos da Igreja Católica.',
      ),
    ),
    q(
      'Alguma vez neguei ou duvidei voluntariamente de algum ensinamento da Igreja, mesmo depois de já ter sido instruído sobre aquela doutrina?', { rotulo: "Heresia", texto: "Negar uma ou mais verdades da fé." },
      exemplo(
        'Já me ensinaram que o Inferno existe e que os demônios existem, mas mesmo assim eu me recuso a acreditar nisso.',
      ),
    ),
    q('Acreditei, segui ou professei algum ensinamento, consciente de que ele era incompatível com a fé católica?'),
    q(
      'Participei ativamente de alguma cerimônia ou culto não católico?',
      exemplo('Tomar a “ceia” protestante, ajudar num culto protestante etc.'),
      atencao(
        'Participar ativamente dessas cerimônias seria pecado mortal, porque estaríamos agindo como se o culto protestante estivesse no mesmo nível da Santa Missa, ou como se o pastor protestante estivesse no mesmo nível do sacerdote católico.',
      ),
      obs(
        'É muito recomendado que um católico evite frequentar inclusive casamentos e funerais em outras religiões. Mas se um motivo familiar exigisse a presença do católico nessas cerimônias, ele poderia assistir a elas como um mero espectador, desde que não houvesse risco de abalar a sua fé ou escandalizar outros católicos.',
      ),
    ),
    q(
      'Sou membro ou fiz parte de alguma organização religiosa não católica, de algum grupo anticatólico ou de alguma sociedade secreta como a Maçonaria?', { rotulo: "Sociedades proibidas", texto: "Teosofia, rosa cruz, etc. Lembrar também que Rotary e Lion’s são a porta para a maçonaria." },
    ),
    q(
      'Li alguma coisa, ouvi alguma música ou assisti a algum programa contra Deus, contra a Igreja ou contra a moral católica?', { texto: "Inclui fazer circular livros ou escritos contrários à crença ou à prática católica, de tal modo que a fé, própria ou alheia, é comprometida." },
      atencao(
        'Não há pecado se a pessoa acessa tais conteúdos por uma justa causa, tomando as devidas precauções para não perder a fé.',
      ),
    ),
    q(
      'Pratiquei ou colaborei em alguma superstição ou idolatria?', { rotulo: "Idolatria", texto: "Adorar falsos deuses bem como honrar uma criatura no lugar de Deus: como Satanás, a ciência, os ancestrais, o país." }, { rotulo: "Superstição", texto: "Atribuição de poderes a uma coisa criada que não os possui. Muitas vezes, por ignorância das pessoas, não passa de pecado venial." }, { rotulo: "Adivinhação", texto: "Comunicação com Satanás, demônios, mortos ou outras práticas falsas para descobrir o desconhecido, consultar horóscopos, astrologia, leitura da mão, ver a sorte, etc." }, { rotulo: "Magia (branca ou negra) ou feitiçaria", texto: "Por exemplo, bruxaria, vodu." }, { texto: "Inclui jogar com quadros Ouija ou mesas giratórias." },
      exemplo(
        'Previsão do futuro, adivinhação, jogo de cartas, jogo de búzios, magia, tábua ouija, feitiçaria, consulta a feiticeiro, bruxaria, magia branca, magia negra, candomblé, umbanda, macumba, reiki, vodu, cabala, Nova Era, “energias”, jogo do copo.',
      ),
    ),
    q('Participei de reuniões espíritas? Invoquei espíritos? Recebi passe? Acreditei em reencarnação?', { rotulo: "Espiritismo", texto: "Falar com os espíritos." }),
    q(
      'Invoquei a Satanás? Li textos, assisti a vídeos e filmes ou ouvi músicas que invocam explicitamente a Satanás?',
    ),
    q('Não professei externamente a minha fé católica quando havia necessidade grave de fazê-lo?', { rotulo: "Permanecer em silêncio quando questionado sobre a própria fé", texto: "É pecado grave, se se trata da autoridade legítima que questiona." }),
    q(
      'Recebi os sacramentos sem respeito ou sem fé? Recebi o Crisma, a Eucaristia, o Matrimônio, a Ordem em pecado mortal?', { texto: "É sacrilégio receber um sacramento, especialmente a Santa Eucaristia, em estado de pecado mortal." },
    ),
    q('Desesperei da salvação, achando que os meus pecados eram maiores que a misericórdia de Deus?', { rotulo: "Desespero", texto: "Desistir de toda esperança de salvação e dos meios necessários para ser salvo, a não ser confundido com mero sentimento de desânimo." }),
    q(
      'Pequei por presunção, esperando que alcançaria a salvação sem ter que fugir do pecado e guardar os Mandamentos?', { rotulo: "Presunção", texto: "Esperar pela salvação sem ajuda de Deus ou pressupor o perdão de Deus sem conversão ou esperar obter a glória do paraíso sem mérito." },
    ),
    q(
      'Acreditei na falsa doutrina que ensina que Deus, por ser misericordioso, irá salvar todas as pessoas ainda que elas não deixem o pecado?',
    ),
    q(
      'Tive ódio a Deus? Revoltei-me contra Deus, por exemplo, por ter nascido com esta aparência, com este sexo (masculino ou feminino), com esta condição social ou por ter perdido um parente?', { texto: "Inclui o ódio à Igreja Católica." },
    ),
  ],

  m2: [
    q(
      'Pequei por blasfêmia? Escandalizei alguém com tais blasfêmias?', { rotulo: "Blasfêmia", texto: "Insultar a Deus, Nosso Senhor Jesus Cristo, a Igreja Católica, a Santíssima Virgem Maria ou os santos por palavras ou por gestos." },
      obs(
        'A blasfêmia é cometida quando se diz qualquer injúria contra Deus, contra os santos ou contra as coisas santas. Por exemplo: dizer “Deus é injusto”, “Deus não é bom”, “Maldito seja Santo Antônio” etc. Também se pode pecar por blasfêmia por meio de atos, por exemplo: cuspindo para o Céu, pisando ou quebrando imagens sagradas etc. Além disso, também é blasfêmia atribuir a uma criatura qualidades próprias e exclusivas de Deus, por exemplo: chamar o demônio de onipotente e santo.',
      ),
    ),
    q('Irritei alguém com o propósito de fazê-lo praguejar ou blasfemar contra Deus?'),
    q(
      'Jurei em assuntos falsos ou desonestos, usando o nome de Deus, dos santos ou das coisas sagradas?', { rotulo: "Perjúrio", texto: "Prometer algo sob juramento sem ter a intenção de cumpri-lo, ou quebrar uma promessa feita sob juramento. Grave ou não dependendo da gravidade do perjúrio." }, { rotulo: "Juramentos falsos ou desnecessários", texto: "Chamar a Deus como testemunha a uma mentira. Grave ou não, dependendo da gravidade do que se jura falsamente." },
      exemplo('“Eu juro por Deus que irei matar aquele fulano que me deve”.'),
    ),
    q(
      'Fiz uma promessa a Deus e depois não a cumpri?', { rotulo: "Votos ou promessas", texto: "Pode ser grave, dependendo da importância do voto ou promessa." },
      atencao(
        'Caso você tenha feito uma promessa e não tenha cumprido, se confesse e depois cumpra a promessa. Caso seja difícil de cumpri-la, você deve pedir ao seu bispo ou ao seu pároco que troque aquela promessa por outra ou o dispense de cumpri-la. O simples sacerdote não tem este poder.',
      ),
    ),
    q(
      'Zombei (por palavras, piadas ou atos) de Deus, de Nossa Senhora, dos santos e de suas imagens, da Igreja, dos sacramentos ou de quaisquer coisas santas? Incentivei que outros zombassem, rissem e desprezassem?',
    ),
  ],

  m3: [
    q(
      'Faltei à Missa nos domingos ou nos dias santos de guarda, por culpa própria?', { rotulo: "Primeiro preceito da Igreja", texto: "Assistir à Santa Missa todos os domingos e dias santos de guarda. São nove os dias de preceito no Brasil, já que a São José (19 de março) não o é. Muitos desses dias são transferidos para o Domingo seguinte, pelo fato de não haver feriado civil.", itens: ["Natal do Senhor (25 de dezembro)", "Circuncisão do Senhor (1º de janeiro)", "Epifania (6 de janeiro. No Brasil, transferido para o Domingo seguinte)", "Ascensão (quarenta dias depois da Páscoa. No Brasil, transferido para o Domingo seguinte)", "Corpus Christi (quinta-feira depois do Domingo da Santíssima Trindade)", "Santos Apóstolos Pedro e Paulo (29 de junho. No Brasil, transferido para o Domingo seguinte)", "A Assunção da Santíssima Virgem (15 de agosto. No Brasil, transferido para o Domingo seguinte)", "Todos os Santos (1º de novembro. No Brasil, transferido para o Domingo seguinte)", "Imaculada Conceição da Santíssima Virgem (8 de dezembro)"] }, { texto: "A Santa Igreja nos obriga a nos abster de todo trabalho servil nos Dias Santos de Guarda, como nos Domingos, na medida do possível. Os católicos que devem trabalhar nos Dias Santos de Guarda são obrigados a assistir a Santa Missa a não ser que sejam escusados por uma causa proporcionalmente grave. Esse preceito pode ser violado ao não assistir a Missa nos dias prescritos ou ao se chegar atrasado à Missa sem razão suficiente. Dependendo da qualidade e da quantidade do atraso, pode ser pecado leve ou grave." },
      atencao(
        'No Brasil, a maioria dos dias santos de guarda é transferida para o domingo; porém, existem quatro dias santos de guarda que não são transferidos para o domingo: Santa Maria Mãe de Deus (1º de janeiro), Corpus Christi, Imaculada Conceição (8 de dezembro) e Natal do Senhor (25 de dezembro). Este preceito obriga todos os fiéis batizados que possuem uso da razão e já tenham completado sete anos de idade. Para cumprir o preceito é necessário: i) estar presente corporalmente na igreja; ii) prestar uma atenção mínima durante a Missa. Não cumpre o preceito quem ouve a Missa pelo rádio ou assiste pela televisão.',
      ),
    ),
    q(
      'Nos domingos ou nos dias santos de guarda, cheguei atrasado à Missa ou saí mais cedo, por culpa própria?',
    ),
    q(
      'Fiz, propositalmente, com que outras pessoas faltassem à Missa nos domingos ou dias santos de guarda, ou saíssem mais cedo, ou chegassem atrasadas?',
    ),
    q('Fiquei mais de um mês sem fazer ao menos uma oração sincera a Deus?'),
    q(
      'Nos domingos ou nos dias santos de guarda, realizei trabalhos, atividades ou negócios que me impediram de participar da Santa Missa? Obriguei que outras pessoas realizassem essas atividades, impedindo-lhes a participação na Santa Missa?',
    ),
    q(
      'Trabalhei aos domingos e dias santos de guarda? Obriguei outras pessoas a trabalharem aos domingos e dias santos de guarda?',
      atencao(
        'Há alguns serviços que não podem parar, mesmo aos domingos e dias santos de guarda, por exemplo: hospitais, farmácias, restaurantes, postos de combustíveis, aeroportos, ônibus, táxis, serviços de segurança etc. Os proprietários, porém, devem se esforçar para organizar estes serviços de tal maneira que os funcionários possam guardar o preceito dominical.',
      ),
    ),
  ],

  m4: [
    q(
      'Zombei, xinguei, maltratei ou ameacei os meus pais? Alegrei-me com o mal dos meus pais? Entristeci-me com o bem deles?',
    ),
    q(
      'Desejei a desgraça aos meus pais? Desejei a morte aos meus pais? Desejei, por egoísmo, receber a herança?',
    ),
    q(
      'Nunca rezo pelos meus pais?',
      exemplo(
        '1) Rezar pedindo que eles não morram em pecado mortal; 2) Rezar pela alma deles no dia de Finados, caso já tenham falecido etc.',
      ),
    ),
    q(
      'Não ajudei os meus pais em situações de grave necessidade material (alimentação, vestes, habitação, remédios), sendo que era possível para mim ajudá-los? Abandonei-os em suas doenças físicas ou emocionais? Abandonei-os na velhice?',
    ),
    q(
      'Não ajudei os meus pais nas suas necessidades espirituais, sendo que era possível para mim ajudá-los?',
      exemplo(
        'Não chamei o sacerdote para dar os sacramentos aos meus pais quando estavam gravemente enfermos, sendo que era possível para mim fazê-lo? Não providenciei o funeral dos meus pais, sendo que era possível para mim fazê-lo?',
      ),
    ),
    q(
      'Levantei a mão contra os meus pais? Bati nos meus pais?',
      atencao('A agressão aos pais é pecado mortal, ainda que a lesão causada seja leve.'),
    ),
    q('Entristeci gravemente os meus pais com palavras, gestos ou ações?'),
    q(
      'Desobedeci aos meus pais em assuntos moralmente importantes?', { texto: "Sobretudo quanto às más companhias e diversões e quanto aos deveres de estado, como estudo." },
      exemplo(
        'Os pais mandam o filho ir à Missa ao domingo e o filho não vai; os pais mandam o filho não ir àquela festa indecente e o filho vai; os pais mandam o filho deixar aquela má companhia e o filho não deixa.',
      ),
      atencao(
        'Mesmo que o filho já seja maior de idade, se ainda permanece morando com os pais, continua com o dever de obedecer-lhes.',
      ),
      obs(
        'Se o pai manda o filho fazer algo imoral ou contrário à lei de Deus, o filho está obrigado a desobedecer: caso contrário, o filho pecará justamente por obedecer a seus pais, pois “convém antes obedecer a Deus que aos homens” (At 4, 19). Por exemplo: os pais que mandam o filho mentir, roubar, vingar-se, assistir a filme obsceno, ir à casa de prostituição, usar roupas imodestas, usar drogas, embriagar-se etc.; os pais que mandam o filho não ir à Missa, não rezar etc.',
      ),
    ),
    q('Roubei alguma coisa dos meus pais?'),

    { grupo: 'Manual de Confissão: para os que são casados' },
    q(
      'Zombei, xinguei, maltratei ou ameacei o meu cônjuge? Impedi que o meu cônjuge cumprisse seus deveres religiosos?', { rotulo: "Maltrato", texto: "Isto é, tratar o cônjuge sem consideração pelo bem-estar dele e sem preocupação com a caridade." },
    ),

    { grupo: 'Manual de Confissão: para os que têm filhos' },
    q('Por negligência, deixei de conduzir meus filhos ao Batismo o mais rápido possível?', { texto: "Mais de um mês é considerado, em geral, pecado mortal." }),
    q(
      'Não cumpri a grave obrigação que tenho de educar meus filhos na fé católica, deixando de ensinar-lhes a doutrina da Igreja, a digna recepção dos sacramentos, para que assim tivessem o suficiente para perseverar até a morte no estado de graça?',
      obs(
        'Como os filhos podem pecar gravemente após os sete anos de idade, os pais devem motivá-los a se confessar regularmente a partir de então, dando-lhes a instrução necessária para isso.',
      ),
      atencao(
        'Cabe lembrar também que todos os fiéis, a partir dos sete anos, são obrigados à Confissão ao menos uma vez por ano.',
      ),
    ),
    q('Deixei de sustentar os meus filhos?'),
    q('Impedi meus filhos de irem à Missa aos domingos, de rezarem ou de cumprirem seus deveres religiosos?'),
    q('Permiti que o namorado da minha filha (ou vice-versa) dormisse junto com ela?'),
    q(
      'Permiti que meus filhos lessem livros, ouvissem músicas ou assistissem a programas imorais, sexuais ou obscenos? Permiti que meus filhos frequentassem lugares suspeitos ou fossem a festas indecentes? Permiti que meus filhos tivessem companhias perigosas?',
    ),
    q('Deixei de corrigir os vícios e pecados graves dos meus filhos?'),
    q('Castiguei os meus filhos com ódio no coração?'),
    q(
      'Fui mau exemplo para os meus filhos, dando-lhes ocasião de imitarem meus pecados graves ou de se escandalizarem com eles?', { texto: "Inclui dar escândalo a eles ao praguejar, beber, etc." },
      exemplo(
        'Embriaguez, palavras obscenas, roupas indecentes, vídeos ou músicas imorais; faltar à Missa aos domingos.',
      ),
    ),
  ],

  m5: [
    q('Desejei o mal a alguém? Desejei a doença ou a desgraça a alguém? Desejei o Inferno a alguém?'),
    q('Agredi injustamente alguma pessoa?'),
    q('Ofendi alguém, xingando, amaldiçoando, zombando? Escandalizei outras pessoas com tais ofensas?'),
    q(
      'Alimentei pensamentos de vingança?',
      atencao(
        'Não é pecado desejar que um criminoso receba sua justa pena, desde que não tenhamos ódio por ele.',
      ),
    ),
    q('Matei uma pessoa? Quis matar ou procurei matar alguém?', { rotulo: "Colaboração", texto: "Vale também para quem participou, instigou, aconselhou, consentiu ou se calou podendo impedir." }),
    q(
      'Fiz ou tentei fazer aborto? Aconselhei ou ajudei alguém a fazer aborto? Defendi que as pessoas têm o direito de fazer aborto?', { rotulo: "Colaboração", texto: "Não peca só quem faz o aborto. Peca também quem colabora, mesmo indiretamente: levar a pessoa ao lugar onde o aborto será feito, pagar ou emprestar o dinheiro, indicar quem o faça, aconselhar, pressionar, consentir ou calar-se podendo impedir." }, { rotulo: "Excomunhão", texto: "O penitente deve estar ciente que abortar, praticar ou ajudar em um aborto incorre em excomunhão, se o aborto se consumar." },
    ),
    // Esta pergunta só consta de manual-de-confissao.pdf; a versão -ppr não a traz.
    q(
      'Apoiei, conscientemente, políticos que promovem o aborto, a eutanásia, o divórcio, a ideologia de gênero, o homossexualismo, a legalização das drogas, a abolição da propriedade privada?',
    ),
    q('Usei métodos abortivos?', { rotulo: "Contraceptivos que podem ou não ser abortivos", texto: "Pílulas e outros: apesar da prática generalizada mesmo entre católicos, trata-se de pecado mortal, ainda que haja motivos legítimos para evitar os filhos." }, exemplo('Anticoncepcionais, DIU, pílula do dia seguinte etc.')),
    q(
      'Pratiquei a eutanásia, apressando a morte de uma pessoa idosa ou doente? Aconselhei alguém a praticar a eutanásia? Defendi que as pessoas têm direito à eutanásia?', { rotulo: "Colaboração", texto: "Vale também para quem participou, instigou, aconselhou, consentiu ou se calou podendo impedir." },
    ),
    q(
      'Fiz fertilização in vitro? Obriguei ou aconselhei o uso desse método? Afirmei ou defendi que uma pessoa pode usar métodos artificiais de concepção?', { rotulo: "Inseminação artificial, fertilização in vitro ou algo semelhante", texto: "Apesar da prática muito generalizada, mesmo entre católicos, trata-se de pecado mortal." },
    ),
    q(
      'Retirei alguma parte significativa do meu corpo desnecessariamente? Fiz alguma esterilização (vasectomia, ligadura de trompas etc.)?', { rotulo: "Vasectomia, ligadura ou outro procedimento para evitar os filhos", texto: "Apesar da prática muito generalizada, mesmo entre católicos, trata-se de pecado mortal, ainda que haja motivos legítimos para evitar os filhos. É preciso buscar a reversão da cirurgia, se ainda existe a possibilidade de fertilidade." }, { rotulo: "Mutilação do corpo", texto: "Como castração, por exemplo." },
      atencao(
        'É permitido retirar alguma parte do corpo para a preservação da vida, por exemplo: amputar um pé, um braço etc. É permitido, inclusive, retirar um dos órgãos ligados à reprodução humana (útero, ovários, testículos etc.), desde que seja para salvar a vida e haja reta intenção.',
      ),
    ),
    q('Tentei diretamente o suicídio? Induzi, instiguei ou auxiliei alguém a praticar suicídio?', { texto: "Inclui os sérios pensamentos de cometer suicídio." }),
    q(
      'Usei, por mero prazer, bebidas alcoólicas até perder completamente o uso da razão? Usei drogas ilícitas?', { rotulo: "Embriaguez", texto: "Em que grau?" }, { texto: "Inclui o abuso de álcool, medicamentos ou drogas." },
    ),
    q(
      'Cooperei com o pecado grave de outras pessoas?',
      atencao(
        'Cooperar diretamente com o pecado mortal de alguém é também um pecado. Sendo assim, pecam gravemente por cooperação:',
        [
          'Os que vendem, prescrevem, receitam, facilitam, aconselham ou fornecem coisas que só servem para o mal, como: os diversos tipos de anticoncepcionais (pílulas do dia seguinte, DIU, camisinha); vasectomia, ligadura de trompas, fertilização in vitro, fecundação artificial; livros, revistas e vídeos pornográficos; livros, revistas e vídeos heréticos; drogas ilícitas etc.',
          'Os donos de hotéis, hospedarias, bares etc., que espontaneamente oferecem ou facilitam o uso dos seus estabelecimentos para encontros claramente pecaminosos ou festas claramente pecaminosas.',
          'Os músicos e artistas que colaboram espontaneamente em espetáculos, festas, bailes etc., que são claramente pecaminosos.',
        ],
      ),
    ),
    q(
      'Conheço alguém que está em pecado mortal ou perto de cometê-lo e não o corrigi?',
      obs('Só temos a obrigação grave de corrigir alguém quando se reúnem estas três condições:', [
        'Que a pessoa tenha cometido um pecado mortal ou esteja próxima de cometê-lo;',
        'Que consideremos haver esperança de que a pessoa mude mediante a nossa correção;',
        'Que possamos fazer a correção sem um grande incômodo.',
      ]),
    ),
  ],

  m6: [
    q(
      'Tendo sido batizado na Igreja Católica, vivi uma “união estável” ou um casamento meramente civil com alguém?',
    ),
    q(
      'Sendo casado na Igreja Católica, neguei a relação sexual ao meu cônjuge sem causa grave?',
      obs(
        'Após o casamento validamente celebrado, um cônjuge tem direito sobre o corpo do outro, pois, como diz o Evangelho: “Já não são dois, mas sim uma só carne” (Mc 10, 8). Contudo, existem algumas causas graves que permitem um cônjuge negar a relação sexual ao outro. Por exemplo:',
        [
          'Quando ele(a) cometeu adultério e não está arrependido(a);',
          'Quando ele(a) está sem o uso da razão (por exemplo: em caso de embriaguez total);',
          'Quando ele(a) quer perverter o ato sexual (por exemplo: usando anticoncepcionais, DIU, camisinha, coito interrompido; querendo sexo oral, sexo anal, sexo assistido por outras pessoas, sexo com pornografia, sexo grupal etc.). Nesses casos você tem a obrigação de negar o ato sexual e resistir-lhe energicamente;',
          'Quando ele(a) quer a relação sexual imoderadamente (por exemplo: várias vezes por dia ou em épocas perigosas para o outro cônjuge);',
          'Quando ele(a) tem alguma doença contagiosa (por exemplo: gonorréia, sífilis, AIDS etc.);',
          'Quando a esposa está no período posterior ao parto. (Pergunte ao médico o tempo de resguardo.)',
        ],
      ),
    ),
    q(
      'Usei métodos contraceptivos (por exemplo: pílula do dia seguinte, anticoncepcional, DIU, camisinha)? Obriguei ou aconselhei o uso de contraceptivos? Afirmei ou defendi que uma pessoa pode usar métodos contraceptivos?', { rotulo: "Métodos profiláticos ou de barreira para evitar a gravidez", texto: "Apesar da prática generalizada mesmo entre católicos, trata-se de pecado mortal, ainda que haja motivos legítimos para evitar os filhos." },
    ),
    q(
      'Usei métodos artificiais de concepção que dispensam a relação sexual? Obriguei ou aconselhei o uso desses métodos? Afirmei ou defendi que uma pessoa pode usar métodos artificiais de concepção?',
    ),
    q(
      'Pratiquei o onanismo?',
      obs(
        'Onanismo acontece quando o homem ejacula intencionalmente fora do órgão sexual da mulher, a fim de evitar a gravidez. Também é chamado de “coito interrompido”.',
      ),
    ),
    q('Vi pornografia com meu cônjuge? Obriguei meu cônjuge a ver pornografia?'),
    q(
      'Cometi adultério?',
      atencao(
        `Se você cometeu adultério, diga ao sacerdote com que tipo de pessoa foi, por exemplo: ${TIPO_DE_PESSOA}`,
      ),
    ),
    q('Sou casado na Igreja e causei a minha separação do meu cônjuge?'),
    q(
      'Sou casado na Igreja e, após a separação, cometi adultério? (Por exemplo: namoro ou algum tipo de “segunda união”, como o concubinato ou o casamento civil.)',
    ),
    q(
      'Fiz sexo sem ser casado?',
      atencao(
        `Se você cometeu fornicação, diga ao sacerdote com que tipo de pessoa foi, por exemplo: ${TIPO_DE_PESSOA}`,
      ),
    ),
    q('Toquei uma criança buscando satisfação sexual? Tive relação sexual com uma criança?'),
    q(
      'Usei de violência (física ou moral) a fim de levar uma pessoa ao pecado contra a castidade? Seduzi alguma pessoa valendo-me da minha influência ou autoridade sobre ela?',
      atencao(
        `Se você cometeu esse pecado, diga ao sacerdote com que tipo de pessoa foi, por exemplo: ${TIPO_DE_PESSOA}`,
      ),
    ),
    q(
      'Cometi algum pecado sexual contra a natureza, por exemplo: homossexualismo, incesto (com parentes de sangue), bestialismo (com animais)?',
    ),
    q(
      'Defendi ou apoiei o sexo livre, a poligamia, o divórcio, o adultério, o homossexualismo, a mudança de sexo, o incesto, o bestialismo, a pedofilia, a ideologia de gênero? Afirmei ou defendi que, se as pessoas “se amam”, elas têm o direito de fazer essas coisas?',
    ),
    q(
      'Pequei por pornografia com textos, fotos ou vídeos de conteúdo sexual explícito? Tenho o hábito de cair neste pecado? Mantive as ocasiões de cair na pornografia? Confessei-me sem ter a firme decisão de deixar essas práticas? Confessei-me sem ter a firme decisão de deixar as ocasiões próximas desse pecado?', { texto: "Inclui comprar, alugar ou assistir filmes, programas de TV ou ler livros, revistas ou outras coisas indecentes. Não somente pornografia, mas também tudo que contenha impurezas, o que é generalizado hoje." },
      atencao(
        'Não somente a pornografia explícita é pecado mortal. Os livros, filmes, vídeos ou programas de televisão que possuem conteúdo erótico também são matéria de pecado mortal.',
      ),
    ),
    q(
      'Divulguei textos, imagens ou vídeos pornográficos? Mantive o recebimento desses vídeos ou imagens, por exemplo, não saindo daquele grupo de rede social em que as pessoas enviam pornografia?',
    ),
    q(
      'Pequei por masturbação, ou seja, toquei o meu corpo com o fim de obter prazer sexual? Tenho o hábito de cair neste pecado? Mantive as ocasiões de cair na masturbação? Confessei-me sem ter a firme decisão de deixar essa prática? Confessei-me sem ter a firme decisão de deixar as ocasiões próximas desse pecado?',
    ),
    q(
      'Toquei, abracei ou beijei uma pessoa buscando prazer sexual?', { texto: "Inclui o beijo sensual, prolongado, e as carícias ou preliminares fora do contexto do matrimônio, ou dentro dele sem serem ordenadas à consumação do ato conjugal natural, com perigo de polução." },
      {
        rotulo: 'Quanto aos namorados',
        texto:
          'O prazer sexual somente é lícito dentro da relação matrimonial aberta à vida: portanto, as pessoas que não são casadas não podem buscar a excitação sexual, já que não podem ter relação sexual. Por isso, os namorados não podem fazer aqueles toques, abraços ou beijos que são próprios para causar excitação sexual, como por exemplo: toques nas partes íntimas, abraços “calorosos”, beijos de língua. Como não podem ter a relação sexual, também não podem se preparar para ela.',
      },
      {
        rotulo: 'Quanto aos noivos',
        texto:
          'Aplica-se a eles o mesmo que aos namorados. Como também não são casados, os noivos não podem se excitar por meio desses mesmos toques, beijos e abraços. Se não podem ter a relação sexual, também não podem se preparar para ela.',
      },
      {
        rotulo: 'Quanto aos casados',
        texto:
          '1) Dentro do ato conjugal são lícitos os atos coerentes com a relação sexual aberta à vida, desde que não sejam gravemente obscenos. 2) Fora do ato conjugal os esposos podem fazer certos tipos de beijos, abraços e carícias para alimentar o amor entre si, evitando, porém, o perigo próximo de polução (ejaculação).',
      },
    ),
    q(
      'Promovi conversas eróticas com o fim de buscar prazer sexual? Ouvi conversas eróticas consentindo no prazer sexual que elas me causavam?',
    ),
    q(
      'Induzi outras pessoas ao pecado ou ensinei o pecado a alguém?',
      exemplo('Ter conversas eróticas nas redes sociais; conduzir alguém a uma casa de prostituição etc.'),
    ),
    q(
      'Escandalizei alguém com tais conversas eróticas?',
      exemplo('Um sacerdote (ou pai de família) falando de coisas eróticas diante de crianças.'),
    ),
    q(
      'Ouvi músicas eróticas e consenti no prazer sexual que me causaram? Escandalizei alguém com tais músicas?',
    ),
    q(
      'Homem e mulher: expus-me publicamente com roupas indecentes a fim de seduzir sexualmente os que me olhavam, ou tendo consciência de que tais roupas eram excitantes ou escandalosas?', { rotulo: "Roupas imodestas", texto: "Minissaias, calças apertadas, decotes arrojados, blusas e saias transparentes, biquínis, etc." },
      exemplo('Roupas coladas, decotadas, curtas ou transparentes.'),
      atencao(
        'Quando uma pessoa decide abandonar as roupas indecentes deve desfazer-se delas, e não doá-las para alguém, pois o que é pecado para mim, também é pecado para os outros.',
      ),
    ),
  ],

  m7: [
    q(
      'Roubei alguma coisa? O quê? Quanto? Quantas vezes? Restituí os bens roubados?', { rotulo: "Pequenos furtos", texto: "Por exemplo, tomar coisas do lugar de trabalho às quais não se tem direito ou tomar dinheiro de um membro da família sem sua permissão." },
      obs(
        'Lembre-se que, quando se trata de pecados que causaram dano a alguém, você deve ter o firme propósito de reparar o prejuízo (devolver o dinheiro roubado, reparar a calúnia etc.). Pergunte ao sacerdote como poderá fazer a reparação.',
      ),
    ),
    q(
      'Danifiquei injustamente a propriedade ou os bens de uma outra pessoa? Reparei os danos?', { texto: "Seja por descuido, seja por malícia." },
      obs(
        'Não é um dano injusto se uma mãe queima um livro pornográfico do seu filho: nesse caso, a mãe tem o direito de causar esse dano ao filho, pois na verdade ela quer evitar que o filho cometa um pecado mortal e seja merecedor do Inferno.',
      ),
    ),
    q('Obtive algum bem ou vantagem por meio de fraude ou enganação?'),
    q('Perdi meus bens no jogo, causando prejuízo a mim ou aos meus dependentes?', { rotulo: "Jogar e apostar", texto: "Privando-se dos meios necessários de vida para si ou para outros." }, { rotulo: "Vício em jogos de azar", texto: "Coloca em perigo o sustento próprio ou da família?" }),
    q('Recusei-me a pagar alguma dívida? Recusei-me a devolver alguma coisa emprestada?', { rotulo: "Dívidas", texto: "Não pagar dívidas justas no tempo correto e não fazer os esforços e sacrifícios necessários nesse sentido. Por exemplo, juntando gradualmente a quantia devida." }, { rotulo: "Objetos emprestados ou perdidos", texto: "Manter consigo objetos emprestados ou perdidos sem fazer uma tentativa razoável de restituir a propriedade alheia." }),
    q('Adquiri alguma coisa que sabia ter sido roubada?'),
    q('Lesei o meu patrão, não trabalhando honestamente como é dever de um funcionário?'),
    q(
      'Recusei-me a pagar o salário aos meus empregados? Atrasei o salário dos meus empregados sem uma justa causa?', { texto: "Inclui pagar salários injustos ou desprover um empregado de benefícios devidos." },
    ),
    q(
      'Forcei os meus funcionários a trabalharem além da medida, impedindo-lhes, por exemplo, o devido descanso e a presença na Santa Missa aos domingos e dias santos de guarda?',
    ),
    q('Recusei-me a ajudar alguém que estava em extrema necessidade, embora fosse possível fazê-lo?'),
  ],

  m8: [
    q(
      'Contei mentiras que causaram grave dano a uma pessoa ou aos seus bens? Tenho o hábito de dizer mentiras?',
      obs(
        'Toda mentira é pecado. Mas apenas as mentiras que causam algum prejuízo grave à honra ou aos bens do próximo são pecados mortais.',
      ),
    ),
    q(
      'Caluniei alguém, dizendo que a pessoa cometeu algum crime ou pecado grave que eu sabia claramente que ela não tinha cometido? Colaborei com a divulgação de calúnias? Reparei a calúnia ou estou disposto a repará-la?', { rotulo: "Dano injusto ao nome alheio", texto: "Seja pela revelação de faltas verdadeiras escondidas (detração); revelação de falsos defeitos (calúnia ou difamação); contando histórias ou espalhando rumores. É preciso restituir a boa fama que foi injustamente prejudicada." },
    ),
    q(
      'Fiz julgamentos temerários a respeito de alguém?', { rotulo: "Julgamento precipitado", texto: "Acreditar firmemente, sem razão suficiente, que alguém possui um defeito moral ou fez algo errado." },
      obs(
        'Este pecado acontece quando alguém condena interiormente outra pessoa sem ter evidências suficientes para pensar daquele jeito.',
      ),
    ),
    q(
      'Falei dos pecados ou defeitos graves de uma pessoa sem necessidade? Tenho o hábito de falar mal dos outros?',
      obs('Este é o pecado de maledicência, que fere a reputação das pessoas sem necessidade.'),
    ),
    q(
      'Revelei algum segredo importante, sendo que a pessoa esperava que eu guardasse sigilo? Tenho o hábito de revelar os segredos das pessoas?',
    ),
    q('Provoquei intrigas para criar inimizades entre as pessoas?'),
    q('Jurei falso ou assinei documentos falsos? Usei documentos falsos?'),
  ],

  m9: [
    q(
      'Consenti em pensamentos, desejos ou olhares contra a castidade? Quem foi objeto desses pensamentos ou olhares: pessoa casada, parente próximo, pessoa consagrada, criança, pessoa do mesmo sexo?',
      atencao(
        'Quando percebemos que um olhar pode nos levar ao desejo sexual, devemos desviar imediatamente o olhar para não desejarmos sexualmente aquela outra pessoa. E quando percebemos que uma imagem sexual veio à nossa mente, devemos desviar o pensamento para não nos “deleitarmos” com aquela imagem.',
      ),
    ),
    q('Sendo casado, pratiquei o ato sexual pensando voluntariamente em outra pessoa?'),
  ],

  m10: [
    q('Fiquei triste ou com raiva por ver que uma pessoa tinha algum bem material que eu não possuía?', { rotulo: "Inveja", texto: "Desejar os bens de outrem." }),
    q(
      'Fiquei triste ou com raiva por ver que uma pessoa tinha algum bem espiritual que eu não possuía?', { texto: "Inclui a inveja dos sucessos e talentos alheios." },
      exemplo(
        'Invejar a capacidade intelectual de uma pessoa; invejar a determinação e a força de vontade da pessoa; invejar as virtudes de uma pessoa etc.',
      ),
    ),
    q('Dei mais valor aos bens materiais do que à minha salvação eterna?'),
  ],

  igreja: [
    {
      texto: 'Recebi a Sagrada Eucaristia pelo menos uma vez ao ano, por ocasião do Tempo Pascal?',
      acuso: 'Não recebi a Sagrada Eucaristia no Tempo Pascal.',
      notas: [
        { rotulo: "Quarto preceito da Igreja", texto: "Receber a Santa Comunhão durante o período da Páscoa. O período da Páscoa para a comunhão pascal começa na Quinta-feira Santa e termina no Primeiro Domingo depois de Pentecostes (Festa da Santíssima Trindade). Entretanto, após ter recebido a Primeira Comunhão, é fortemente recomendado que se receba este magno Sacramento freqüentemente durante a vida (mesmo diariamente, se possível, como recomendado pelo Papa São Pio X)." },
        atencao(
          'O fiel não é obrigado a comungar em todas as Missas de que participa, inclusive aos domingos e dias santos de guarda. Caso ele comungue uma vez no ano durante o período da Páscoa, já cumpre o preceito da Comunhão Anual. A Igreja convida os fiéis a comungarem com mais frequência, porém não os obriga a isso.',
        ),
      ],
    },
    {
      texto: 'Guardei o jejum eucarístico de uma hora antes da comunhão eucarística?',
      acuso: 'Não guardei o jejum eucarístico de uma hora antes da comunhão.',
      notas: [
        obs(
          'O jejum eucarístico consiste em que não podemos comer nem beber nada por pelo menos uma hora antes do momento de comungar; só é permitido tomar água e remédios.',
        ),
      ],
    },
    {
      texto: 'Cumpri o jejum e a abstinência de carne nos dias prescritos pela Igreja?',
      acuso: 'Não cumpri o jejum e a abstinência de carne nos dias prescritos pela Igreja.',
      notas: [
        { rotulo: "Segundo preceito da Igreja", texto: "Jejuar, abster-se de carne e fazer penitência nos dias prescritos. A lei da abstinência obriga aqueles que completaram 14 anos de idade até o fim da vida. A lei do jejum obriga aqueles que atingiram sua maioridade (18 anos) até o início de seus 60 anos." },
        { texto: "Jejuar significa comer menos comida do que normalmente se come. Nos dias de jejum, é permitido comer uma refeição completa e duas outras menores que, juntas, não passem a quantidade de uma refeição completa. Os dias de jejum são a Quarta-feira de Cinzas e a Sexta-feira Santa." },
        { texto: "Nos dias de abstinência, é proibido comer carne. Os dias de abstinência são: todas as sextas-feiras do ano e a Quarta-feira de Cinzas. No Brasil, a abstinência pode ser comutada (salvo na Quarta-feira de Cinzas e na Sexta-feira Santa) por outras formas de penitência, principalmente em obras de caridade e exercícios de piedade. Uma penitência substituta permitida poderia ser: dizer um terço, a Via Sacra, visitar os doentes ou presos, etc. O mais aconselhável é guardar a tradicional abstinência." },
        atencao(
          'Estão obrigadas à lei da abstinência de carne as pessoas que completaram catorze anos de idade. Estão obrigadas à lei do jejum todas as pessoas que completaram dezoito anos de idade, e esta obrigação perdura até os sessenta anos.',
        ),
        {
          rotulo: 'Quando e como devemos fazer jejum?',
          texto:
            'Na Quarta-feira de Cinzas e na Sexta-feira Santa. O jejum mínimo para cumprir o preceito consiste em tomar apenas três refeições durante todo o dia de jejum: uma refeição completa, mais duas pequenas refeições que, somadas, não chegam a formar uma refeição completa.',
        },
        {
          rotulo: 'Quando e como devemos fazer abstinência de carne?',
          texto:
            'Na Quarta-feira de Cinzas e em todas as sextas-feiras do ano, com exceção das sextas-feiras que caírem em solenidades da Igreja. Devemos nos abster de todos os tipos de carne de animal de sangue quente, ou seja, carne de boi, frango, porco, aves e caça. Nesses dias é permitido comer peixes, ovos e frutos do mar.',
        },
      ],
    },
    {
      texto: 'Confessei-me pelo menos uma vez ao ano?',
      acuso: 'Fiquei mais de um ano sem me confessar.',
      notas: [{ rotulo: "Terceiro preceito da Igreja", texto: "Confissão dos pecados mortais ao menos uma vez por ano. A Santa Igreja insta-nos a confessar-nos freqüentemente, mas nos obriga a fazê-lo somente uma vez por ano para admoestar aqueles que possam ter a presunção da misericórdia de Deus, o que é um pecado contra o Espírito Santo. Os pais devem preparar seus filhos para a confissão tão logo a criança aprenda a distinguir o certo do errado (isto é, por volta dos sete anos de idade). A obrigação de se confessar uma vez por ano obriga somente àqueles que cometeram um pecado mortal e não se confessaram por pelo menos um ano." }],
    },
    {
      texto: 'Tenho contribuído para as necessidades materiais da Igreja segundo as minhas possibilidades?',
      acuso: 'Não contribuí para as necessidades materiais da Igreja segundo as minhas possibilidades.',
      notas: [{ rotulo: "Quinto preceito da Igreja", texto: "Contribuir para o sustento da Igreja e de seus ministros. Este preceito requer que cada um preste auxílio às necessidades materiais da Igreja conforme suas possibilidades." }, exemplo('Pagando o dízimo, fazendo doações ou ofertas.')],
    },
  ],
}
