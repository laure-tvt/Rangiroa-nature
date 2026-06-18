import { Users, Baby, ChevronRight } from 'lucide-react'

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

const tarifs = [
  { icon: Users, label: 'Adulte', price: '5 000 XFP', sub: '42 €' },
  { icon: Users, label: 'Enfant (−11 ans)', price: '2 500 XFP', sub: '21 €' },
  { icon: Baby, label: 'Bébé (−3 ans)', price: 'Gratuit', sub: '' },
]

export default function BoatTour() {
  return (
    <>
      {/* Two parts of the visit */}
      <section id="visite" className="py-24 px-6" style={{ backgroundColor: '#0D0D0D' }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div data-reveal className="section-label justify-center mx-auto">
              Le déroulé
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
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
                    style={{ backgroundColor: 'rgba(111,79,40,0.12)', border: '1.5px solid rgba(111,79,40,0.35)' }}
                  >
                    <span style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 900, fontSize: '20px', color: '#6F4F28' }}>{p.num}</span>
                  </div>
                  <div>
                    <div style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '10px', fontWeight: 700, color: 'rgba(111,79,40,0.7)', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '3px' }}>
                      Partie {p.num} · {p.stops}
                    </div>
                    <h3 style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700, fontSize: '20px', color: '#ffffff' }}>{p.title}</h3>
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
        </div>
      </section>

      {/* Tarifs */}
      <section id="tarifs" className="py-24 px-6" style={{ backgroundColor: '#000000' }}>
        <div className="max-w-4xl mx-auto text-center">
          <div data-reveal className="section-label justify-center mx-auto">
            Tarifs
          </div>
          <h2
            data-reveal
            data-delay="100"
            style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 800, color: '#ffffff', lineHeight: 1.1, marginBottom: '14px' }}
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
    </>
  )
}
