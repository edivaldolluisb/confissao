import { capitais, perguntasDe } from '../dados/capitais.ts'

export function Capitais() {
  return (
    <div className="pagina">
      <h1>Exame pelos sete pecados capitais</h1>
      <p className="lide">
        Os sete pecados capitais são as raízes de muitos outros. Examinar-se por eles ajuda a ver o que
        move os nossos atos, além de cada falta isolada. As perguntas são as do{' '}
        <a href="/exame">exame completo</a>, agrupadas por vício; o exame por mandamentos continua a ser
        o mais completo.
      </p>

      {capitais.map((c) => (
        <section key={c.nome}>
          <h2>{c.nome}</h2>
          <p className="fonte">Virtude contrária: {c.virtude}</p>
          <ul className="revisao">
            {perguntasDe(c).map((p) => (
              <li key={p.id}>
                {p.texto}
                {p.nivel === 3 && p.notas?.[0] && <span className="fonte"> ({p.notas[0].texto})</span>}
              </li>
            ))}
          </ul>
        </section>
      ))}

      <div className="acoes">
        <a href="/confissao">Ver o que dizer ao padre</a>
      </div>
    </div>
  )
}
