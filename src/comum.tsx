import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from 'react'
import type { Nota } from './dados/exame.ts'
import type { Oracao } from './dados/textos.ts'
import { useTelaLarga } from './estado.ts'

export const hojeISO = () => new Date().toLocaleDateString('sv') // AAAA-MM-DD, hora local

export const dataPorExtenso = (iso: string) =>
  new Date(`${iso}T12:00`).toLocaleDateString('pt', { day: 'numeric', month: 'long', year: 'numeric' })

// A cruz da bênção vai em vermelho, como nos livros litúrgicos.
export function ComCruz({ children }: { children: string }) {
  const partes = children.split('✠')
  return partes.map((parte, i) => (
    <span key={i}>
      {i > 0 && (
        <span className="cruz" aria-hidden="true">
          ✠
        </span>
      )}
      {parte}
    </span>
  ))
}

export function Prece({ oracao, titulo = true }: { oracao: Oracao; titulo?: boolean }) {
  return (
    <article className="prece">
      {titulo && <h2>{oracao.titulo}</h2>}
      <p className="fala">{oracao.texto}</p>
      {oracao.fonte && <p className="fonte">{oracao.fonte}</p>}
    </article>
  )
}

// Coluna de notas: acima de umas dez linhas fica recolhida, com "Ler mais".
// Os números casam com `.margem-corpo[data-recolhida]` em estilo.css (13rem ≈ 10 linhas).
const LINHAS_REM = 13
const FOLGA_REM = 4 // não recolher para esconder só duas ou três linhas

function Margem({ children }: { children: ReactNode }) {
  const corpo = useRef<HTMLDivElement>(null)
  const [longa, setLonga] = useState(false)
  const [aberta, setAberta] = useState(false)
  // ponytail: mede uma vez, ao montar; redimensionar a janela não volta a medir.
  useLayoutEffect(() => {
    const rem = parseFloat(getComputedStyle(document.documentElement).fontSize)
    setLonga(corpo.current!.scrollHeight > (LINHAS_REM + FOLGA_REM) * rem)
  }, [])
  return (
    <aside className="margem">
      <div className="margem-corpo" ref={corpo} data-recolhida={longa && !aberta ? '' : undefined}>
        {children}
      </div>
      {longa && (
        <button className="discreto" aria-expanded={aberta} onClick={() => setAberta(!aberta)}>
          {aberta ? 'Ler menos' : 'Ler mais'}
        </button>
      )}
    </aside>
  )
}

// Explicações do exame: à margem em tela larga; em tela estreita, sob o item,
// recolhidas quando são longas.
export function Notas({ notas }: { notas?: Nota[] }) {
  const larga = useTelaLarga()
  if (!notas?.length) return null
  const corpo = notas.map((n) => (
    <div className="nota" key={n.texto}>
      <p>
        {n.rotulo && <em className="rotulo">{n.rotulo}. </em>}
        {n.texto}
      </p>
      {n.itens && (
        <ul>
          {n.itens.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      )}
    </div>
  ))
  if (larga) return <Margem>{corpo}</Margem>
  const curta = notas.every((n) => !n.itens) && notas.reduce((t, n) => t + n.texto.length, 0) < 260
  if (curta) return <div className="explica">{corpo}</div>
  const rotulos = [...new Set(notas.map((n) => n.rotulo ?? 'Explicação'))]
  return (
    <details className="notas">
      <summary>{rotulos.join(', ')}</summary>
      {corpo}
    </details>
  )
}

export function Dialogo(props: {
  aberto: boolean
  aoFechar: () => void
  titulo: string
  children: ReactNode
  acoes: ReactNode
}) {
  const ref = useRef<HTMLDialogElement>(null)
  useEffect(() => {
    const d = ref.current!
    if (props.aberto && !d.open) d.showModal()
    if (!props.aberto && d.open) d.close()
  }, [props.aberto])
  return (
    <dialog ref={ref} onClose={props.aoFechar} aria-labelledby="dialogo-titulo">
      <h2 id="dialogo-titulo">{props.titulo}</h2>
      {props.children}
      <div className="acoes">{props.acoes}</div>
    </dialog>
  )
}
