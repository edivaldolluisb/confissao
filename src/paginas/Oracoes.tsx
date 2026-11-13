import { Prece } from '../comum.tsx'
import { oracoes } from '../dados/textos.ts'

export function Oracoes() {
  return (
    <div className="pagina">
      <h1>Orações</h1>
      <p className="lide">As que acompanham a confissão, na ordem em que são rezadas.</p>
      {oracoes.map((o) => (
        <Prece key={o.id} oracao={o} />
      ))}
    </div>
  )
}
