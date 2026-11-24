import { secoes, type Pergunta } from './exame.ts'

// Cada pecado capital reúne perguntas que o exame já tem (lista de 2013 e Manual de Confissão),
// achadas pelo começo do texto. Se mudar o texto de uma pergunta, ajuste aqui: `capitais.test.ts`
// falha quando um começo deixa de achar alguma.
export const capitais = [
  {
    nome: 'Soberba',
    virtude: 'Humildade',
    comecos: ['Jactância', 'Vangloriar-se', 'Hipocrisia', 'Lisonja', 'Comportamento tirânico', 'Desrespeitar e desobedecer aos superiores espirituais'],
  },
  {
    nome: 'Avareza',
    virtude: 'Generosidade',
    comecos: ['Ganância', 'Desejo de enriquecer', 'Excessivo apego', 'Dei mais valor aos bens materiais', 'Usura', 'Fraude comercial', 'Gasto excessivo'],
  },
  {
    nome: 'Luxúria',
    virtude: 'Castidade',
    comecos: ['Impureza e imodéstia', 'Pequei por pornografia', 'Expor-se voluntariamente a ocasiões de pecado'],
  },
  {
    nome: 'Inveja',
    virtude: 'Caridade',
    comecos: ['Tristeza pela prosperidade alheia', 'Alegrar-se pela miséria alheia', 'Inveja pela atenção', 'Alimentei tristeza ou raiva por ver que uma pessoa tinha algum bem', 'Ciúmes'],
  },
  {
    nome: 'Gula',
    virtude: 'Temperança',
    comecos: ['Gula', 'Prejudicar a saúde pelo excesso de indulgência', 'Usei, por mero prazer, bebidas alcoólicas', 'Dar álcool aos outros', 'Cumpri o jejum e a abstinência'],
  },
  {
    nome: 'Ira',
    virtude: 'Mansidão',
    comecos: ['Brigar', 'Rixas', 'Ódio', 'Desejei o mal a alguém', 'Ofendi alguém', 'Alimentei pensamentos de vingança', 'Fomentar um espírito que não perdoa', 'Ignorar ofertas de reconciliação', 'Ações ou palavras irritantes', 'Mau humor'],
  },
  {
    nome: 'Preguiça',
    virtude: 'Diligência',
    comecos: ['Preguiça espiritual', 'Negligência na oração', 'Indolência, preguiça', 'Negligência no trabalho', 'Perda de tempo', 'Faltei à Missa nos domingos'],
  },
]

const todas: Pergunta[] = secoes.flatMap((s) => s.perguntas)
export const achar = (comeco: string) => todas.filter((p) => p.texto.startsWith(comeco))

export const perguntasDe = (c: (typeof capitais)[number]) => [
  ...new Map(c.comecos.flatMap(achar).map((p) => [p.texto, p])).values(),
]
