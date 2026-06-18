import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'

const navLinks = [
  { label: 'Accueil', href: '#accueil' },
  { label: 'Le circuit', href: '#visites' },
  { label: 'Avis', href: '#avis' },
  { label: 'Réserver', href: '#reservation' },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleNav = (href: string) => {
    setMenuOpen(false)
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${
        scrolled ? 'py-3 shadow-lg' : 'py-5'
      }`}
      style={{ backgroundColor: scrolled ? '#0d0d0d' : 'transparent' }}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <button onClick={() => handleNav('#accueil')} className="flex items-center gap-3 group">
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold"
            style={{ backgroundColor: '#6F4F28', color: '#000000' }}
          >
            T
          </div>
          <div className="text-left">
            <div
              className="text-white font-bold leading-tight"
              style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '17px', fontWeight: 700 }}
            >
              Tevaiti Van Tours
            </div>
            <div className="text-xs tracking-widest uppercase" style={{ color: '#6F4F28', opacity: 0.9 }}>
              Rangiroa · Visites Guidées
            </div>
          </div>
        </button>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => handleNav(link.href)}
              className="nav-link text-white text-sm font-medium tracking-wide transition-colors duration-200"
              style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 500 }}
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => handleNav('#reservation')}
            className="btn-primary text-sm"
          >
            Réserver une visite
          </button>
        </nav>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-white p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div
          className="md:hidden absolute top-full left-0 right-0 py-6 px-6 flex flex-col gap-4"
          style={{ backgroundColor: '#0d0d0d' }}
        >
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => handleNav(link.href)}
              className="text-white text-base font-medium text-left py-2 border-b border-white/10"
              style={{ fontFamily: 'Montserrat, sans-serif' }}
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => handleNav('#reservation')}
            className="btn-primary mt-2 justify-center"
          >
            Réserver une visite
          </button>
        </div>
      )}
    </header>
  )
}
