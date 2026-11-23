import { Fragment, useEffect, useRef } from 'react'
import { dataPorExtenso, Notas, Prece } from '../comum.tsx'
import { contarItens, secoes, tipos, type Pergunta, type Secao } from '../dados/exame.ts'
import { GRUPO_MANUAL } from '../dados/manual.ts'
import { oracaoAntesDoExame, sobreOExame } from '../dados/textos.ts'
import { definir, useEstado } from '../estado.ts'
import type { Estado } from '../logica.ts'

const passos = [
  { id: 'inicio', marca: '✠', titulo: 'Oração preparatória' },
  ...secoes,
  { id: 'outros', marca: 'Outros', titulo: 'Outros pecados' },
]

function alternar(id: string) {
  definir((e) => {
    const { [id]: marcada, ...resto } = e.marcas
    return { ...e, marcas: marcada ? resto : { ...e.marcas, [id]: { vezes: '', nota: '' } } }
  })
}

function anotar(id: string, campo: 'vezes' | 'nota', valor: string) {
  definir((e) => ({ ...e, marcas: { ...e.marcas, [id]: { ...e.marcas[id], [campo]: valor } } }))
}

function Item({ pergunta: p, estado }: { pergunta: Pergunta; estado: Estado }) {
  const marca = estado.marcas[p.id]
  return (
    <>
      <li className="pergunta com-margem">
        <div>
          <label className="marcar">
            <input type="checkbox" checked={!!marca} onChange={() => alternar(p.id)} />
            <span>{p.texto}</span>
          </label>
          {marca && p.acuso && <p className="acuso">Na lista da confissão: {p.acuso}</p>}
          {marca && (
            <div className="detalhes">
              <label>
                Quantas vezes
                <input
                  value={marca.vezes}
                  onChange={(e) => anotar(p.id, 'vezes', e.target.value)}
                  placeholder="3 vezes; toda semana, há um ano"
                  autoComplete="off"
                />
              </label>
              <label>
                Circunstâncias que agravam
                <input
                  value={marca.nota}
                  onChange={(e) => anotar(p.id, 'nota', e.target.value)}
                  autoComplete="off"
                />
              </label>
            </div>
          )}
        </div>
        <Notas notas={p.notas} />
      </li>
    </>
  )
}

function Abertura({ estado }: { estado: Estado }) {
  return (
    <>
      <h1>Exame de consciência para a confissão</h1>
      <fieldset className="tipos">
        <legend>Que exame fazer</legend>
        {tipos.map((t) => (
          <label className="marcar simples" key={t.nivel}>
            <input
              type="radio"
              name="tipo"
              checked={estado.tipo === t.nivel}
              onChange={() => definir({ tipo: t.nivel })}
            />
            <span>
              {t.nome}
              <small>
                {contarItens(t.nivel)} {t.unidade}. {t.descricao}
              </small>
            </span>
          </label>
        ))}
        <small>Dá para mudar a qualquer momento; o que já foi marcado não se perde.</small>
      </fieldset>
      <p className="rubrica">Antes de começar, pedir luz para conhecer os próprios pecados.</p>
      <Prece oracao={oracaoAntesDoExame} titulo={false} />
      <div className="sobre">
        {sobreOExame.map((paragrafo) => (
          <p key={paragrafo}>{paragrafo}</p>
        ))}
      </div>
      <p className="lide">
        Em cada mandamento, marcar o que for preciso levar à confissão e anotar quantas vezes.
      </p>
      <label className="marcar simples">
        <input
          type="checkbox"
          checked={estado.guardar}
          onChange={(e) => definir({ guardar: e.target.checked })}
        />
        <span>
          Guardar neste aparelho até a confissão
          <small>
            Desligado, o que for marcado some ao fechar ou recarregar a página. Ligado, fica só no
            navegador deste aparelho.
          </small>
        </span>
      </label>
    </>
  )
}

function Perguntas({ secao, estado }: { secao: Secao; estado: Estado }) {
  const visiveis = secao.perguntas.filter((p) => p.nivel <= estado.tipo)
  // O título do bloco do manual só faz falta quando a lista de 2013 também está à vista.
  const titulo = (p: Pergunta, i: number) =>
    p.grupo !== visiveis[i - 1]?.grupo && !(p.grupo === GRUPO_MANUAL && estado.tipo < 3) && p.grupo
  return (
    <>
      <h1>{secao.titulo}</h1>
      {secao.citacao && <p className="citacao-mandamento">“{secao.citacao}”</p>}
      {secao.intro && <p className="sobre">{secao.intro}</p>}
      {secao.avisos?.map((aviso) => (
        <p className="rubrica" key={aviso}>
          {aviso}
        </p>
      ))}
      {secao.id === 'antes' && (
        <label className="campo">
          Há quanto tempo você fez sua última confissão?
          <input
            value={estado.haQuanto}
            onChange={(e) => definir({ haQuanto: e.target.value })}
            placeholder="dois meses"
            autoComplete="off"
          />
          {estado.absolvidoEm && (
            <small>Última confissão registrada neste aparelho: {dataPorExtenso(estado.absolvidoEm)}.</small>
          )}
        </label>
      )}
      <ul className="lista-perguntas">
        {visiveis.map((p, i) => (
          <Fragment key={p.id}>
            {titulo(p, i) && <li className="grupo">{p.grupo}</li>}
            <Item pergunta={p} estado={estado} />
          </Fragment>
        ))}
      </ul>
      {secao.depois && <p className="sobre">{secao.depois}</p>}
    </>
  )
}

function Outros({ estado }: { estado: Estado }) {
  return (
    <>
      <h1>Outros pecados</h1>
      <p className="lide">
        Não estão incluídos aqui os pecados e deveres próprios de cada profissão, como médico,
        advogado, comerciante, etc. É preciso lembrar-se deles ao fazer o exame de consciência.
      </p>
      <label className="campo">
        O que mais preciso confessar
        <textarea
          rows={6}
          value={estado.outros}
          onChange={(e) => definir({ outros: e.target.value })}
        />
      </label>
    </>
  )
}

export function Exame({ passo = 'inicio' }: { passo?: string }) {
  const estado = useEstado()
  const indice = Math.max(
    0,
    passos.findIndex((p) => p.id === passo),
  )
  const atual = passos[indice]
  const anterior = passos[indice - 1]
  const seguinte = passos[indice + 1]
  const secao = secoes.find((s) => s.id === atual.id)

  // Na faixa horizontal (telas estreitas), manter o passo atual à vista.
  const estola = useRef<HTMLElement>(null)
  useEffect(() => {
    estola.current
      ?.querySelector('[aria-current]')
      ?.scrollIntoView({ block: 'nearest', inline: 'center' })
  }, [indice])

  return (
    <div className="exame">
      <nav className="estola" aria-label="Partes do exame" ref={estola}>
        <ol>
          {passos.map((p, i) => {
            const n =
              p.id === 'outros'
                ? Number(estado.outros.trim() !== '')
                : (secoes.find((s) => s.id === p.id)?.perguntas.filter((q) => q.id in estado.marcas)
                    .length ?? 0)
            return (
              <li key={p.id}>
                <a
                  href={`/exame/${p.id}`}
                  aria-current={i === indice ? 'step' : undefined}
                  aria-label={n ? `${p.titulo}, ${n} marcados` : p.titulo}
                  title={p.titulo}
                >
                  {p.marca}
                  {n > 0 && <span className="conta">{n}</span>}
                </a>
              </li>
            )
          })}
        </ol>
      </nav>

      {/* a chave refaz o bloco a cada passo, para a animação de entrada tocar de novo */}
      <div className="pagina" key={atual.id}>
        {secao ? (
          <Perguntas secao={secao} estado={estado} />
        ) : atual.id === 'outros' ? (
          <Outros estado={estado} />
        ) : (
          <Abertura estado={estado} />
        )}

        <nav className="passos" aria-label="Avançar no exame">
          {seguinte ? (
            <a className="botao" href={`/exame/${seguinte.id}`}>
              Seguinte: {seguinte.titulo}
            </a>
          ) : (
            <a className="botao" href="/confissao">
              Ver a minha confissão
            </a>
          )}
          {anterior && <a href={`/exame/${anterior.id}`}>Voltar: {anterior.titulo}</a>}
        </nav>
      </div>
    </div>
  )
}
