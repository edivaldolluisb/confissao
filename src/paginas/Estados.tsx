import { secoes } from '../dados/exame.ts'

// Reaproveita os grupos do 4º mandamento da lista de 2013 (pais, filhos, casados, empregados...),
// sem repetir os textos. Só os itens da lista (nível 3), não os do Manual de Confissão.
const grupos = new Map<string, { texto: string; nota?: string }[]>()
for (const p of secoes.find((s) => s.id === 'm4')!.perguntas) {
  if (p.nivel !== 3 || !p.grupo) continue
  grupos.set(p.grupo, [...(grupos.get(p.grupo) ?? []), { texto: p.texto, nota: p.notas?.[0]?.texto }])
}

export function Estados() {
  return (
    <div className="pagina">
      <h1>Exame pelos deveres do próprio estado</h1>
      <p className="lide">
        Cada um tem deveres próprios, conforme a sua situação: pai ou mãe, filho, casado, empregado,
        estudante. Escolha os grupos que lhe dizem respeito. Faz parte do 4º mandamento do{' '}
        <a href="/exame">exame completo</a>.
      </p>

      {[...grupos].map(([nome, itens]) => (
        <section key={nome}>
          <h2>{nome}</h2>
          <ul className="revisao">
            {itens.map((i) => (
              <li key={i.texto}>
                {i.texto}
                {i.nota && <span className="fonte"> ({i.nota})</span>}
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  )
}
