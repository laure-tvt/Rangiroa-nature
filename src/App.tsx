import Header from './components/Header'
import Hero from './components/Hero'
import ValueProp from './components/ValueProp'
import Tours from './components/Tours'
import Testimonials from './components/Testimonials'
import BoatTour from './components/BoatTour'
import Reservation from './components/Reservation'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
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
