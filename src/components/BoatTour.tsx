import { Users, Baby } from 'lucide-react'

const tarifs = [
  { icon: Users, label: 'Adulte', price: '5 000 XFP', sub: '42 €' },
  { icon: Users, label: 'Enfant (−11 ans)', price: '2 500 XFP', sub: '21 €' },
  { icon: Baby, label: 'Bébé (−3 ans)', price: 'Gratuit', sub: '' },
]

export default function BoatTour() {
  return (
    <section id="tarifs" className="px-6" data-reveal="fade" style={{ backgroundColor: '#000000', paddingTop: '120px', paddingBottom: '96px' }}>
      <div className="max-w-5xl mx-auto">
        {/* Headline */}
        <div className="mb-10">
          <div data-reveal className="section-label mb-4">Tarifs</div>
          <h2
            data-reveal
            data-delay="100"
            style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 700, color: '#ffffff', lineHeight: 1.1, letterSpacing: '0.04em', marginBottom: '16px' }}
          >
            Pick-up & boisson<br /><span style={{ color: '#6F4F28' }}>inclus.</span>
          </h2>
          <p
            data-reveal
            data-delay="160"
            style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '14px', color: 'rgba(255,255,255,0.70)', lineHeight: 1.7 }}
          >
            Visite commentée en français et en anglais · Durée 2h30
          </p>
        </div>
        {/* 3 tarif cards */}
        <div className="flex flex-col gap-5 mb-10">
          {tarifs.map((t, i) => (
            <div
              key={i}
              className="card-dark p-7 flex items-center gap-6"
              data-reveal="up"
              data-delay={String(i * 110)}
            >
              <div
                className="flex items-center justify-center w-14 h-14 rounded-xl flex-shrink-0"
                style={{ backgroundColor: 'rgba(111,79,40,0.22)', border: '1px solid rgba(111,79,40,0.55)', boxShadow: '0 0 14px rgba(111,79,40,0.45)' }}
              >
                <t.icon size={24} style={{ color: '#C8894A' }} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '12px', fontWeight: 600, color: 'rgba(255,255,255,0.65)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '4px' }}>
                  {t.label}
                </div>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '32px', fontWeight: 700, color: '#C8894A', lineHeight: 1 }}>
                  {t.price}
                </div>
              </div>
              {t.sub && (
                <div style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '20px', fontWeight: 700, color: 'rgba(255,255,255,0.55)', flexShrink: 0 }}>
                  {t.sub}
                </div>
              )}
            </div>
          ))}
        </div>
        <div data-reveal data-delay="330">
          <button
            onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="btn-primary px-10 py-4 text-base"
          >
            Réserver ma visite
          </button>
        </div>
      </div>
    </section>
  )
}
