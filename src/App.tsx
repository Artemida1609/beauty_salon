import './App.css'
import { memo } from "react";
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { StackedServices } from './components/StackedServices'
import { Gallery } from './components/Gallery'
import { Testimonials } from './components/Testimonials'
import { Team } from './components/Team'
import { FAQ } from './components/FAQ'
import { Footer } from './components/Footer'
import { BookingModal } from './components/BookingModal'
import { useBookingModal } from './hooks/useBookingModal'

const App = memo(() => {
  const { isOpen, open, close } = useBookingModal();

  return (
    <>
      <main className="min-h-screen bg-gradient-to-br from-[#fff9f5] via-white to-[#fdf4f0]">
        <Header onBookClick={open} />
        <Hero onBookClick={open} />
        <StackedServices />
        <Gallery />
        <Testimonials />
        <Team />
        <FAQ />
        <Footer onBookClick={open} />
      </main>
      <BookingModal isOpen={isOpen} onClose={close} />
    </>
  )
})

App.displayName = "App";
export default App;