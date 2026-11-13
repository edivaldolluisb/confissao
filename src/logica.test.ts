import assert from 'node:assert/strict'
import test from 'node:test'
import { contarItens, secoes } from './dados/exame.ts'
import { RAPIDO, manual } from './dados/manual.ts'
import { absolver, agrupar, emGraca, inicial, listaVazia } from './logica.ts'

test('ids das perguntas são únicos', () => {
  const ids = secoes.flatMap((s) => s.perguntas.map((p) => p.id))
  assert.equal(new Set(ids).size, ids.length)
})

test('os três tipos de exame: todas as seções têm perguntas em qualquer um', () => {
  for (const s of secoes) assert.ok(s.perguntas.some((p) => p.nivel === 1), s.id)
  assert.ok(contarItens(1) < contarItens(2) && contarItens(2) < contarItens(3))
})

test('cada entrada de RAPIDO aponta para exatamente uma pergunta do manual', () => {
  const textos = Object.values(manual)
    .flat()
    .flatMap((e) => (typeof e === 'object' && 'texto' in e ? [e.texto] : []))
  for (const inicio of RAPIDO) {
    assert.equal(textos.filter((t) => t.startsWith(inicio)).length, 1, inicio)
  }
  assert.equal(contarItens(1), RAPIDO.length)
})

test('agrupar segue a ordem do exame e ignora ids desconhecidos', () => {
  const m = { vezes: '', nota: '' }
  const grupos = agrupar({ 'm8-1': m, 'm1-2': m, 'm1-1': m, fantasma: m }, secoes)
  assert.deepEqual(
    grupos.map((g) => [g.secao.id, g.itens.map((i) => i.pergunta.id)]),
    [
      ['m1', ['m1-1', 'm1-2']],
      ['m8', ['m8-1']],
    ],
  )
})

test('absolver apaga a lista, guarda a data e mantém a penitência', () => {
  const antes = {
    ...inicial,
    marcas: { 'm1-1': { vezes: '3', nota: '' } },
    outros: 'x',
    penitencia: 'Um terço',
  }
  assert.equal(emGraca(antes), false)
  const depois = absolver(antes, '2026-11-13')
  assert.ok(listaVazia(depois))
  assert.ok(emGraca(depois))
  assert.equal(depois.absolvidoEm, '2026-11-13')
  assert.equal(depois.penitencia, 'Um terço')
  // marcar de novo sai do estado de graça
  assert.equal(emGraca({ ...depois, outros: 'algo' }), false)
})
