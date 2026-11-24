import { useEffect, useRef, useState } from 'react'
import { Dialogo } from './comum.tsx'
import { apagarTudo, useEstado, useRota } from './estado.ts'
import { Confissao } from './paginas/Confissao.tsx'
import { Diario } from './paginas/Diario.tsx'
import { Capitais } from './paginas/Capitais.tsx'
import { Criancas } from './paginas/Criancas.tsx'
import { Estados } from './paginas/Estados.tsx'
import { Depois } from './paginas/Depois.tsx'
import { Exame } from './paginas/Exame.tsx'
import { Inicio } from './paginas/Inicio.tsx'
import { Oracoes } from './paginas/Oracoes.tsx'
import { Preparar } from './paginas/Preparar.tsx'

export const meta: Record<string, [string, string]> = {
  preparar: ['Antes de se confessar', 'Como se preparar para a confissão: o que fazer antes de entrar no confessionário.'],
  exame: ['Exame de consciência para a confissão', 'Exame de consciência para adultos, por mandamento, para preparar a confissão. Nada sai do aparelho.'],
  confissao: ['No confessionário', 'O que dizer ao sacerdote, passo a passo, durante a confissão.'],
  diario: ['Exame de consciência diário', 'Exame de consciência diário em cinco passos, para fazer ao fim do dia, antes de dormir.'],
  estados: ['Exame pelos deveres do próprio estado', 'Exame de consciência pelos deveres do próprio estado: pais, filhos, casados, empregados, professores e estudantes.'],
  capitais: ['Exame pelos sete pecados capitais', 'Exame de consciência pelos sete pecados capitais: soberba, avareza, luxúria, inveja, gula, ira e preguiça.'],
  criancas: ['Exame de consciência para crianças', 'Exame de consciência para crianças, com perguntas simples e orientação para os pais, para a primeira confissão.'],
  depois: ['Depois da confissão', 'Cumprir a penitência e dar graças depois da confissão.'],
  oracoes: ['Orações da confissão', 'Ato de contrição e outras orações para antes e depois da confissão.'],
}

const outros = [
  { rota: 'diario', nome: 'Exame diário' },
  { rota: 'capitais', nome: 'Pecados capitais' },
  { rota: 'estados', nome: 'Deveres do estado' },
  { rota: 'criancas', nome: 'Para crianças' },
]

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
  const mais = useRef<HTMLDetailsElement>(null)
  const marcados = Object.keys(estado.marcas).length + (estado.outros.trim() ? 1 : 0)

  // Página nova começa no topo, com o foco no conteúdo.
  const primeira = useRef(true)
  useEffect(() => {
    if (primeira.current) {
      primeira.current = false
      return
    }
    scrollTo(0, 0)
    mais.current?.removeAttribute('open')
    conteudo.current?.focus({ preventScroll: true })
  }, [pagina, passo])

  useEffect(() => {
    const m = meta[pagina]
    document.title = m ? `${m[0]} — O Hiponense` : 'Confissão — O Hiponense'
    if (m) document.querySelector('meta[name=description]')?.setAttribute('content', m[1])
    const url = `https://confissao.pages.dev/${pagina}`
    document.querySelector('link[rel=canonical]')?.setAttribute('href', url)
    document.querySelector('meta[property="og:url"]')?.setAttribute('content', url)
  }, [pagina])

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
          <details className="mais" ref={mais}>
            <summary aria-current={outros.some((o) => o.rota === pagina) ? 'page' : undefined}>Mais</summary>
            <div>
              {outros.map((o) => (
                <a key={o.rota} href={`/${o.rota}`} aria-current={pagina === o.rota ? 'page' : undefined}>
                  {o.nome}
                </a>
              ))}
            </div>
          </details>
        </nav>
      </header>

      <main ref={conteudo} tabIndex={-1}>
        {pagina === 'preparar' ? (
          <Preparar />
        ) : pagina === 'exame' ? (
          <Exame passo={passo} />
        ) : pagina === 'confissao' ? (
          <Confissao />
        ) : pagina === 'diario' ? (
          <Diario />
        ) : pagina === 'estados' ? (
          <Estados />
        ) : pagina === 'capitais' ? (
          <Capitais />
        ) : pagina === 'criancas' ? (
          <Criancas />
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
          Padre Paulo Ricardo; orações do Manual da Paróquia (1942); Catecismo de São Pio X.
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
