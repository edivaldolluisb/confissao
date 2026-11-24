// O exame junta dois textos, seção a seção:
// 1) a lista do "Exame de consciência para adultos a partir dos Dez Mandamentos de Deus e dos
//    Preceitos da Santa Igreja" (2013), em confissao/exame-de-conscic3aancia-rev.pdf, neste arquivo;
// 2) as perguntas do "Manual de Confissão", em manual.ts, acrescentadas ao fim de cada seção.
// Onde os dois dizem o mesmo pecado, fica a pergunta do manual (primeira pessoa) e o item da
// lista sai daqui; a explicação que a lista trazia passa para as notas da pergunta.
// Na lista, o que o original traz entre parênteses vai em `notas`, salvo quando restringe o
// próprio pecado ("sem causa grave"), que fica no texto.
// `acuso` só existe onde o item está na forma positiva e marcá-lo seria ambíguo.
import { GRUPO_MANUAL, RAPIDO, avisoCastidade, manual } from './manual.ts'

export type Nota = { rotulo?: string; texto: string; itens?: string[] }

// Tipo de exame em que o item aparece: 1 rápido, 2 médio, 3 completo.
// Quem escolhe o tipo N vê os itens de nível até N.
export type Nivel = 1 | 2 | 3

export type Pergunta = {
  id: string
  texto: string
  nivel: Nivel
  acuso?: string
  grupo?: string
  notas?: Nota[]
}

export const tipos: { nivel: Nivel; nome: string; unidade: string; descricao: string }[] = [
  { nivel: 1, nome: 'Rápido', unidade: 'perguntas', descricao: 'As principais de cada mandamento.' },
  { nivel: 2, nome: 'Médio', unidade: 'perguntas', descricao: 'Todas as do Manual de Confissão.' },
  {
    nivel: 3,
    nome: 'Completo',
    unidade: 'itens',
    descricao: 'As perguntas do manual e a lista de pecados do Exame de consciência para adultos.',
  },
]

export const contarItens = (tipo: Nivel) =>
  secoes.reduce((total, s) => total + s.perguntas.filter((p) => p.nivel <= tipo).length, 0)

export type Secao = {
  id: string
  marca: string // o que aparece na estola
  titulo: string
  citacao?: string
  intro?: string
  avisos?: string[]
  depois?: string
  perguntas: Pergunta[]
}

export type Entrada =
  | string
  | [texto: string, nota: string]
  | { grupo: string }
  | { texto: string; acuso?: string; notas?: (string | Nota)[]; itens?: string[]; oculto?: boolean }

// ponytail: ids pela posição na lista. Inserir ou remover um item no meio desloca as
// marcas já guardadas; ao editar a lista, subir a versão da CHAVE em estado.ts.
function secao(dados: Omit<Secao, 'perguntas'>, lista: Entrada[]): Secao {
  const entradas: Entrada[] = [...lista, { grupo: GRUPO_MANUAL }, ...(manual[dados.id] ?? [])]
  const perguntas: Pergunta[] = []
  let n = 0 // conta também os ocultos, para os ids das outras perguntas não mudarem
  let grupo: string | undefined
  entradas.forEach((e, i) => {
    if (typeof e === 'object' && 'grupo' in e) {
      grupo = e.grupo
      return
    }
    const { itens, oculto, ...base } = typeof e === 'string' ? { texto: e } : Array.isArray(e) ? { texto: e[0], notas: [e[1]] } : e
    // `itens` é a lista que segue o primeiro parágrafo da nota.
    const notas = base.notas?.map((n, j): Nota => ({ ...(typeof n === 'string' ? { texto: n } : n), ...(j === 0 && itens ? { itens } : {}) }))
    // A lista de 2013 só entra no exame completo; do manual, as perguntas de RAPIDO entram em todos.
    const nivel: Nivel = i < lista.length ? 3 : RAPIDO.some((inicio) => base.texto.startsWith(inicio)) ? 1 : 2
    n++
    if (!oculto) perguntas.push({ ...base, notas, nivel, id: `${dados.id}-${n}`, grupo })
  })
  return { ...dados, perguntas }
}

export const secoes: Secao[] = [
  secao({ id: 'antes', marca: 'Antes', titulo: 'Antes dos mandamentos' }, [
    { texto: 'Você recebeu absolvição?', acuso: 'Não recebi a absolvição na última confissão.' },
  ]),

  secao(
    {
      id: 'm1',
      marca: 'I',
      titulo: '1º Mandamento',
      citacao: 'Eu sou o Senhor teu Deus, não terás outro deus diante de mim',
    },
    [
      ['Negligência na oração', 'Distrações voluntárias, poucas orações.'],
      'Ingratidão para com Deus',
      'Preguiça espiritual',
      [
        'Tentar a Deus',
        'Explicitamente ou implicitamente, por exemplo, expondo-se a um perigo para alma, para a vida ou para a saúde sem causa grave.',
      ],
      [
        'Não se comportar adequadamente em uma Igreja',
        'Por exemplo, não fazer a genuflexão para o Santíssimo Sacramento ao entrar ou sair de uma Igreja, etc.',
      ],
      [
        'Excessivo apego a coisas/criaturas',
        'Por exemplo, afeição exagerada a animais, fanáticos por esportes, ter ídolos de TV, música, cinema, amor pelo dinheiro, prazer ou poder.',
      ],
      'Hipnotismo (sem causa grave)',
      'Atribuição de importância indevida aos sonhos, presságios, destino',
      'Usar amuletos',
      [
        'Sacrilégio',
        'Profanar ou tratar indignamente os sacramentos, particularmente a Santa Eucaristia, bem como as demais ações litúrgicas, profanar ou tratar indignamente pessoas religiosas, coisas santas, como os vasos sagrados ou estátuas, ou ainda lugares consagrados a Deus.',
      ],
      ['Simonia', 'Comprar ou vender coisas espirituais.'],
      ['Uso profano ou supersticioso de objetos abençoados', 'Às vezes para se manter no pecado.'],
      [
        'Materialismo prático',
        'Acreditar que se precisa somente de coisas materiais e desejar somente a elas.',
      ],
      [
        'Humanismo ateu',
        'Que considera falsamente que o homem é um fim em si mesmo, e com supremo controle sobre sua própria história, ou completamente autônomo.',
      ],
      [
        'Ateísmo em geral',
        'Rejeita, nega e duvida da existência de Deus, seja em teoria ou na prática, isto é, ignorando-O na vida diária.',
      ],
      [
        'Agnosticismo',
        'Que postula a existência de um ser transcendental que é incapaz de se revelar, e sobre quem nada pode ser dito; ou não fazer nenhum julgamento sobre a existência de Deus, declarando ser impossível prová-la ou mesmo de afirmá-la ou negá-la.',
      ],

      { grupo: 'Pecados contra a fé' },
      'Falar contra uma doutrina da Igreja Católica',
      'Negligência em se instruir na fé segundo o próprio estado',
      [
        'Credulidade imprudente',
        'Como dar crédito a revelações privadas muito facilmente ou acreditar em revelações privadas que foram condenadas pelas autoridades legítimas da Igreja.',
      ],
      ['Apostasia', 'Abandono completo da fé.'],
      [
        'Indiferentismo',
        'Acreditar que uma religião é tão boa quanto as demais, e que todas as religiões são igualmente verdadeiras e agradáveis a Deus, ou que se é livre para aceitar ou rejeitar uma ou todas as religiões.',
      ],
      'Ouvir a pregação de um ministro de falsa religião',

      { grupo: 'Pecados contra a esperança' },
      'Falta de confiança no poder de Sua Graça para apoiar-nos nos apuros ou na tentação',
      'Não recorrer a Deus e aos santos nos momentos de tentação',
      'Nenhum desejo de possuir a felicidade eterna no paraíso ou após a vida terrena',
      'Presunção da misericórdia de Deus ou na suposta eficácia de certas práticas de piedade para continuar no pecado',
      'Recusa de qualquer dependência de Deus',

      { grupo: 'Pecados contra a caridade' },
      'Não fazer um ato de caridade em intervalos regulares durante a vida, particularmente em momentos de necessidade',
      [
        'Egoísmo',
        'Alguém se preocupa somente consigo mesmo, elogia-se, é interesseiro, gosta de receber elogios.',
      ],
      'Pensamentos deliberadamente revoltosos contra Deus',
      'Jactância, orgulho do próprio pecado ou alardear o próprio pecado',
      'Violar a lei de Deus ou omitir boas obras por respeito humano',
      'Impaciência diante das adversidades e provações',
    ],
  ),

  secao(
    {
      id: 'm2',
      marca: 'II',
      titulo: '2º Mandamento',
      citacao: 'Não tomarás o nome do Senhor teu Deus em vão',
    },
    [
      'Desonra de Deus por uso profano ou desrespeitoso de seu Nome, ou do Santo Nome de Jesus Cristo, da Santíssima Virgem Maria e de todos os santos',
      'Ouvir músicas blasfemas',
      [
        'Amaldiçoar a si mesmo ou a outros',
        'Se tiver intenção de dizer realmente o que disse, há matéria grave.',
      ],
      'Murmurar, reclamando das disposições da providência divina',
      'Irreverência na Igreja, falando durante a Missa ou em uma Igreja sem razão suficiente ou distrair os demais; vestindo-se de forma inapropriada na Igreja ou por qualquer outro comportamento impróprio',
    ],
  ),

  secao(
    {
      id: 'm3',
      marca: 'III',
      titulo: '3º Mandamento',
      citacao: 'Lembra-te que deves santificar o dia do Senhor',
    },
    [
      'Omissão da oração e do culto divino; todo trabalho servil desnecessário e tudo que impede a santificação do dia do Senhor',
      ['Comércio desnecessário', 'Isto é, comprar e vender nos Domingos e Dias de Guarda.'],
      'Profanar estes dias, por frequentar companhia impiedosa, com diversões pecaminosas, jogos de azar, dança indecente, ou excessos com bebida',
    ],
  ),

  secao({ id: 'm4', marca: 'IV', titulo: '4º Mandamento', citacao: 'Honra teu pai e tua mãe' }, [
    { grupo: 'Para os pais' },
    'Odiar os filhos',
    'Amaldiçoar os filhos',
    'Deixar que cresçam na ignorância, indolência ou pecado',
    'Demonstrar parcialidade habitual para com os filhos sem causa',
    'Negligência no cuidado da saúde corporal, instrução religiosa, quanto às companhias com que andam, aos livros que lêem, diversões, etc.',
    'Ser duro ou cruel nas correções',
    [
      'Enviar os filhos para escolas protestantes ou outras escolas perigosas',
      'Esotéricas, de outra religião.',
    ],
    'Negligência em conduzi-los à Missa aos Domingos e Dias Santos de Guarda e na recepção dos sacramentos',

    { grupo: 'Para as crianças' },
    'Toda forma de raiva ou aversão contra os pais e demais superiores legítimos',
    'Desdenhar os pais',
    'Provocá-los à raiva',
    'Ofendê-los',

    { grupo: 'Maridos e esposas' },
    'Falta de paciência quanto às faltas um do outro ou dureza quanto a elas',
    'Ciúmes despropositados',
    'Negligência nos deveres domésticos',
    'Mau humor, aborrecimento sem motivo',
    'Palavras injuriosas',
    'Negligências na busca de meios seguros de sustento da família por causa de preguiça ou timidez',

    { grupo: 'Súditos da Igreja e do Estado' },
    'Desrespeitar e desobedecer aos superiores espirituais, como o Papa, os bispos e os padres da Igreja em suas ordens legítimas; comportar-se de maneira soberba e insultante em relação a eles; recusar a rezar por eles, ou pela conversão deles',
    'Deixar de rezar pelo próprio país, pelo seu governo',
    'Colocar o país acima de Deus',
    ['Tomar parte em questões subversivas', 'Atividades revolucionárias.'],
    // Ocultos até confirmar com o padre. Cada `oculto` guarda o lugar do id da pergunta;
    // para voltar a mostrar, trocar pelo texto do comentário.
    { texto: '', oculto: true }, // 'Juntar-se a alguma associação Comunista ou Liberal'
    'Resistir às autoridades legais do país, tomando parte em alguma violência de multidão, ou perturbando a paz pública',
    { texto: '', oculto: true }, // 'Votar em partidos comunistas ou socialistas'

    { grupo: 'Para os empregadores' },
    'Não permitir aos empregados tempo razoável para o cumprimento dos deveres e instrução religiosos',
    'Dar mau exemplo a eles ou permitir que outros o façam',
    'Não cuidar deles na doença',
    'Demiti-los arbitrariamente sem causa',
    'Imposição de políticas desproporcionadas',

    { grupo: 'Para os empregados' },
    'Desrespeito aos empregadores',
    [
      'Falta de obediência em matéria que se tenha obrigado a obedecer',
      'Por exemplo, cumprindo um contrato justo.',
    ],
    ['Perda de tempo', 'Sobretudo com internet.'],
    'Negligência no trabalho',
    'Gasto de propriedade do empregador por desonestidade, por falta de cuidado ou por negligência',
    'Violar políticas do local de trabalho sem razão suficiente',

    { grupo: 'Para profissionais ou servidores públicos' },
    'Falta de conhecimento culpável no que se refere aos deveres do ofício ou profissão',
    'Negligência na execução de tais deveres',
    'Injustiça ou parcialidade',

    { grupo: 'Para os professores' },
    'Negligência no progresso daqueles confiados ao seu cuidado',
    'Punição injusta, inconsiderada ou excessiva',
    'Parcialidade',
    'Mau exemplo',
    ['Ensino de máximas falsas ou incertas', 'Ensinar coisas falsas como verdadeiras.'],

    { grupo: 'Para os estudantes' },
    'Desrespeito',
    'Desobediência',
    'Teimosia',
    'Indolência, preguiça',
    'Perda de tempo',
    ['Dar-se a distrações inúteis', 'Festas e recreações indevidas, internet, televisão.'],

    { grupo: 'Para todos' },
    'Desprezo das leis justas do Estado e do país bem como da Igreja',
    'Desobediência à autoridade legítima',
    'Desobediência das leis civis',
  ]),

  secao(
    {
      id: 'm5',
      marca: 'V',
      titulo: '5º Mandamento',
      citacao: 'Não matarás',
      // Redação nossa, a partir do primeiro item da lista de 2013 ("por ação própria,
      // participação, instigação, conselho, consentimento ou silêncio").
      avisos: [
        'Vale para todo este mandamento: peca-se não só por ação própria, mas também por participação, instigação, conselho, consentimento ou silêncio. Quem colabora com o pecado de outro, mesmo indiretamente, deve confessá-lo.',
      ],
    },
    [
    'Causar morte ou lesão física de alguém por ação própria, participação, instigação, conselho, consentimento ou silêncio',
    'Retirar os meios ordinários para um paciente terminal ou moribundo',
    'Brigar',
    'Rixas',
    'Ódio',
    'Tortura humana',
    ['Gula', 'Beber ou comer em excesso.'],
    ['Colocar em perigo a vida de outros', 'Como beber e dirigir, dirigir muito rápido, etc.'],
    [
      'Colocar em risco a própria vida ou um membro do corpo sem uma razão suficiente',
      'Por exemplo, acrobacias arriscadas, roleta russa, etc.',
    ],
    'Descuido em deixar expostos venenos, drogas perigosas, armas, etc.',
    'Histerectomia (sem causa médica suficiente)',
    'Pesquisas científicas imorais e suas aplicações',
    'Mau exemplo ou escândalo, levando outros a pecar',
    'Desrespeito pelos moribundos ou pelos mortos',
    'Não tentar evitar a guerra',
    'Mostrar aversão ou desprezo pelos outros',
    'Recusar falar com outros quando cumprimentado',
    'Ignorar ofertas de reconciliação, especialmente entre parentes',
    'Fomentar um espírito que não perdoa o próximo',
    'Ações ou palavras irritantes',
    'Tristeza pela prosperidade alheia',
    'Alegrar-se pela miséria alheia',
    'Inveja pela atenção dada aos outros',
    'Comportamento tirânico',
    'Induzir os outros ao pecado pela palavra ou pelo exemplo',
    'Prejudicar a saúde pelo excesso de indulgência',
    'Dar álcool aos outros sabendo que irão abusar dele',
    'Utilizar métodos naturais para evitar filhos possuindo uma mentalidade contraceptiva',
    'Causar morte ou sofrimento desnecessário aos animais',
    ],
  ),

  secao(
    {
      id: 'm6',
      marca: 'VI',
      titulo: '6º Mandamento',
      citacao: 'Não cometerás adultério',
      avisos: [
        'Mencionar as circunstâncias que mudam a natureza do pecado: o sexo da outra pessoa, o parentesco, o estado (próprio e do outro) de casado, solteiro ou vinculado a um voto.',
        avisoCastidade,
      ],
    },
    [
      'Impureza e imodéstia nas palavras, nos olhares e nas ações, seja sozinho ou com outros',
      'Contar ou ouvir piadas sujas; falar ou ouvir (consentindo) coisas indecentes, ou com duplo sentido',
      'Vangloriar-se da própria imoralidade',
      'Expor-se voluntariamente a ocasiões de pecado por curiosidade pecaminosa, por manter companhia perigosa, por frequentar locais perigosos, diversões perigosas ou pecaminosas; por danças indecentes (quase todas as modernas) ou jogos indecentes; por familiaridade indevida com pessoas do sexo oposto',
      'Manter companhia pecaminosa, ou morar com alguém que não é o cônjuge',
      'Ser tentação nessa matéria para os outros, pelo modo de falar, de se comportar, de se vestir, ou insinuando-se',
      'Prostituição',
      'Divórcio',
      'Poligamia',
      'Abuso sexual',
      'Estupro',
      'Ato conjugal consumado de modo inapto à procriação',
      'Danças imodestas',
      'Namoro sem tomar as devidas precauções para guardar a pureza e a fé',
      'Namoro quando não deveria, sem a maturidade suficiente, sem intenção de casar-se',
    ],
  ),

  secao(
    {
      id: 'm7',
      marca: 'VII',
      titulo: '7º Mandamento',
      citacao: 'Não roubarás',
      // Redação nossa, a partir do texto de 2013, que dizia "sem a restituição ou o firme propósito
      // de fazê-la, o pecado não será perdoado".
      avisos: [
        'Quanto aos pecados contra a justiça, diga ao sacerdote, o mais exatamente possível, o valor do que foi furtado ou roubado, ou o tamanho do dano causado, para que ele possa julgar a gravidade. Diga também se já restituiu.',
        'Quando houver um dano a reparar, procure fazê-lo de modo justo e possível. Se não souber como proceder, se não puder reparar de imediato ou se a situação for complexa, explique-a ao confessor e peça orientação. Para o perdão, pede-se o firme propósito de reparar; não é preciso ter resolvido tudo antes de se confessar.',
      ],
      depois:
        'Examine se causou a alguém um prejuízo injusto e se fez o que estava ao seu alcance para repará-lo. Quem, podendo reparar, recusa-se deliberadamente a fazê-lo não mostra um propósito sincero de emenda; já a impossibilidade real de reparar tudo imediatamente não é o mesmo que a recusa, desde que haja vontade de procurar uma solução possível. Se tomou injustamente um bem alheio, deve devolvê-lo; se isso já não for possível, deve reparar o prejuízo com o equivalente adequado, na medida do possível. Quando não souber se há obrigação de reparar ou como fazê-lo, procure a orientação do confessor.',
    },
    [
      'Trapacear',
      'Plágio',
      [
        'Quebra de regulamentação de direito autoral',
        'Por exemplo, fotocopiar algo sem autorização e sem ter causa suficientemente séria para tanto ou com fins comerciais.',
      ],
      'Possessão de bens ilícitos',
      'Aconselhar ou pedir a alguém que prejudique outra pessoa ou danifique seus bens',
      'Ocultação de fraude, roubo ou dano quando se tem dever de dar a informação',
      'Sonegação de impostos ao não pagar os impostos justos',
      'Fraude comercial',
      'Desonestidade na política, nos negócios, etc.',
      'Não fazer a reparação ou compensação a alguém que esteja sofrendo por danos injustos',
      'Aumentar os preços tirando proveito da ignorância ou necessidade alheia',
      ['Usura', 'Emprestar dinheiro a altos juros a alguém em dificuldade financeira.'],
      'Especulação na qual alguém planeja manipular artificialmente o preço dos bens para levar vantagem com prejuízo dos demais',
      'Corrupção na qual alguém influencia o julgamento daqueles que devem decidir em questões legais',
      'Aceitar suborno ou oferecer suborno',
      'Apropriação e uso de bens comuns de uma empresa para propósitos privados',
      'Trabalho mal feito',
      'Falsificação de cheques e faturas',
      'Emitir cheques sabendo que não há fundo suficiente para cobri-lo',
      'Despesas e gastos excessivos',
      ['Não manter promessas ou acordos contratuais', 'Sendo os compromissos moralmente justos.'],
      'Gasto excessivo ou desnecessário de bens, recursos, dinheiro ou fundos',
    ],
  ),

  secao(
    {
      id: 'm8',
      marca: 'VIII',
      titulo: '8º Mandamento',
      citacao: 'Não darás falso testemunho contra o teu próximo',
    },
    [
      'Dizer palavrões, grosserias',
      'Vangloriar-se',
      'Lisonja (bazófia)',
      'Hipocrisia',
      'Exagero',
      'Ironia',
      'Sarcasmo',
      'Criticar os outros, escutar com prazer os outros sendo criticados',
      'Fazer fofocas',
      'Desonrar injustamente outra pessoa em sua presença (injúria)',
      'Publicar (sem causa proporcionalmente grave) segredos que causem descrédito aos outros, mesmo se for verdade',
      'Recusar ou demorar em restituir o bom nome que foi manchado',
      'Acusações sem fundamento',
      'Suspeitas infundadas',
    ],
  ),

  secao(
    {
      id: 'm9',
      marca: 'IX',
      titulo: '9º Mandamento',
      citacao: 'Não cobiçarás a mulher do próximo',
      intro:
        'O nono mandamento proíbe todo pensamento e desejo impuro com os quais nos comprazemos deliberadamente, pensando neles voluntariamente ou consentindo neles de bom grado quando tais paixões ou pensamentos impuros vêm à nossa mente. O penitente deve ter em mente que se deleitar deliberadamente ou consentir em qualquer pecado listado no sexto mandamento pode ter o mesmo grau de gravidade de executá-lo de fato, isto é, trata-se de pecado mortal ou venial, segundo o pecado e conforme haja plena advertência e pleno consentimento. Uma imagem, atração ou ideia que surge sem ser procurada não é, por si só, uma escolha deliberada: o que se examina é se foi acolhida voluntariamente ou alimentada.',
    },
    [], // a lista de 2013 só traz o parágrafo acima; os itens vêm do manual
  ),

  secao(
    {
      id: 'm10',
      marca: 'X',
      titulo: '10º Mandamento',
      citacao: 'Não cobiçarás os bens de teu próximo',
    },
    [
      ['Ciúmes', 'Zelo para manter um bem querido longe dos outros.'],
      'Ganância e o desejo sem limites de ter bens materiais (avareza)',
      'Desejo de enriquecer a qualquer preço',
      'Negócios ou profissões que esperam circunstâncias desfavoráveis aos outros para que possam assim lucrar pessoalmente com isso',
      'Desejar cometer injustiça prejudicando alguém para obter seus bens temporais',
      'Alegrar-se ou consentir nos pecados contra o sétimo mandamento',
    ],
  ),

  secao(
    {
      id: 'igreja',
      marca: 'Igreja',
      titulo: 'Os preceitos da Santa Igreja',
      intro:
        'Além dos Dez Mandamentos da Lei de Deus, os fiéis são também obrigados a seguir os Preceitos da Igreja. O poder de fazer estas leis vem de Nosso Senhor Jesus Cristo, e inclui tudo o que é necessário para o governo da Igreja e para a direção dos fiéis, a fim de que alcancem a salvação eterna.',
    },
    [
      {
        texto: 'Casei-me ou ajudei alguém a se casar, sem a permissão da Santa Igreja, diante de um oficial do Estado ou de um Ministro protestante ou acatólico? Ou sem a dispensa necessária para os graus de parentesco proibidos? Ou com qualquer outro impedimento conhecido? Separou-se sem causa justa? Separou-se e juntou-se com outra pessoa, em segunda união?',
        notas: [{ rotulo: 'Sexto preceito da Igreja', texto: 'Observar as leis da Igreja no que tange à celebração do matrimônio.' }],
      },
    ],
  ),
]
