// Pré-renderiza as rotas para HTML estático depois do `vite build`.
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { createServer } from 'vite'
import { renderToString } from 'react-dom/server'
import { createElement } from 'react'


// App toca em globais do navegador ao carregar; stubs mínimos para o servidor.
const noop = () => {}
globalThis.location = { pathname: '/', hash: '', origin: 'http://localhost' }
globalThis.document = { documentElement: { dataset: {} } }
globalThis.addEventListener = noop
globalThis.removeEventListener = noop
globalThis.matchMedia = () => ({ matches: false, addEventListener: noop, removeEventListener: noop })

const vite = await createServer({ server: { middlewareMode: true }, appType: 'custom', logLevel: 'error' })
const { App, meta } = await vite.ssrLoadModule('/src/App.tsx')
const rotas = ['', ...Object.keys(meta)]
const modelo = readFileSync('dist/index.html', 'utf8')

for (const rota of rotas) {
  location.pathname = `/${rota}`
  const html = renderToString(createElement(App))
  const [titulo, descricao] = meta[rota] ?? []
  let saida = modelo.replace(/<div id="raiz">[\s\S]*?<\/noscript>\s*<\/div>/, `<div id="raiz">${html}</div>`)
  if (titulo) {
    saida = saida
      .replace(/<title>.*?<\/title>/, `<title>${titulo} — O Hiponense</title>`)
      .replace(/(<meta\s+name="description"\s+content=")[^"]*/, `$1${descricao}`)
  }
  const url = `https://confissao.pages.dev/${rota}`
  saida = saida.replace(/(rel="canonical" href=")[^"]*/, `$1${url}`).replace(/(property="og:url" content=")[^"]*/, `$1${url}`)
  const pasta = rota ? `dist/${rota}` : 'dist'
  mkdirSync(pasta, { recursive: true })
  writeFileSync(`${pasta}/index.html`, saida)
}
const urls = rotas.map((r) => `  <url><loc>https://confissao.pages.dev/${r}</loc></url>`)
writeFileSync(
  'dist/sitemap.xml',
  [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...urls,
    '</urlset>',
    '',
  ].join(String.fromCharCode(10)),
)
await vite.close()
console.log(`prerender: ${rotas.length} rotas`)
