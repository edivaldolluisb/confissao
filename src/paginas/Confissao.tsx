import { useEffect, useState, type MouseEvent, type ReactNode } from 'react'
import { flushSync } from 'react-dom'
import { ComCruz, Dialogo, hojeISO } from '../comum.tsx'
import { secoes } from '../dados/exame.ts'
import { GRUPO_MANUAL } from '../dados/manual.ts'
import { atoDeContricao, atoDeContricaoBreve, confiteor, rito } from '../dados/textos.ts'
import { definir, irPara, useEstado } from '../estado.ts'
import { absolver, agrupar, listaVazia } from '../logica.ts'

function Fala({ quem, children }: { quem: 'Penitente' | 'Sacerdote'; children: ReactNode }) {
  return (
    <div className="parte">
      <span className="quem">{quem}</span>
      <div className="fala">{children}</div>
    </div>
  )
}

const Rubrica = ({ children }: { children: ReactNode }) => (
  <div className="parte">
    <span />
    <p className="rubrica">{children}</p>
  </div>
)

// A luz abre-se a partir do botão: do roxo da penitência ao branco.
function receberAbsolvicao(e: MouseEvent) {
  const concluir = () =>
    flushSync(() => {
      definir((estado) => absolver(estado, hojeISO()))
      irPara('depois')
    })
  const raiz = document.documentElement
  if (!document.startViewTransition || matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return concluir()
  }
  raiz.style.setProperty('--vx', `${e.clientX}px`)
  raiz.style.setProperty('--vy', `${e.clientY}px`)
  raiz.classList.add('absolvicao')
  document
    .startViewTransition(() => {
      concluir()
      scrollTo(0, 0)
    })
    .finished.finally(() => raiz.classList.remove('absolvicao'))
}

export function Confissao() {
  const estado = useEstado()
  const [luzBaixa, setLuzBaixa] = useState(false)
  const [confirmando, setConfirmando] = useState(false)
  const grupos = agrupar(estado.marcas, secoes)

  useEffect(() => {
    if (luzBaixa) document.documentElement.dataset.luz = 'baixa'
    return () => {
      delete document.documentElement.dataset.luz
    }
  }, [luzBaixa])

  return (
    <div className="pagina missal">
      <div className="cabeca">
        <h1>No confessionário</h1>
        <button className="discreto" aria-pressed={luzBaixa} onClick={() => setLuzBaixa(!luzBaixa)}>
          {luzBaixa ? 'Voltar à luz normal' : 'Usar luz baixa'}
        </button>
      </div>

      <Fala quem="Penitente">
        <p>{rito.saudacao}</p>
      </Fala>
      <Fala quem="Sacerdote">
        <p>
          <ComCruz>{rito.bencao}</ComCruz>
        </p>
      </Fala>
      <Fala quem="Penitente">
        <p>Amém.</p>
        <details className="notas">
          <summary>Confiteor, onde for costume rezá-lo</summary>
          <p>{confiteor.texto}</p>
        </details>
      </Fala>

      <Fala quem="Penitente">
        <p>
          Minha última confissão foi há{' '}
          <input
            className="em-linha"
            aria-label="Há quanto tempo foi a última confissão"
            value={estado.haQuanto}
            onChange={(e) => definir({ haQuanto: e.target.value })}
            placeholder="quanto tempo"
            autoComplete="off"
          />
          .
        </p>
      </Fala>

      <Rubrica>
        O penitente acusa-se dos seus pecados, dizendo o tipo de pecado, as circunstâncias que podem
        mudar a espécie e, se for grave, o número de vezes que o cometeu.
      </Rubrica>

      <div className="parte">
        <span className="quem">Penitente</span>
        {listaVazia(estado) ? (
          <p className="vazio">
            Ainda não há nada marcado. <a href="#/exame">Fazer o exame de consciência</a> preenche esta
            parte.
          </p>
        ) : (
          <div className="acusacao">
            {grupos.map(({ secao, itens }) => (
              <section key={secao.id}>
                <h2>
                  {secao.titulo} <a href={`#/exame/${secao.id}`}>Rever</a>
                </h2>
                <ul>
                  {itens.map(({ pergunta, marca }, i) => (
                    <li key={pergunta.id}>
                      {pergunta.grupo &&
                        pergunta.grupo !== GRUPO_MANUAL &&
                        pergunta.grupo !== itens[i - 1]?.pergunta.grupo && (
                          <p className="rubrica">{pergunta.grupo}</p>
                        )}
                      <p className="fala">{pergunta.acuso ?? pergunta.texto}</p>
                      {(marca.vezes || marca.nota) && (
                        <p className="anotado">
                          {marca.vezes && <strong>{marca.vezes}</strong>}
                          {marca.nota && <span>{marca.nota}</span>}
                        </p>
                      )}
                    </li>
                  ))}
                </ul>
              </section>
            ))}
            {estado.outros.trim() && (
              <section>
                <h2>
                  Outros pecados <a href="#/exame/outros">Rever</a>
                </h2>
                <p className="fala outros">{estado.outros}</p>
              </section>
            )}
          </div>
        )}
      </div>

      <Fala quem="Penitente">
        <p>{rito.conclusao}</p>
      </Fala>

      <Rubrica>
        O sacerdote dá os conselhos necessários, exorta o penitente à contrição e à confiança na
        misericórdia divina, e dá a penitência.
      </Rubrica>
      <div className="parte">
        <span />
        <label className="campo">
          Penitência recebida
          <input
            value={estado.penitencia}
            onChange={(e) => definir({ penitencia: e.target.value, penitenciaCumprida: false })}
            placeholder="Anotar para não esquecer"
            autoComplete="off"
          />
        </label>
      </div>

      <Rubrica>Após as palavras do padre, o penitente recita o ato de contrição.</Rubrica>
      <Fala quem="Penitente">
        <p>{atoDeContricao.texto}</p>
        <p className="rubrica">Ou:</p>
        <p>{atoDeContricaoBreve.texto}</p>
      </Fala>

      <Rubrica>
        O sacerdote recita a fórmula de absolvição. As palavras podem variar; a cada oração responde-se
        Amém.
      </Rubrica>
      <Fala quem="Sacerdote">
        {rito.absolvicao.map((oracao) => (
          <p key={oracao}>
            <ComCruz>{oracao}</ComCruz>
          </p>
        ))}
      </Fala>
      <Fala quem="Penitente">
        <p>Amém.</p>
      </Fala>
      <Fala quem="Sacerdote">
        <p>{rito.despedida}</p>
      </Fala>

      <div className="parte">
        <span />
        <div className="acoes">
          <button className="botao" onClick={() => setConfirmando(true)}>
            Recebi a absolvição
          </button>
        </div>
      </div>

      <Dialogo
        aberto={confirmando}
        aoFechar={() => setConfirmando(false)}
        titulo="Recebi a absolvição"
        acoes={
          <>
            <button
              className="botao"
              onClick={(e) => {
                setConfirmando(false)
                receberAbsolvicao(e)
              }}
            >
              Apagar a lista
            </button>
            <button className="discreto" onClick={() => setConfirmando(false)}>
              Ainda não
            </button>
          </>
        }
      >
        <p>
          A lista do exame será apagada deste aparelho e não poderá ser recuperada. Ficam a penitência
          anotada e a data de hoje.
        </p>
      </Dialogo>
    </div>
  )
}
