import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useReveal } from '../hooks/useReveal'
import Header from '../components/Header'
import Stops from '../components/Stops'
import Footer from '../components/Footer'

export default function StopsPage() {
  useReveal()
  useEffect(() => { window.scrollTo(0, 0) }, [])
  return (
    <div className="min-h-screen bg-black">
      <Header />
      <main>
        <Stops />
        <section className="py-20 px-6 text-center" style={{ backgroundColor: '#000000' }}>
          <Link
            to="/#contact"
            onClick={() => setTimeout(() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }), 100)}
            className="btn-primary px-10 py-4 text-base font-bold"
            style={{ textDecoration: 'none', borderRadius: '50px' }}
          >
            Réserver ma visite guidée
          </Link>
        </section>
      </main>
      <Footer />
    </div>
  )
}
