import assert from 'node:assert/strict'
import test from 'node:test'
import { achar, capitais } from './dados/capitais.ts'

test('todo começo de pecado capital acha ao menos uma pergunta do exame', () => {
  for (const c of capitais)
    for (const comeco of c.comecos) assert.ok(achar(comeco).length > 0, `${c.nome}: "${comeco}" não acha nada`)
})
