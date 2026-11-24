import { Prece } from '../comum.tsx'
import { atoDeContricaoBreve, oracaoAntesDoExame } from '../dados/textos.ts'

// Cinco momentos do exame particular, como o propõe Santo Inácio de Loyola nos Exercícios Espirituais.
const revisao = [
  'Rezei hoje? Lembrei-me de Deus ou só o procurei quando precisei?',
  'Fui paciente e caridoso com quem vive e trabalha comigo? Que palavras minhas magoaram?',
  'Cumpri os meus deveres, em casa, no estudo ou no trabalho, ou deixei para depois por preguiça?',
  'Como usei o tempo, o telemóvel e a internet? Houve algo que não devia ter visto, lido ou dito?',
  'Fui sincero, ou menti, exagerei, falei mal de alguém?',
  'Deixei-me levar pela gula, pela vaidade, pelo mau humor, por maus pensamentos?',
  'E o bem que pude fazer e deixei por fazer?',
]

export function Diario() {
  return (
    <div className="pagina">
      <h1>Exame de consciência diário</h1>
      <p className="lide">
        Cinco minutos ao fim do dia, antes de dormir. Não substitui a confissão: serve para ver o dia com
        Deus, pedir perdão e recomeçar amanhã.
      </p>

      <ol className="requisitos">
        <li>
          <div>
            <h3>Agradecer</h3>
            <p>Recorde os dons do dia, grandes ou pequenos, e agradeça a Deus por cada um.</p>
          </div>
        </li>
        <li>
          <div>
            <h3>Pedir luz</h3>
            <p>Peça ao Espírito Santo que lhe mostre o dia como Deus o viu, sem se justificar nem se desculpar.</p>
            <Prece oracao={oracaoAntesDoExame} titulo={false} />
          </div>
        </li>
        <li>
          <div>
            <h3>Rever o dia</h3>
            <p>Passe pelas horas, da manhã até agora. Algumas perguntas ajudam:</p>
            <ul className="revisao">
              {revisao.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
            <p>
              Se encontrou um pecado grave, reserve-o para a confissão. O{' '}
              <a href="/exame">exame completo</a> ajuda a prepará-la.
            </p>
          </div>
        </li>
        <li>
          <div>
            <h3>Pedir perdão</h3>
            <p>Diga a Deus o que lamenta, com simplicidade, e reze o ato de contrição.</p>
            <Prece oracao={atoDeContricaoBreve} titulo={false} />
          </div>
        </li>
        <li>
          <div>
            <h3>Propor para amanhã</h3>
            <p>Escolha uma coisa concreta para fazer melhor amanhã e entregue o dia a Deus.</p>
          </div>
        </li>
      </ol>

      <div className="acoes">
        <a href="/criancas">Exame de consciência para crianças</a>
      </div>
    </div>
  )
}
