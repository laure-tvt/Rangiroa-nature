import Header from './components/Header'
import Hero from './components/Hero'
import Tours from './components/Tours'
import About from './components/About'
import Reservation from './components/Reservation'
import Contact from './components/Contact'
import Footer from './components/Footer'
import ScrollProgress from './components/ScrollProgress'

export default function App() {
  return (
    <div className="min-h-screen">
      <ScrollProgress />
      <Header />
      <main>
        <Hero />
        <Tours />
        <About />
        <Reservation />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
