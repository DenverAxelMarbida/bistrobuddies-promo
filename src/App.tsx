import { Header } from './components/Header/Header'
import { PageShell } from './components/PageShell/PageShell'
import { Footer } from './components/Footer/Footer'

function App() {
  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <Header />
      <PageShell />
      <Footer />
    </>
  )
}

export default App
