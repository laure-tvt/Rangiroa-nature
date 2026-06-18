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
        scrolled ? 'py-3' : 'py-5'
      }`}
      style={{
        backgroundColor: scrolled ? 'rgba(10,10,10,0.96)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(139,107,66,0.12)' : 'none',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">

        {/* Wordmark — style FIND */}
        <button
          onClick={() => handleNav('#accueil')}
          style={{
            fontFamily: 'Montserrat, sans-serif',
            fontWeight: 900,
            fontSize: 'clamp(15px, 1.6vw, 18px)',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: '#ffffff',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: 0,
            lineHeight: 1.1,
          }}
        >
          <span style={{ color: '#8B6B42' }}>Tevaiti</span>
          {' '}
          <span style={{ color: 'rgba(255,255,255,0.9)' }}>Van Tours</span>
        </button>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => handleNav(link.href)}
              className="nav-link text-sm font-medium tracking-wide transition-colors duration-200"
              style={{
                fontFamily: 'Montserrat, sans-serif',
                fontWeight: 500,
                color: 'rgba(255,255,255,0.8)',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              {link.label}
            </button>
          ))}

          {/* CTA pill — style FIND "Sign in" */}
          <button
            onClick={() => handleNav('#reservation')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              backgroundColor: '#8B6B42',
              color: '#000000',
              border: 'none',
              padding: '10px 24px',
              borderRadius: '50px',
              fontFamily: 'Montserrat, sans-serif',
              fontWeight: 700,
              fontSize: '13px',
              letterSpacing: '0.02em',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={e =>
              ((e.currentTarget as HTMLButtonElement).style.backgroundColor = '#ffffff')
            }
            onMouseLeave={e =>
              ((e.currentTarget as HTMLButtonElement).style.backgroundColor = '#8B6B42')
            }
          >
            Réserver
          </button>
        </nav>

        {/* Mobile menu button */}
        <button
          className="md:hidden p-2"
          style={{ color: '#ffffff', background: 'none', border: 'none', cursor: 'pointer' }}
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
          style={{
            backgroundColor: 'rgba(10,10,10,0.97)',
            backdropFilter: 'blur(12px)',
            borderBottom: '1px solid rgba(139,107,66,0.15)',
          }}
        >
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => handleNav(link.href)}
              className="text-base font-medium text-left py-2 border-b"
              style={{
                fontFamily: 'Montserrat, sans-serif',
                color: '#ffffff',
                borderColor: 'rgba(255,255,255,0.08)',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => handleNav('#reservation')}
            style={{
              marginTop: '8px',
              backgroundColor: '#8B6B42',
              color: '#000000',
              border: 'none',
              padding: '12px 24px',
              borderRadius: '50px',
              fontFamily: 'Montserrat, sans-serif',
              fontWeight: 700,
              fontSize: '14px',
              cursor: 'pointer',
            }}
          >
            Réserver une visite
          </button>
        </div>
      )}
    </header>
  )
}
