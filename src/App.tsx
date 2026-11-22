import { useEffect, useRef, useState } from 'react'
import { Dialogo } from './comum.tsx'
import { apagarTudo, useEstado, useRota } from './estado.ts'
import { Confissao } from './paginas/Confissao.tsx'
import { Depois } from './paginas/Depois.tsx'
import { Exame } from './paginas/Exame.tsx'
import { Inicio } from './paginas/Inicio.tsx'
import { Oracoes } from './paginas/Oracoes.tsx'
import { Preparar } from './paginas/Preparar.tsx'

const paginas = [
  { rota: 'preparar', nome: 'Preparar' },
  { rota: 'exame', nome: 'Exame' },
  { rota: 'confissao', nome: 'Confissão' },
  { rota: 'oracoes', nome: 'Orações' },
]

export function App() {
  const [pagina, passo] = useRota()
  const estado = useEstado()
  const [apagando, setApagando] = useState(false)
  const conteudo = useRef<HTMLElement>(null)
  const marcados = Object.keys(estado.marcas).length + (estado.outros.trim() ? 1 : 0)

  // Página nova começa no topo, com o foco no conteúdo.
  const primeira = useRef(true)
  useEffect(() => {
    if (primeira.current) {
      primeira.current = false
      return
    }
    scrollTo(0, 0)
    conteudo.current?.focus({ preventScroll: true })
  }, [pagina, passo])

  return (
    <>
      <header className="topo">
        <button className="pular" onClick={() => conteudo.current?.focus()}>
          Ir para o conteúdo
        </button>
        <a className="marca" href="/" aria-current={pagina === '' ? 'page' : undefined}>
          O Hiponense
        </a>
        <nav aria-label="Principal">
          {paginas.map((p) => (
            <a key={p.rota} href={`/${p.rota}`} aria-current={pagina === p.rota ? 'page' : undefined}>
              {p.nome}
              {p.rota === 'confissao' && marcados > 0 && (
                <span className="conta" aria-label={`${marcados} marcados`}>
                  {marcados}
                </span>
              )}
            </a>
          ))}
        </nav>
      </header>

      <main ref={conteudo} tabIndex={-1}>
        {pagina === 'preparar' ? (
          <Preparar />
        ) : pagina === 'exame' ? (
          <Exame passo={passo} />
        ) : pagina === 'confissao' ? (
          <Confissao />
        ) : pagina === 'depois' ? (
          <Depois />
        ) : pagina === 'oracoes' ? (
          <Oracoes />
        ) : (
          <Inicio />
        )}
      </main>

      <footer className="rodape">
        <p>
          O sacramento acontece diante de um sacerdote. Este guia prepara e acompanha, não substitui.
        </p>
        <p>
          Textos do Exame de consciência para adultos (2013) e do Manual de Confissão, fornecido pelo
          Padre Paulo Ricardo; orações do Manual da Paróquia (1942).
        </p>
        <p>
          Contato: <a href="mailto:ediluis16@duck.com">ediluis16@duck.com</a>
        </p>
        <button className="discreto" onClick={() => setApagando(true)}>
          Apagar tudo o que está guardado neste aparelho
        </button>
      </footer>

      <Dialogo
        aberto={apagando}
        aoFechar={() => setApagando(false)}
        titulo="Apagar tudo?"
        acoes={
          <>
            <button
              className="botao"
              onClick={() => {
                apagarTudo()
                setApagando(false)
              }}
            >
              Apagar tudo
            </button>
            <button className="discreto" onClick={() => setApagando(false)}>
              Cancelar
            </button>
          </>
        }
      >
        <p>
          A lista do exame, a penitência anotada e a data da última confissão serão apagadas deste
          aparelho. Não é possível recuperar.
        </p>
      </Dialogo>
    </>
  )
}
