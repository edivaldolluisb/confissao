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

export const useEstado = () => useSyncExternalStore(assinar, () => estado, () => estado)

// Rota pelo caminho do endereço: "/exame/m7" -> ['exame', 'm7'].
// Exige que o servidor devolva index.html para qualquer caminho; sem isso, abrir ou
// recarregar um endereço como /exame/m7 dá 404. (vite dev e vite preview já o fazem.)
if (location.hash.startsWith('#/')) history.replaceState(null, '', location.hash.slice(1)) // endereços antigos, com #

const lerRota = () => location.pathname.replace(/^\/+|\/+$/g, '')
const assinarRota = (o: () => void) => {
  addEventListener('popstate', o)
  return () => removeEventListener('popstate', o)
}
export const useRota = () => useSyncExternalStore(assinarRota, lerRota, lerRota).split('/')

// Navegação síncrona, para caber dentro de uma view transition.
export function irPara(rota: string) {
  history.pushState(null, '', `/${rota}`)
  dispatchEvent(new PopStateEvent('popstate'))
}

// Links internos navegam sem recarregar a página.
addEventListener('click', (e) => {
  const a = e.target instanceof Element ? e.target.closest('a') : null
  if (!a || a.origin !== location.origin || a.target || a.hasAttribute('download')) return
  if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
  e.preventDefault()
  if (a.pathname !== location.pathname) irPara(a.pathname.slice(1))
})

const consultaLarga = matchMedia('(min-width: 62rem)')
const assinarLargura = (o: () => void) => {
  consultaLarga.addEventListener('change', o)
  return () => consultaLarga.removeEventListener('change', o)
}
export const useTelaLarga = () => useSyncExternalStore(assinarLargura, () => consultaLarga.matches, () => false)
