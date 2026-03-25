import './App.css'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { Services } from './components/Services'

function App() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-[#fff9f5] via-white to-[#fdf4f0]">
      <Header />
      <Hero />
      <Services />
    </main>
  )
}

export default App