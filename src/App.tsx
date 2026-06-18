import { useEffect } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import ClipReveal from './components/ClipReveal'
import ValueProp from './components/ValueProp'
import Tours from './components/Tours'
import Testimonials from './components/Testimonials'
import BoatTour from './components/BoatTour'
import Reservation from './components/Reservation'
import Footer from './components/Footer'

export default function App() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -50px 0px' }
    )

    const revealEls = document.querySelectorAll('.reveal')
    revealEls.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <ClipReveal />
        <ValueProp />
        <Tours />
        <Testimonials />
        <BoatTour />
        <Reservation />
      </main>
      <Footer />
    </div>
  )
}
