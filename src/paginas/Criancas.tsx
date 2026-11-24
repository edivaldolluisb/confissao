import { Prece } from '../comum.tsx'
import { atoDeContricaoBreve } from '../dados/textos.ts'

// ponytail: texto próprio, por rever pastoralmente antes de divulgar. Sem estado guardado.
const temas = [
  {
    titulo: 'Com Deus',
    perguntas: [
      'Rezei de manhã e à noite, ou me esqueci?',
      'Fui à missa aos domingos? Portei-me bem na igreja?',
      'Falei o nome de Deus sem respeito, ou fiz pouco das coisas de Deus?',
    ],
  },
  {
    titulo: 'Com a minha família',
    perguntas: [
      'Obedeci ao pai e à mãe, ou respondi mal?',
      'Briguei com meus irmãos? Fui egoísta com eles?',
      'Ajudei em casa, ou fiz só o que queria?',
    ],
  },
  {
    titulo: 'Na escola e com os amigos',
    perguntas: [
      'Fui atento na aula e fiz os deveres?',
      'Bati, empurrei ou chamei nomes feios a alguém?',
      'Deixei alguém de lado ou fiz troça de um colega?',
      'Tirei algo que não era meu, ou estraguei coisas dos outros?',
    ],
  },
  {
    titulo: 'Com a verdade',
    perguntas: [
      'Menti? Enganei os meus pais ou os professores?',
      'Colei numa prova ou fiz batota num jogo?',
      'Contei mexericos que magoaram alguém?',
    ],
  },
  {
    titulo: 'Comigo mesmo',
    perguntas: [
      'Fui guloso, preguiçoso ou fiquei horas na televisão ou no telemóvel?',
      'Fiquei zangado e fiz birra quando não me deram o que eu queria?',
      'Vi ou fiz algo que sabia que não devia?',
    ],
  },
]

export function Criancas() {
  return (
    <div className="pagina">
      <h1>Exame de consciência para crianças</h1>
      <p className="lide">
        Para quem se prepara para a primeira confissão ou se confessa com frequência. Deus é um Pai que
        perdoa sempre: não precisa ter medo.
      </p>

      <section>
        <h2>Para os pais e catequistas</h2>
        <p>
          Leia as perguntas com a criança, devagar, e deixe que ela responda com as suas palavras. Basta
          que se lembre dos pecados mais sérios; não é preciso encontrar muitos. Se ela não sabe se
          pecou, diga-lhe que Deus conhece o coração e que o padre vai ajudar. Depois da confissão,
          celebre: o perdão é uma alegria.
        </p>
      </section>

      <section>
        <h2>Antes de começar</h2>
        <p>Peça a Jesus que o ajude a lembrar-se do que fez e a ter coragem de o dizer.</p>
      </section>

      {temas.map((t) => (
        <section key={t.titulo}>
          <h2>{t.titulo}</h2>
          <ul className="revisao">
            {t.perguntas.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
        </section>
      ))}

      <section>
        <h2>Pedir perdão</h2>
        <p>Depois de falar com o padre, reze:</p>
        <Prece oracao={atoDeContricaoBreve} titulo={false} />
      </section>

      <div className="acoes">
        <a href="/confissao">Ver o que dizer ao padre</a>
      </div>
    </div>
  )
}
