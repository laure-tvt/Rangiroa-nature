import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'

const navLinks = [
  { label: 'Accueil', href: '#accueil' },
  { label: 'Visites', href: '#visites' },
  { label: 'À propos', href: '#apropos' },
  { label: 'Contact', href: '#contact' },
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
        scrolled
          ? 'py-3 shadow-lg'
          : 'py-5'
      }`}
      style={{
        backgroundColor: scrolled ? '#3D2817' : 'transparent',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => handleNav('#accueil')}
          className="flex items-center gap-3 group"
        >
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center text-white text-lg font-bold transition-all duration-300"
            style={{ backgroundColor: '#D4AF37' }}
          >
            R
          </div>
          <div className="text-left">
            <div
              className="text-white font-bold leading-tight transition-all duration-300"
              style={{
                fontFamily: 'Playfair Display, serif',
                fontSize: scrolled ? '16px' : '18px',
              }}
            >
              Rangiroa Nature
            </div>
            <div className="text-xs tracking-widest uppercase" style={{ color: '#D4AF37', opacity: 0.9 }}>
              Visites Guidées
            </div>
          </div>
        </button>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => handleNav(link.href)}
              className="nav-link text-white text-sm font-medium tracking-wide transition-colors duration-200 hover:opacity-90"
              style={{ fontFamily: 'Inter, sans-serif' }}
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
          style={{ backgroundColor: '#3D2817' }}
        >
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => handleNav(link.href)}
              className="text-white text-base font-medium text-left py-2 border-b border-white/10"
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
