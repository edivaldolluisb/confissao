import { useSyncExternalStore } from 'react'
import { emGraca, inicial, type Estado } from './logica.ts'

const CHAVE = 'hiponense.confissao.v3'
const CHAVES_ANTIGAS = ['hiponense.confissao.v1', 'hiponense.confissao.v2'] // exames anteriores: ids incompatíveis

function carregar(): Estado {
  try {
    CHAVES_ANTIGAS.forEach((chave) => localStorage.removeItem(chave))
    const bruto = localStorage.getItem(CHAVE)
    if (bruto) return { ...inicial, ...JSON.parse(bruto) }
  } catch {
    // armazenamento bloqueado ou corrompido: começa vazio
  }
  return inicial
}

let estado = carregar()
const ouvintes = new Set<() => void>()

function refletir() {
  document.documentElement.dataset.estado = emGraca(estado) ? 'graca' : 'penitencia'
}
refletir()

export function definir(mudanca: Partial<Estado> | ((e: Estado) => Estado)) {
  estado = typeof mudanca === 'function' ? mudanca(estado) : { ...estado, ...mudanca }
  try {
    if (estado.guardar) localStorage.setItem(CHAVE, JSON.stringify(estado))
    else localStorage.removeItem(CHAVE)
  } catch {
    // sem armazenamento: fica só na memória
  }
  refletir()
  ouvintes.forEach((o) => o())
}

export const apagarTudo = () => definir({ ...inicial, guardar: estado.guardar })

const assinar = (o: () => void) => {
  ouvintes.add(o)
  return () => ouvintes.delete(o)
}

export const useEstado = () => useSyncExternalStore(assinar, () => estado)

// Rota por hash: "#/exame/3" -> ['exame', '3']
const lerRota = () => location.hash.replace(/^#\/?/, '')
const assinarRota = (o: () => void) => {
  addEventListener('hashchange', o)
  return () => removeEventListener('hashchange', o)
}
export const useRota = () => useSyncExternalStore(assinarRota, lerRota).split('/')

// Navegação síncrona: o hashchange nativo só dispara depois, tarde demais para uma view transition.
export function irPara(rota: string) {
  location.hash = `#/${rota}`
  dispatchEvent(new HashChangeEvent('hashchange'))
}

const consultaLarga = matchMedia('(min-width: 62rem)')
const assinarLargura = (o: () => void) => {
  consultaLarga.addEventListener('change', o)
  return () => consultaLarga.removeEventListener('change', o)
}
export const useTelaLarga = () => useSyncExternalStore(assinarLargura, () => consultaLarga.matches)
