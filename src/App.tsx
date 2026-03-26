import './App.css'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { Services } from './components/Services'
import { StackedServices } from './components/StackedServices'
import { Gallery } from './components/Gallery'
import { FAQ } from './components/FAQ'
import { Footer } from './components/Footer'

function App() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-[#fff9f5] via-white to-[#fdf4f0]">
      <Header />
      <Hero />
      <Services />
      <StackedServices />
      <Gallery />
      <FAQ />
      <Footer />
    </main>
  )
}

export default App