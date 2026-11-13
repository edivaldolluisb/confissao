import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource-variable/brygada-1918/wght.css'
import '@fontsource-variable/brygada-1918/wght-italic.css'
import '@fontsource-variable/hanken-grotesk/wght.css'
import './estilo.css'
import { App } from './App.tsx'

createRoot(document.getElementById('raiz')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
