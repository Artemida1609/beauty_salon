import './App.css'
import { Header } from './components/Header'
import { Hero } from './components/Hero'

function App() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-[#fff9f5] via-white to-[#fdf4f0]">
      <Header />
      <Hero />
    </main>
  )
}

export default App