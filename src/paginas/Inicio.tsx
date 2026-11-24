import type { PointerEvent } from 'react'
import manualPdf from '../../confissao/manual-de-confissao-ppr.pdf?url'
import { dataPorExtenso } from '../comum.tsx'
import { contarItens, tipos } from '../dados/exame.ts'
import { citacaoSales, rito } from '../dados/textos.ts'
import { definir, useEstado } from '../estado.ts'
import { emGraca, listaVazia } from '../logica.ts'

// A luz por trás da grade acompanha o ponteiro.
function moverLuz(e: PointerEvent<HTMLElement>) {
  const r = e.currentTarget.getBoundingClientRect()
  e.currentTarget.style.setProperty('--lx', `${e.clientX - r.left}px`)
  e.currentTarget.style.setProperty('--ly', `${e.clientY - r.top}px`)
}

// Escolher o tipo de exame já leva ao exame.
function Escolha({ rotulo }: { rotulo: string }) {
  return (
    <div className="comecar">
      <p id="comecar">{rotulo}</p>
      <nav className="escolha" aria-labelledby="comecar">
        {tipos.map((t) => (
          <a className="botao" href="/exame" key={t.nivel} onClick={() => definir({ tipo: t.nivel })}>
            {t.nome}
            <small>
              {contarItens(t.nivel)} {t.unidade}
            </small>
          </a>
        ))}
      </nav>
    </div>
  )
}

export function Inicio() {
  const estado = useEstado()
  const graca = emGraca(estado)
  const emCurso = !listaVazia(estado)
  const [primeira, ...resto] = rito.saudacao.split(' ') // "Abençoai-me," não quebra no hífen

  return (
    <>
      <section className="portal" onPointerMove={moverLuz}>
        <div className="grade" aria-hidden="true" />
        <div className="portal-texto">
          {graca ? (
            <>
              <h1>{rito.despedida}</h1>
              <p>
                Última confissão registrada neste aparelho: {dataPorExtenso(estado.absolvidoEm!)}.
                {estado.penitencia && !estado.penitenciaCumprida && ' Há uma penitência por cumprir.'}
              </p>
              <div className="acoes">
                <a className="botao" href="/depois">
                  Rezar a oração de depois
                </a>
              </div>
              <Escolha rotulo="Começar um novo exame de consciência" />
            </>
          ) : (
            <>
              <h1>
                <span className="junto">{primeira}</span> {resto.join(' ')}
              </h1>
              <p>
                São as primeiras palavras de quem se confessa. Este guia ajuda a chegar até elas com a
                consciência examinada e sem medo de esquecer o que dizer.
              </p>
              {emCurso ? (
                <div className="acoes">
                  <a className="botao" href="/exame">
                    Continuar o exame de consciência
                  </a>
                  <a href="/confissao">Ver o que dizer ao sacerdote</a>
                </div>
              ) : (
                <>
                  <Escolha rotulo="Começar o exame de consciência" />
                  <a href="/confissao">Ver o que dizer ao sacerdote</a>
                </>
              )}
            </>
          )}
        </div>
      </section>

      <section className="faixa">
        <h2>Da preparação à ação de graças</h2>
        <ol className="caminho">
          <li>
            <h3>
              <a href="/preparar">Preparar</a>
            </h3>
            <p>O que é pecado mortal e as cinco condições para uma confissão válida.</p>
          </li>
          <li>
            <h3>
              <a href="/exame">Examinar</a>
            </h3>
            <p>
              Mandamento por mandamento, em três tamanhos: rápido, médio ou completo. Marcar o que
              for preciso e anotar quantas vezes.
            </p>
          </li>
          <li>
            <h3>
              <a href="/confissao">Confessar</a>
            </h3>
            <p>
              As palavras do rito com a lista do exame no lugar certo, para ler no confessionário com a
              tela em luz baixa.
            </p>
          </li>
          <li>
            <h3>
              <a href="/depois">Agradecer</a>
            </h3>
            <p>Recebida a absolvição, a lista é apagada. Ficam a oração e a penitência anotada.</p>
          </li>
        </ol>
      </section>

      <section className="faixa">
        <h2>Outros exames</h2>
        <ul className="caminho outros">
          <li>
            <h3>
              <a href="/diario">Exame diário</a>
            </h3>
            <p>Cinco minutos ao fim do dia, antes de dormir.</p>
          </li>
          <li>
            <h3>
              <a href="/capitais">Pecados capitais</a>
            </h3>
            <p>As perguntas do exame agrupadas por soberba, avareza, luxúria, inveja, gula, ira e preguiça.</p>
          </li>
          <li>
            <h3>
              <a href="/estados">Deveres do estado</a>
            </h3>
            <p>Pais, filhos, casados, empregados, professores e estudantes.</p>
          </li>
          <li>
            <h3>
              <a href="/criancas">Para crianças</a>
            </h3>
            <p>Perguntas simples para a primeira confissão, com orientação para os pais.</p>
          </li>
        </ul>
      </section>

      <section className="faixa">
        <h2>Manual de Confissão</h2>
        <p className="lide">
          Material fornecido pelo Padre Paulo Ricardo. As perguntas deste guia vêm, em grande parte,
          deste manual. Baixe-o para ler com calma, imprimir ou levar consigo.
        </p>
        <div className="acoes">
          <a className="botao" href={manualPdf} download="manual-de-confissao.pdf">
            Baixar o Manual de Confissão (PDF)
          </a>
        </div>
      </section>

      <section className="faixa">
        <blockquote className="citacao">
          <p>{citacaoSales.texto}</p>
          <footer>{citacaoSales.autor}</footer>
        </blockquote>
      </section>

      <section className="faixa duas-colunas">
        <div>
          <h2>Só neste aparelho</h2>
          <p>
            O que for marcado no exame fica guardado apenas no navegador deste aparelho. Nada é enviado,
            não há conta, não há estatísticas. Quem preferir pode desligar até esse registro local.
          </p>
        </div>
        <div>
          <h2>Não é confissão pela internet</h2>
          <p>
            O perdão dos pecados é dado pelo sacerdote, em pessoa, no sacramento. Este guia serve para
            examinar a consciência antes e acompanhar as palavras durante.
          </p>
        </div>
      </section>
    </>
  )
}
