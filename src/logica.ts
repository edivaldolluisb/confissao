import type { Nivel, Pergunta, Secao } from './dados/exame.ts'

export type Marca = { vezes: string; nota: string }

export type Estado = {
  tipo: Nivel // exame rápido, médio ou completo
  marcas: Record<string, Marca>
  outros: string // pecados que o exame não lista
  haQuanto: string // "Minha última confissão foi há ..."
  penitencia: string
  penitenciaCumprida: boolean
  absolvidoEm: string | null // data ISO da última absolvição registrada aqui
  guardar: boolean // persistir neste aparelho
}

export const inicial: Estado = {
  tipo: 2,
  marcas: {},
  outros: '',
  haQuanto: '',
  penitencia: '',
  penitenciaCumprida: false,
  absolvidoEm: null,
  guardar: true,
}

export const listaVazia = (e: Estado) => Object.keys(e.marcas).length === 0 && e.outros.trim() === ''

// Depois da absolvição e até marcar algo de novo.
export const emGraca = (e: Estado) => e.absolvidoEm !== null && listaVazia(e)

export function absolver(e: Estado, hoje: string): Estado {
  return { ...e, marcas: {}, outros: '', haQuanto: '', penitenciaCumprida: false, absolvidoEm: hoje }
}

export type Grupo = { secao: Secao; itens: { pergunta: Pergunta; marca: Marca }[] }

// A lista para levar ao confessionário, na ordem do exame.
export function agrupar(marcas: Record<string, Marca>, secoes: Secao[]): Grupo[] {
  return secoes
    .map((secao) => ({
      secao,
      itens: secao.perguntas.filter((p) => p.id in marcas).map((p) => ({ pergunta: p, marca: marcas[p.id] })),
    }))
    .filter((g) => g.itens.length > 0)
}
