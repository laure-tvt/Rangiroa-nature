import { ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'

const parts = [
  {
    num: '1',
    title: 'Peuplement & héritage',
    stops: 'Arrêts 01 · 02 · 03',
    desc: 'Les trois premiers arrêts se focalisent sur le peuplement de l\'île, l\'ancien village d\'Avatoru et l\'impact de la chrétienté sur la culture polynésienne.',
    points: ['Le quai d\'Avatoru', 'L\'église d\'Avatoru', 'Le village historique'],
  },
  {
    num: '2',
    title: 'Nature & légendes',
    stops: 'Arrêts 04 · 05 · 06',
    desc: 'Les trois derniers explorent en détails les histoires de guerres, la protection corallienne, la formation d\'un atoll et les légendes locales de Rangiroa.',
    points: ['La plage publique', 'Le platier de récif', 'La passe de Tiputa'],
  },
]

export default function Tours() {
  return (
    <section id="circuit" className="py-24 px-6" style={{ backgroundColor: '#000000' }}>
      <div id="visite" style={{ position: 'relative', top: '-80px' }} />
      <div className="max-w-7xl mx-auto">

        {/* Badge + titre */}
        <div className="text-center mb-14">
          <div data-reveal className="flex justify-center mb-6">
            <span style={{
              display: 'inline-block',
              padding: '8px 20px',
              borderRadius: '999px',
              backgroundColor: '#ffffff',
              color: '#6F4F28',
              fontFamily: 'Montserrat, sans-serif',
              fontSize: '11px',
              fontWeight: 700,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
            }}>
              Le circuit
            </span>
          </div>
          <h2
            data-reveal
            data-delay="100"
            style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 800, color: '#ffffff', lineHeight: 1.15 }}
          >
            La visite se déroule<br />
            <span style={{ color: '#6F4F28' }}>en deux parties.</span>
          </h2>
          <p
            data-reveal
            data-delay="180"
            style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '15px', color: 'rgba(255,255,255,0.75)', marginTop: '14px', maxWidth: '480px', margin: '14px auto 0' }}
          >
            La promesse d'une immersion et d'une découverte inédite de Rangiroa.
          </p>
        </div>

        {/* Deux parties */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-7 mb-16">
          {parts.map((p, i) => (
            <div
              key={i}
              className="card-dark p-9"
              data-reveal="up"
              data-delay={String(i * 150)}
            >
              <div className="flex items-center gap-4 mb-6">
                <div
                  className="flex items-center justify-center w-12 h-12 rounded-2xl flex-shrink-0"
                  style={{ backgroundColor: 'rgba(111,79,40,0.22)', border: '1px solid rgba(111,79,40,0.55)', boxShadow: '0 0 14px rgba(111,79,40,0.45)' }}
                >
                  <span style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 900, fontSize: '20px', color: '#C8894A' }}>{p.num}</span>
                </div>
                <div>
                  <div style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '10px', fontWeight: 700, color: 'rgba(111,79,40,0.7)', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '3px' }}>
                    Partie {p.num} · {p.stops}
                  </div>
                  <h3 style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700, fontSize: '20px', color: '#C8894A' }}>{p.title}</h3>
                </div>
              </div>
              <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '14px', color: 'rgba(255,255,255,0.78)', lineHeight: 1.75, marginBottom: '20px' }}>
                {p.desc}
              </p>
              <ul className="space-y-2.5">
                {p.points.map((pt) => (
                  <li key={pt} className="flex items-center gap-3">
                    <ChevronRight size={14} style={{ color: '#6F4F28', flexShrink: 0 }} />
                    <span style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '13px', color: 'rgba(255,255,255,0.65)' }}>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Boutons de navigation vers les autres pages */}
        <div data-reveal className="text-center">
          <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '15px', color: 'rgba(255,255,255,0.75)', marginBottom: '28px' }}>
            Explorez votre visite en détail
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/arrets"
              className="btn-primary px-10 py-4 text-base"
              style={{ textDecoration: 'none' }}
            >
              Les 6 arrêts →
            </Link>
            <Link
              to="/tarifs"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                padding: '14px 36px',
                borderRadius: '50px',
                border: '1px solid rgba(111,79,40,0.4)',
                backgroundColor: 'transparent',
                color: '#ffffff',
                fontFamily: 'Montserrat, sans-serif',
                fontSize: '15px',
                fontWeight: 700,
                textDecoration: 'none',
                transition: 'border-color 0.2s',
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.borderColor = '#6F4F28')}
              onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(111,79,40,0.4)')}
            >
              Les tarifs →
            </Link>
          </div>
        </div>

      </div>
    </section>
  )
}
