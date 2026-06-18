import { useEffect } from 'react'
import { useReveal } from '../hooks/useReveal'
import Header from '../components/Header'
import BoatTour from '../components/BoatTour'
import Reservation from '../components/Reservation'
import Footer from '../components/Footer'

export default function PricingPage() {
  useReveal()
  useEffect(() => { window.scrollTo(0, 0) }, [])
  return (
    <div className="min-h-screen bg-black">
      <Header />
      <main>
        <BoatTour />
        <Reservation />
      </main>
      <Footer />
    </div>
  )
}
