import { pecadoMortal, requisitos } from '../dados/textos.ts'

export function Preparar() {
  return (
    <div className="pagina">
      <h1>Antes de se confessar</h1>

      <section>
        <h2>Pecado mortal</h2>
        <dl className="perguntas-e-respostas">
          {pecadoMortal.map((item) => (
            <div className="com-margem" key={item.pergunta}>
              <div>
                <dt>{item.pergunta}</dt>
                <dd>{item.resposta}</dd>
              </div>
              {item.nota && (
                <aside className="margem">
                  <div className="nota">
                    <p>
                      <em className="rotulo">Observação.</em> {item.nota}
                    </p>
                  </div>
                </aside>
              )}
            </div>
          ))}
        </dl>
      </section>

      <section>
        <h2>Cinco condições para uma confissão válida</h2>
        <p className="lide">
          Para que uma confissão seja válida, isto é, para que nós realmente sejamos perdoados dos nossos
          pecados, devemos preencher cinco condições.
        </p>
        <ol className="requisitos">
          {requisitos.map((r) => (
            <li className="com-margem" key={r.nome}>
              <div>
                <h3>
                  {r.nome} {r.outroNome && <span>{r.outroNome}</span>}
                </h3>
                <p>{r.texto}</p>
              </div>
              {r.nota && (
                <aside className="margem">
                  <div className="nota">
                    <p>
                      <em className="rotulo">Observação.</em> {r.nota}
                    </p>
                  </div>
                </aside>
              )}
            </li>
          ))}
        </ol>
      </section>

      <div className="acoes">
        <a className="botao" href="/exame">
          Fazer o exame de consciência
        </a>
      </div>
    </div>
  )
}
