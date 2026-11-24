// Fontes: "Exame de consciência para adultos" (2013) e "Manual de Confissão",
// ambos em confissao/. As orações de 1942 vêm citadas no primeiro.

export type Oracao = { id: string; titulo: string; texto: string; fonte?: string }

export const oracaoPreparatoria: Oracao = {
  id: 'preparatoria',
  titulo: 'Oração preparatória',
  texto:
    'Meu bom Deus e Salvador, Pai de misericórdia, eis-me aqui prostrado aos vossos pés, cheio de confusão e de remorsos, qual outro filho pródigo que volta arrependido à casa paterna. Não mereço perdão, porque desgostei demasiadamente a vossa bondade infinita. Mas sei que não olhais para os meus pecados senão para perdoá-los, como Pai misericordioso que sois. Pelos méritos inefáveis do vosso Filho, crucificado e morto por meu amor, pelos méritos do seu Preciosíssimo Sangue, pelas suas lágrimas e agonia, tende piedade de mim. Dai-me luz para conhecer os meus pecados; sincero arrependimento para os aborrecer; firme propósito para nunca mais os cometer; ânimo para os acusar e para cumprir com a devida penitência. Amém.',
}

export const oracaoAntesDoExame: Oracao = {
  id: 'antes-do-exame',
  titulo: 'Oração para antes do exame de consciência',
  texto:
    'Senhor Deus onipotente, prostrado humildemente diante da vossa divina majestade, vos rendo infinitas graças por todos os benefícios que de vossa inefável bondade tenho recebido, e em particular por me terdes criado, conservado, remido e cumulado de tantos bens e mercês, muitos dos quais eu ignoro. Rogo-vos, Senhor, humildemente, que vos digneis conceder-me luz abundante para conhecer todas as faltas e pecados, com que vos tenho ofendido, e graça eficaz para me arrepender e me emendar.',
  fonte: 'Manual da Paróquia, 1942, p. 87',
}

export const atoDeContricao: Oracao = {
  id: 'contricao',
  titulo: 'Ato de contrição',
  texto:
    'Senhor meu Jesus Cristo, Deus e Homem verdadeiro, Criador e Redentor meu, por serdes Vós quem sois, sumamente bom e digno de ser amado sobre todas as coisas, e porque vos amo e estimo: pesa-me, Senhor, de todo o meu coração, vos ter ofendido e merecido o Inferno. E proponho firmemente, ajudado com os auxílios de vossa divina graça, emendar-me e nunca mais vos tornar a ofender. E espero alcançar o perdão de minhas culpas, pela vossa infinita misericórdia. Amém.',
}

export const atoDeContricaoBreve: Oracao = {
  id: 'contricao-breve',
  titulo: 'Ato de contrição breve',
  texto:
    'Meu Deus, porque sois infinitamente bom e amável, tenho muita pena por vos ter ofendido. Com a vossa graça, é o meu firme propósito não mais voltar a vos ofender. Amém.',
}

export const confiteor: Oracao = {
  id: 'confiteor',
  titulo: 'Confiteor',
  texto:
    'Eu, pecador, confesso a Deus todo poderoso, à bem-aventurada sempre Virgem Maria, ao bem-aventurado Miguel Arcanjo, ao bem-aventurado João Batista, aos Santos Apóstolos Pedro e Paulo, a todos os Santos, e a vós, Padre, que pequei muitas vezes por pensamentos, palavras e obras, por minha culpa, minha culpa, minha máxima culpa. Portanto, peço e rogo à bem-aventurada sempre Virgem Maria, ao bem-aventurado Miguel Arcanjo, ao bem-aventurado João Batista, aos santos Apóstolos Pedro e Paulo, a todos os Santos, e a vós, Padre, que rogueis a Deus Nosso Senhor por mim.',
}

export const oracaoDepois: Oracao = {
  id: 'depois',
  titulo: 'Oração para depois da confissão',
  texto:
    'Meu bom Jesus, quão bondoso sois! Oh! quem nunca vos ofendera! Apesar de ter sido tão ingrato para convosco, ainda me recebeis na vossa amizade. Podíeis ter me dado a morte, quando eu estava em pecado; podíeis ter me sepultado no inferno para castigar a minha ousadia em transgredir a vossa lei. Mas o vosso amor superou a minha ingratidão e trouxestes-me aos vossos pés para aí me pordes de novo em vossa graça e tranquilizardes o meu coração. Bendito sejais, ó meu Deus misericordioso! Não permitais que eu perca de novo a graça recebida! Antes morrer, que ofender-vos! Meu bom Jesus, minha Mãe Maria Santíssima, meu anjo da guarda, valei-me, para que não torne a pecar.',
  fonte: 'Manual da Paróquia, 1942, p. 91',
}

// Apresentação do "Exame de consciência para adultos".
export const sobreOExame = [
  'As perguntas deste exame servem para ajudar a recordar ações, palavras, pensamentos consentidos e omissões. Não substituem a consciência pessoal nem a orientação do confessor. Se você não souber como avaliar uma situação, apresente-a ao sacerdote com simplicidade e peça orientação.',
  'Uma tentação, ou um pensamento que surge sem ser procurado, não é por si só uma escolha deliberada. O que se examina é se ele foi acolhido voluntariamente, consentido ou alimentado; não é preciso repassar um a um todos os pensamentos que vieram à mente.',
  'Esse exame de consciência tem como objetivo ajudar os fiéis a fazer uma boa confissão. Ele é indicado para adultos (a partir de 14 anos, aproximadamente), contendo pecados específicos contra o 6º e 9º mandamentos. Ele não contém todos os pecados possíveis, como é evidente, mas serve como um guia para ajudar a esclarecer a consciência, a partir das leis objetivas da moral.',
  'Além disso, os pecados mencionados não têm necessariamente a mesma gravidade. Alguns são por si veniais, outros mortais, outros podem ser veniais ou mortais, conforme o caso. Por exemplo, um furto pode ser um pecado mortal ou venial, dependendo da quantia furtada.',
]

export const oracoes: Oracao[] = [
  oracaoAntesDoExame,
  oracaoPreparatoria,
  confiteor,
  atoDeContricao,
  atoDeContricaoBreve,
  oracaoDepois,
]

export const rito = {
  saudacao: 'Abençoai-me, Padre, porque pequei.',
  bencao:
    'Que o Senhor esteja em teus lábios e em teu coração para que possas confessar bem todos os teus pecados. Em nome do Pai, e do Filho, ✠ e do Espírito Santo.',
  conclusao:
    'Acuso-me destes pecados, de todos os que não me lembro e dos de minha vida passada. Deles peço perdão a Deus, e a vós, Padre, a penitência e a absolvição.',
  absolvicao: [
    'Que Deus todo poderoso tenha piedade de ti e te perdoe os pecados e te leve à vida eterna.',
    'Que o Senhor todo poderoso e misericordioso te perdoe e te absolva de todos os teus pecados.',
    'Que Nosso Senhor Jesus Cristo te absolva e eu, por Sua autoridade, te absolvo de todo vínculo de excomunhão e interdito, enquanto posso e tu necessitas.',
    'Por isso eu te absolvo dos teus pecados, em nome do Pai, ✠ do Filho, e do Espírito Santo.',
  ],
  despedida: 'Ide em paz.',
}

export const citacaoSales = {
  texto:
    'Se formos deveras humildes, o nosso pecado há de nos desagradar infinitamente, porque com ele Deus é ofendido, mas a acusação do pecado será para nós doce e agradável, porque com ela Deus é honrado. É uma espécie de alívio dizer claramente ao médico a doença que nos atormenta.',
  autor: 'São Francisco de Sales',
}

export const pecadoMortal = [
  {
    pergunta: 'Quando há um pecado mortal?',
    resposta:
      'Três condições são necessárias para que haja um pecado mortal: matéria grave, plena advertência e pleno consentimento.',
  },
  {
    pergunta: 'O que é matéria grave?',
    resposta:
      'Deus nos proibiu de fazer certas coisas e também nos mandou fazer outras coisas, para que assim nós evitássemos o Inferno e alcançássemos o Céu. Estas leis estão contidas nos Dez Mandamentos dados por Deus a Moisés no Antigo Testamento, bem como nos Cinco Mandamentos da Igreja. É matéria grave o que é gravemente contrário a essas leis: i) ao amor devido a Deus, ii) à benevolência devida ao próximo, iii) à castidade, e iv) aos cinco mandamentos da Igreja. A matéria grave sozinha não basta: para haver pecado mortal, é preciso também plena advertência e pleno consentimento.',
  },
  {
    pergunta: 'O que é plena advertência?',
    resposta:
      'A plena advertência é um ato do intelecto pelo qual tomamos consciência de que estamos pensando ou fazendo algo gravemente contrário à lei de Deus: em outras palavras, a plena advertência é a percepção clara do quão mau é aquele pensamento, palavra, ato ou omissão. Se a nossa consciência percebe que isso ou aquilo ofende gravemente a Deus, ou que a coisa é muito má, a plena advertência já aconteceu. Isso não significa que já tenha havido um pecado da nossa parte, mas sim que de fato nós estamos conscientes da gravidade moral daquela ação ou pensamento.',
  },
  {
    pergunta: 'O que é pleno consentimento?',
    resposta:
      'O pleno consentimento é um ato da vontade. Depois que a nossa consciência já percebeu a gravidade daquele pensamento ou daquele ato, nós podemos decidir se iremos ou não fazer aquilo. Se mesmo depois de tomar consciência da gravidade da coisa nós decidimos livremente fazê-la, então houve o pleno consentimento na coisa má, e consequentemente houve um pecado mortal.',
    nota: 'Se, depois de examinar bem a sua consciência, você não consegue ter certeza se teve plena advertência e pleno consentimento em um pecado, não tire uma conclusão automática: apresente a dúvida ao confessor, dizendo-lhe que não tem certeza, para que sua consciência não fique atribulada.',
  },
]

export const requisitos = [
  {
    nome: 'Exame de consciência',
    texto:
      'Antes de irmos ao sacerdote para a confissão, devemos examinar cuidadosamente a nossa consciência para nos lembrarmos de todos os pecados mortais cometidos desde a última confissão bem-feita. Além disso, devemos lembrar quantas vezes fizemos cada pecado mortal. Se você já é adulto e nunca se confessou, ou se as suas confissões passadas foram malfeitas, procure fazer uma Confissão Geral: trata-se de um exame de consciência mais profundo, onde você irá analisar sua vida desde os 7 anos de idade até o momento presente, anotando os pecados mortais que fez durante esse período, inclusive o número de vezes que cometeu cada pecado mortal.',
  },
  {
    nome: 'Arrependimento',
    outroNome: 'ou contrição',
    texto:
      'Uma vez que nos lembramos de todos os pecados mortais, devemos agora reconhecer interiormente a nossa culpa, porque, com estes pecados mortais, ofendemos gravemente a Deus e merecemos o Inferno. Esse arrependimento deve sair do fundo do nosso coração e não somente da nossa boca. Além disso, devemos nos arrepender de todos os pecados mortais que fizemos, sem ficar nem um de fora: pois quem ama verdadeiramente, não quer ofender de modo algum a pessoa amada. Devemos ter, enfim, uma grande esperança do perdão de Deus.',
  },
  {
    nome: 'Propósito',
    texto:
      'Trata-se de uma decisão firme de abandonar todos os pecados mortais. Tal decisão deve ser imediata e para sempre, ou seja: “Eu não quero mais cometer nenhum pecado mortal, desde agora e para sempre. Não quero mais ofender a Deus”. Além do mais, nosso propósito deve ser eficaz, isto é, devemos estar dispostos a fazer tudo que for necessário para não cometer mais aqueles pecados mortais que iremos confessar, principalmente fugindo das ocasiões próximas de pecado.',
  },
  {
    nome: 'Confissão',
    outroNome: 'ou acusação',
    texto:
      'Se já nos lembramos dos nossos pecados, estamos arrependidos, dispostos a não mais pecar e a fugir das ocasiões, devemos então fazer a nossa confissão verbal a um sacerdote católico. Ela deve ser feita com clareza, humildade e sinceridade: não devemos atribuir a outras pessoas a culpa dos nossos próprios pecados. Esta declaração não pode ser muito genérica: devemos dizer claramente (1) qual foi o pecado cometido, (2) as circunstâncias que agravam aquele pecado e (3) quantas vezes ele foi cometido. Se não sabemos exatamente o número de vezes que fizemos um pecado, devemos dar ao menos uma ideia aproximada do número.',
    nota: 'Lembre-se que a confissão é privada e sujeita ao sigilo sacramental. Isso quer dizer que o sacerdote não pode revelar a ninguém a matéria de uma confissão; caso contrário, ele cometeria um pecado mortal e seria excomungado.',
  },
  {
    nome: 'Penitência',
    outroNome: 'ou satisfação',
    texto:
      'Devemos, enfim, acolher a penitência dada pelo sacerdote e cumpri-la o quanto antes. Geralmente os sacerdotes dão como penitência apenas algumas orações como o Pai Nosso e a Ave Maria. No entanto, para os pecados de calúnia, difamação, roubo, furto, destruição de bens alheios etc., o sacerdote deverá impor algum tipo de reparação, já que esses pecados causam dano a terceiros. Se não aceitarmos a reparação proposta pelo sacerdote, a absolvição será nula.',
    nota: 'Se você fez uma confissão bem-feita, estava disposto a cumprir a penitência dada pelo sacerdote e recebeu a absolvição, sua confissão foi válida e você foi perdoado. Caso você tenha esquecido qual penitência o padre lhe deu, sua confissão permanece válida, porque você já havia recebido o perdão; e nesse caso você poderá rezar alguma outra oração como penitência.',
  },
]

// Perguntas frequentes da página "Antes de se confessar" (também viram dados estruturados para buscadores).
export const perguntasFrequentes = [
  {
    pergunta: 'Quanto tempo deve durar o exame de consciência?',
    resposta:
      'Não há um tempo fixo. Dure o que for preciso para se lembrar dos pecados mortais cometidos desde a última confissão bem feita e de quantas vezes caiu em cada um. Quem não se confessa há muito tempo precisa de mais calma, e pode anotar os pecados para não esquecer.',
  },
  {
    pergunta: 'É preciso lembrar o número exato de vezes que pequei?',
    resposta:
      'Diga o número com a maior exatidão que conseguir. Se não se lembra com precisão, basta uma estimativa honesta, por exemplo “mais ou menos dez vezes” ou “quase todas as semanas”.',
  },
  {
    pergunta: 'O que torna um pecado mortal?',
    resposta:
      'Três condições juntas: matéria grave, plena advertência e pleno consentimento. Faltando uma delas, o pecado não é mortal.',
  },
  {
    pergunta: 'É obrigatório confessar também os pecados veniais?',
    resposta:
      'Não é obrigatório, mas é muito recomendado. Os pecados mortais precisam de ser confessados, com a espécie e o número de vezes. Confessar os veniais ajuda a formar a consciência e a crescer na vida espiritual.',
  },
  {
    pergunta: 'E se eu me esquecer de um pecado na confissão?',
    resposta:
      'Se o esquecimento não foi proposital, a confissão é válida e o pecado foi perdoado. Basta mencioná-lo na próxima confissão. Esconder um pecado de propósito, por vergonha, é que torna a confissão inválida.',
  },
  {
    pergunta: 'O sacerdote pode contar a alguém o que eu confessei?',
    resposta:
      'Não. A confissão está sujeita ao sigilo sacramental: o sacerdote não pode revelar a ninguém o que ouviu, em nenhuma circunstância.',
  },
]
