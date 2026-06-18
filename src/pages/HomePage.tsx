import { useReveal } from '../hooks/useReveal'
import Header from '../components/Header'
import Hero from '../components/Hero'
import ValueProp from '../components/ValueProp'
import Tours from '../components/Tours'
import Reservation from '../components/Reservation'
import Footer from '../components/Footer'

export default function HomePage() {
  useReveal()
  return (
    <div className="min-h-screen bg-black">
      <Header />
      <main>
        <Hero />
        <ValueProp />
        <Tours />
        <Reservation />
      </main>
      <Footer />
    </div>
  )
}
