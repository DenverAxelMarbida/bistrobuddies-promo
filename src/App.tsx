import { useEffect } from 'react'
import { Header } from './components/Header/Header'
import { PageShell } from './components/PageShell/PageShell'
import { Footer } from './components/Footer/Footer'

function App() {
  useEffect(() => {
    const fragment = window.location.hash.slice(1)
    if (!fragment) return

    let id: string
    try {
      id = decodeURIComponent(fragment)
    } catch {
      return
    }

    const target = document.getElementById(id)
    if (!target) return

    let cancelled = false
    const scrollToTarget = () => {
      if (cancelled) return
      const root = document.documentElement
      const previousBehavior = root.style.scrollBehavior
      root.style.scrollBehavior = 'auto'
      target.scrollIntoView({ block: 'start' })
      root.style.scrollBehavior = previousBehavior
    }
    const frame = window.requestAnimationFrame(scrollToTarget)
    const settled = window.setTimeout(scrollToTarget, 350)
    void document.fonts.ready.then(scrollToTarget)

    return () => {
      cancelled = true
      window.cancelAnimationFrame(frame)
      window.clearTimeout(settled)
    }
  }, [])

  return (
    <>
      <div id="top" />
      <a className="skip-link" href="#main-content">Skip to content</a>
      <Header />
      <PageShell />
      <Footer />
    </>
  )
}

export default App
