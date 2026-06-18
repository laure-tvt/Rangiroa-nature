import { useState } from 'react'
import { Search, MapPin, ChevronDown } from 'lucide-react'

const propertyTypes = ['Tous types', 'Villa', 'Maison', 'Appartement', 'Bungalow', 'Terrain']
const budgets = ['Tous budgets', '< 20M XPF', '20–50M XPF', '50–100M XPF', '100M+ XPF']

export default function Hero() {
  const [type, setType] = useState('Tous types')
  const [budget, setBudget] = useState('Tous budgets')
  const [location, setLocation] = useState('')
  const [tab, setTab] = useState<'acheter' | 'louer'>('acheter')

  const scrollToListings = () => {
    const el = document.querySelector('#biens')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="accueil"
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url('https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=1920&q=85')` }}
      />
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(135deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.55) 55%, rgba(0,0,0,0.75) 100%)' }}
      />

      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 pt-32 pb-24 text-center">

        {/* Badge */}
        <div
          className="anim-1 inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase"
          style={{ border: '1px solid rgba(111,79,40,0.5)', color: '#6F4F28', backgroundColor: 'rgba(0,0,0,0.3)', backdropFilter: 'blur(6px)' }}
        >
          <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: '#6F4F28' }} />
          Polynésie française · Premier portail immobilier
        </div>

        {/* Title */}
        <h1
          className="anim-2"
          style={{
            fontFamily: 'Montserrat, sans-serif',
            fontSize: 'clamp(38px, 6.5vw, 88px)',
            fontWeight: 900,
            lineHeight: 1.0,
            letterSpacing: '-0.01em',
            marginBottom: '20px',
          }}
        >
          <span style={{ color: '#ffffff' }}>Trouvez votre bien</span>
          <br />
          <span style={{ color: '#6F4F28' }}>idéal en Polynésie</span>
        </h1>

        <p
          className="anim-3 mb-10 max-w-xl mx-auto"
          style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 'clamp(14px, 1.5vw, 17px)', fontWeight: 400, lineHeight: 1.65, color: 'rgba(255,255,255,0.65)' }}
        >
          Des milliers de biens à vendre et à louer à Tahiti, Moorea, Bora Bora, Rangiroa et dans tout l'archipel.
        </p>

        {/* Search card */}
        <div
          className="anim-4 rounded-2xl overflow-hidden"
          style={{ backgroundColor: 'rgba(0,0,0,0.78)', backdropFilter: 'blur(16px)', border: '1px solid rgba(111,79,40,0.25)' }}
        >
          {/* Tabs */}
          <div className="flex" style={{ borderBottom: '1px solid rgba(111,79,40,0.18)' }}>
            {(['acheter', 'louer'] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                style={{
                  flex: 1,
                  padding: '16px',
                  fontFamily: 'Montserrat, sans-serif',
                  fontSize: '13px',
                  fontWeight: 600,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: tab === t ? '#6F4F28' : 'rgba(255,255,255,0.4)',
                  background: 'none',
                  border: 'none',
                  borderBottom: tab === t ? '2px solid #6F4F28' : '2px solid transparent',
                  cursor: 'pointer',
                  transition: 'color 0.2s',
                }}
              >
                {t === 'acheter' ? 'Acheter' : 'Louer'}
              </button>
            ))}
          </div>

          {/* Inputs row */}
          <div className="p-5 flex flex-col sm:flex-row gap-3">
            {/* Location */}
            <div className="flex-1 relative">
              <MapPin size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2" style={{ color: '#6F4F28' }} />
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Île, commune, quartier…"
                className="w-full pl-10 pr-4 py-3.5 rounded-xl text-sm outline-none"
                style={{
                  backgroundColor: 'rgba(255,255,255,0.06)',
                  color: '#ffffff',
                  border: '1px solid rgba(111,79,40,0.2)',
                  fontFamily: 'Montserrat, sans-serif',
                }}
              />
            </div>

            {/* Type */}
            <div className="relative">
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="pl-4 pr-8 py-3.5 rounded-xl text-sm outline-none appearance-none cursor-pointer"
                style={{
                  backgroundColor: 'rgba(255,255,255,0.06)',
                  color: type === 'Tous types' ? 'rgba(255,255,255,0.45)' : '#ffffff',
                  border: '1px solid rgba(111,79,40,0.2)',
                  fontFamily: 'Montserrat, sans-serif',
                  minWidth: '155px',
                }}
              >
                {propertyTypes.map((t) => (
                  <option key={t} value={t} style={{ backgroundColor: '#111', color: '#fff' }}>{t}</option>
                ))}
              </select>
              <ChevronDown size={13} className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: 'rgba(255,255,255,0.35)' }} />
            </div>

            {/* Budget */}
            <div className="relative">
              <select
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                className="pl-4 pr-8 py-3.5 rounded-xl text-sm outline-none appearance-none cursor-pointer"
                style={{
                  backgroundColor: 'rgba(255,255,255,0.06)',
                  color: budget === 'Tous budgets' ? 'rgba(255,255,255,0.45)' : '#ffffff',
                  border: '1px solid rgba(111,79,40,0.2)',
                  fontFamily: 'Montserrat, sans-serif',
                  minWidth: '165px',
                }}
              >
                {budgets.map((b) => (
                  <option key={b} value={b} style={{ backgroundColor: '#111', color: '#fff' }}>{b}</option>
                ))}
              </select>
              <ChevronDown size={13} className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: 'rgba(255,255,255,0.35)' }} />
            </div>

            {/* Search button */}
            <button
              onClick={scrollToListings}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                backgroundColor: '#6F4F28',
                color: '#ffffff',
                border: 'none',
                padding: '14px 28px',
                borderRadius: '12px',
                fontFamily: 'Montserrat, sans-serif',
                fontWeight: 700,
                fontSize: '14px',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'background-color 0.2s, transform 0.2s',
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#8B6535' }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#6F4F28' }}
            >
              <Search size={15} />
              Rechercher
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="flex items-center justify-center gap-12 mt-12 flex-wrap">
          {[
            { value: '1 200+', label: 'Biens disponibles' },
            { value: '95+', label: 'Agents actifs' },
            { value: '8 500+', label: 'Ventes réalisées' },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <div style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 800, fontSize: '26px', color: '#6F4F28' }}>{s.value}</div>
              <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.08em', textTransform: 'uppercase', marginTop: '4px', fontFamily: 'Montserrat, sans-serif' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
