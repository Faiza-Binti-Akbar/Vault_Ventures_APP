import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles.css'

function App() {
  return (
    <main className="page-shell">
      <section className="status-card" aria-labelledby="page-title">
        <p className="brand">Vault Ventures</p>
        <h1 id="page-title">Admin Dashboard</h1>
        <p className="status">Foundation Ready</p>
      </section>
    </main>
  )
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
