import { dataPorExtenso, Prece } from '../comum.tsx'
import { oracaoDepois, requisitos, rito } from '../dados/textos.ts'
import { definir, useEstado } from '../estado.ts'

export function Depois() {
  const estado = useEstado()
  return (
    <div className="pagina">
      <h1>{rito.despedida}</h1>
      {estado.absolvidoEm && (
        <p className="lide">
          Confissão de {dataPorExtenso(estado.absolvidoEm)}. A lista do exame foi apagada deste aparelho.
        </p>
      )}

      <section className="com-margem">
        <div>
          <h2>Penitência</h2>
          {estado.penitencia && (
            <label className="marcar simples">
              <input
                type="checkbox"
                checked={estado.penitenciaCumprida}
                onChange={(e) => definir({ penitenciaCumprida: e.target.checked })}
              />
              <span>
                {estado.penitencia}
                <small>{estado.penitenciaCumprida ? 'Cumprida' : 'Marcar quando estiver cumprida'}</small>
              </span>
            </label>
          )}
          <label className="campo">
            {estado.penitencia ? 'Corrigir a anotação' : 'Penitência recebida'}
            <input
              value={estado.penitencia}
              onChange={(e) => definir({ penitencia: e.target.value, penitenciaCumprida: false })}
              placeholder="Anotar para não esquecer"
              autoComplete="off"
            />
          </label>
        </div>
        <aside className="margem">
          <div className="nota">
            <p>
              <em className="rotulo">Observação.</em> {requisitos[4].nota}
            </p>
          </div>
        </aside>
      </section>

      <section>
        <p className="rubrica">Depois de sair do confessionário.</p>
        <Prece oracao={oracaoDepois} />
      </section>

      <div className="acoes">
        <a className="botao" href="#/">
          Voltar ao início
        </a>
      </div>
    </div>
  )
}
