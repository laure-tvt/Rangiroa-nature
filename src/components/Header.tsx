import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import { Link, useNavigate, useLocation } from 'react-router-dom'

const navLinks = [
  { label: 'Le tour',      href: '/', hash: '#visite' },
  { label: 'Le circuit', href: '/arrets', hash: '' },
  { label: 'À propos',     href: '/a-propos', hash: '' },
  { label: 'Tarifs',       href: '/tarifs', hash: '' },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleNav = (href: string, hash: string) => {
    setMenuOpen(false)
    if (hash) {
      if (location.pathname === href) {
        const el = document.querySelector(hash)
        if (el) el.scrollIntoView({ behavior: 'smooth' })
      } else {
        navigate(href)
        setTimeout(() => {
          const el = document.querySelector(hash)
          if (el) el.scrollIntoView({ behavior: 'smooth' })
        }, 300)
      }
    } else {
      navigate(href)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        backgroundColor: scrolled ? 'rgba(0,0,0,0.97)' : 'transparent',
        backdropFilter: scrolled ? 'blur(14px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(14px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(111,79,40,0.18)' : 'none',
        padding: scrolled ? '14px 0' : '22px 0',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px' }}
        >
          <img src="/logo-icon.png" alt="TVT logo" style={{ height: '36px', width: 'auto', display: 'block' }} />
          <span style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 700, fontSize: '26px', letterSpacing: '0.12em', color: '#C8894A', textTransform: 'uppercase' }}>TVT</span>
          <span style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: '20px', letterSpacing: '0.2em', color: 'rgba(255,255,255,0.85)', textTransform: 'uppercase' }}>RANGIROA</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-7">
          {navLinks.map((link) => (
            <button key={link.label} onClick={() => handleNav(link.href, link.hash)} className="nav-link">
              {link.label}
            </button>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-3">
          <button onClick={() => handleNav('/', '#contact')} className="btn-primary">
            Réserver
          </button>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-2"
          style={{ color: '#ffffff', background: 'none', border: 'none', cursor: 'pointer' }}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          className="md:hidden absolute top-full left-0 right-0 py-6 px-6 flex flex-col gap-1"
          style={{ backgroundColor: 'rgba(0,0,0,0.98)', borderBottom: '1px solid rgba(111,79,40,0.18)' }}
        >
          {navLinks.map((link) => (
            <button key={link.label} onClick={() => handleNav(link.href, link.hash)}
              className="text-left py-3 text-base font-medium"
              style={{ color: 'rgba(255,255,255,0.8)', background: 'none', border: 'none', borderBottom: '1px solid rgba(255,255,255,0.05)', cursor: 'pointer', fontFamily: 'Montserrat, sans-serif' }}>
              {link.label}
            </button>
          ))}
          <div className="mt-4">
            <button onClick={() => handleNav('/', '#contact')} className="btn-primary w-full justify-center">Réserver</button>
          </div>
        </div>
      )}
    </header>
  )
}
