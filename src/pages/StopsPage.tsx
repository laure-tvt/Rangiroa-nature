import { useEffect } from 'react'
import { useReveal } from '../hooks/useReveal'
import Header from '../components/Header'
import Stops from '../components/Stops'
import Reservation from '../components/Reservation'
import Footer from '../components/Footer'

export default function StopsPage() {
  useReveal()
  useEffect(() => { window.scrollTo(0, 0) }, [])
  return (
    <div className="min-h-screen bg-black">
      <Header />
      <main>
        <Stops />
        <Reservation />
      </main>
      <Footer />
    </div>
  )
}
