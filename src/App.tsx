import { useEffect } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import ValueProp from './components/ValueProp'
import Tours from './components/Tours'
import BoatTour from './components/BoatTour'
import Testimonials from './components/Testimonials'
import Reservation from './components/Reservation'
import Footer from './components/Footer'

export default function App() {
  useEffect(() => {
    const els = document.querySelectorAll('[data-reveal]')
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement
            const delay = parseInt(el.dataset.delay ?? '0', 10)
            setTimeout(() => el.classList.add('is-visible'), delay)
            obs.unobserve(el)
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    )
    els.forEach((el) => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  return (
    <div className="min-h-screen bg-black">
      <Header />
      <main>
        <Hero />
        <ValueProp />
        <Tours />
        <BoatTour />
        <Testimonials />
        <Reservation />
      </main>
      <Footer />
    </div>
  )
}
