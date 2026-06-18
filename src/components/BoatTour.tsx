import { Users, Baby } from 'lucide-react'

const tarifs = [
  { icon: Users, label: 'Adulte', price: '5 000 XFP', sub: '42 €' },
  { icon: Users, label: 'Enfant (−11 ans)', price: '2 500 XFP', sub: '21 €' },
  { icon: Baby, label: 'Bébé (−3 ans)', price: 'Gratuit', sub: '' },
]

export default function BoatTour() {
  return (
      <section id="tarifs" className="py-24 px-6" style={{ backgroundColor: '#000000', paddingTop: '120px' }}>
        <div className="max-w-4xl mx-auto text-center">
          <div data-reveal className="section-label justify-center mx-auto">
            Tarifs
          </div>
          <h2
            data-reveal
            data-delay="100"
            style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(34px, 4.5vw, 54px)', fontWeight: 700, color: '#ffffff', lineHeight: 1.05, letterSpacing: '0.04em', marginBottom: '14px' }}
          >
            Pick-up & boisson <span style={{ color: '#6F4F28' }}>inclus.</span>
          </h2>
          <p
            data-reveal
            data-delay="160"
            style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '15px', color: 'rgba(255,255,255,0.75)', lineHeight: 1.7, marginBottom: '48px' }}
          >
            Visite commentée en français et en anglais · Durée 2h30
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-12">
            {tarifs.map((t, i) => (
              <div
                key={i}
                className="card-dark p-8 text-center"
                data-reveal="scale"
                data-delay={String(i * 110)}
              >
                <div
                  className="flex items-center justify-center w-12 h-12 rounded-xl mx-auto mb-5"
                  style={{ backgroundColor: 'rgba(111,79,40,0.1)', border: '1px solid rgba(111,79,40,0.25)' }}
                >
                  <t.icon size={22} style={{ color: '#6F4F28' }} />
                </div>
                <div style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '13px', fontWeight: 600, color: 'rgba(255,255,255,0.78)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '12px' }}>
                  {t.label}
                </div>
                <div style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '30px', fontWeight: 900, color: '#6F4F28', lineHeight: 1 }}>
                  {t.price}
                </div>
                {t.sub && (
                  <div style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '14px', color: 'rgba(255,255,255,0.68)', marginTop: '6px' }}>
                    {t.sub}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div data-reveal data-delay="300">
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

