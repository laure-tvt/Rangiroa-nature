import { useEffect } from 'react'
import { useReveal } from '../hooks/useReveal'
import Header from '../components/Header'
import About from '../components/About'
import Footer from '../components/Footer'

export default function AboutPage() {
  useReveal()
  useEffect(() => { window.scrollTo(0, 0) }, [])
  return (
    <div className="min-h-screen bg-black">
      <Header />
      <main>
        <About />
      </main>
      <Footer />
    </div>
  )
}
